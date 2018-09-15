var url = location.href;
var key = getRessult(url, 'keyword');
$(function(){
    mui.init({
        pullRefresh : {
            container: '#refreshContainer',
            up : {
                height:50,
                auto:true,
                contentrefresh : "正在努力加载",
                contentnomore:'没有了',
                callback: getData
            }
        }
    });

});
function getRessult(url,name){
    var str = url.substr(url.indexOf('?') + 1);
   var arrs = str.split('&');
    for (var i = 0; i < arrs.length; i++) {
       var arr = arrs[i].split('=');
        if(arr[0] == name){
           return arr[1];
        }
    }
}
function getData(){
  var that = this;
    $.ajax({
        url: '/product/queryProduct',
        type: 'get',
        data: {
            proName: key,
            page: 1,
            pageSize: 3
        },
        success: function (response) {
            if(response.data.length > 0) {
                var html = template('searchResultTpl',response);
                $('.result').html(html);
                that.endPullupToRefresh(false);
            }else {
                that.endPullupToRefresh(true);
            }
        }

    });
}



