$(function () {
    var page = 1;
    var pageSize = 5;
    var totalPage = 0;

    function getData() {
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            type: 'get',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function(res){
                totalPage = Math.ceil(res.total / pageSize);
                console.log(res);
                console.log(totalPage);
                var html = template('categorySecondTpl',res);
                $('#categorySecondBox').html(html);
            }
        });
    };
    getData();


    $('#prev').on('click', function () {
        if(page <= 1) {
            page = 1;
            alert('已经是第一页了');
            return;
        }
        page--;
        getData();
    });

    $('#next').on('click', function () {
        if(page >= totalPage) {
            page = totalPage;
            alert('已经是最后一页了');
            return;
        }
        page++;
        getData();
    });

})