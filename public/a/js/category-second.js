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


    $.ajax({
        url: '/category/queryTopCategoryPaging',
        type: 'get',
        data: {
            page: 1,
            pageSize: 200
        },
        success: function (res) {
            var html = template('optionsTpl',res);
            $('#optionsBox').html(html);
        }
    });


    var brandLogo = '';
        $('#fileupload').fileupload({
            dataType: 'json',
            done: function (e, data) {
                brandLogo = data.result.picAddr;
                $('#imgBox').attr('src',brandLogo);
            }
        });

    $('#save').on('click', function () {
        var categoryId = $("#optionsBox").val();
        var brandName = $('#proName').val();

        if(!categoryId.trim() || !brandName.trim() || !brandLogo.trim() ){
            alert('未选择商品分类或者商品名称没写或者图片上传失败,请核实再添加');
            return;
        }

        $.ajax({
            url: '/category/addSecondCategory',
            type: 'post',
            data: {
                brandName: brandName,
                categoryId: categoryId,
                brandLogo: brandLogo,
                hot: 1
            },
            success: function (res) {
                if(res.success) {
                    location.reload();
                }
            }
        })
    })

})