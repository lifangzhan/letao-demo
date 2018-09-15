$(function () {
    $('#searchBtn').click(function () {
        var keyword = $(this).siblings('input').val();
        if(keyword.trim()){
            location.href = 'search-result.html?keyword='+keyword;
            keyArr.unshift(keyword);
            localStorage.setItem('keyArr',JSON.stringify(keyArr));
        }else {
            alert('请输入关键字');
        }
    });
    /*准备一个存储关键字的数组*/
    var keyArr = [];

    //页面一加载,判断本地存储中是否已有存储关键字
    if(localStorage.getItem('keyArr')){
        keyArr = JSON.parse(localStorage.getItem('keyArr'));
         var html = template('searchTmp',{
             keyArr: keyArr
         });
        $('#history').html(html);
    }
    /*清空历史*/
    $('.clear').click(function () {
        $('#history').html("");
        localStorage.removeItem('keyArr');
        keyArr = [];
    });
    $('#history').on('click','li', function () {
        var keyword = $(this).text();
        location.href = 'search-result.html?keyword='+keyword;
    });
})