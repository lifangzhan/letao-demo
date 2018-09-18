$(function () {
    var page = 1;
    var pageSize = 5;
    var totalPage = 0;

    function getData() {
                    $.ajax({
                        url: '/category/queryTopCategoryPaging',
                        type: 'get',
                        data: {
                            page: page,
                            pageSize: pageSize
                        },
                        success: function(res){
                            totalPage = Math.ceil(res.total / pageSize);
                console.log(res);
                console.log(totalPage);
                var html = template('categoryFirstTpl',res);
                $('#categoryFirstBox').html(html);
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



        $('#btn-primary').on('click', function () {
            var categoryName = $('.form-control').val();
            if(!categoryName){
                alert('请输入分类名称');
                return;
            }
            $.ajax({
                url: '/category/addTopCategory',
                type: 'post',
                data: {
                    categoryName: categoryName
                },
                success: function (res) {
                    if(res.success) {
                        location.reload();
                    }
                }
            });
        })





})