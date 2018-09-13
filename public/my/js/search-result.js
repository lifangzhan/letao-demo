var url = location.href;
var key = getRessult(url, 'keyword');
$(function(){
    $.ajax({
        url: '/product/queryProduct',
        type: 'get',
        data: {
            proName: key,
            page: 1,
            pageSize: 6
        },
        success: function (response) {
            var html = template('searchResultTpl',response);
            $('.result').html(html);

            that.endPullupToRefresh(false);
        }
    });
    mui.init({
        pullRefresh : {
            container: '#refreshContainer',
            up : {
                height:50,
                auto:true,
                contentrefresh : "正在加载...",
                contentnomore:'没有更多数据了',
                callback : getData
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

}