$(function () {
    $.ajax({
        url: '/category/queryTopCategoryPaging',
        type: 'get',
        data: {
            page: 1,
            pageSize: 10
        },
        success: function(res){
            console.log(res);
            var html = template('categoryFirstTpl',res);
            $('#categoryFirstBox').html(html);
        }
    })
})