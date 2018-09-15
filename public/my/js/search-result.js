var url = location.href;
var key = getRessult(url, 'keyword');
var html = "";
$(function(){
        mui.init({
            pullRefresh : {
                container: '#refreshContainer',
                up : {
                    height:50,
                    auto:true,
                    contentrefresh : "正在加载...",
                    contentnomore:'没有更多数据',
                    callback : getData
                }
            }
        });

    $('#priceSort').on('tap', function () {
        sortPrice = sortPrice == 1 ? 2 : 1;
        html = "";
        page = 1;
        mui('#refreshContainer').pullRefresh().refresh(true);
        getData();
    });


    $('#numSort').on('tap', function () {
        sortNum = sortNum == 1 ? 2 : 1;
        html = '';
        page = 1;
        mui('#refreshContainer').pullRefresh().refresh(true);
        getData();
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
var page = 1;
var sortPrice = 1;
var sortNum = 1;
var that = null;
function getData(){
    if(!that) {
       that = this;   //点按照价格排序的时候,会出现一个报错,that不是一个函数,因为此时this指向了window,window下面没有endPullupToRefresh()这个方法
    }
    $.ajax({
        url: '/product/queryProduct',
        type: 'get',
        data: {
            proName: key,
            page: page++,
            pageSize: 3,
            price: sortPrice,
            num: sortNum
        },
        success: function (response) {
            if(response.data.length > 0) {
                html += template('searchResultTpl',response);
                $('.result').html(html);
                that.endPullupToRefresh(false);
            }else {
                that.endPullupToRefresh(true);
            }
        }

    });
}