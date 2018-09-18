$(function () {
    $.ajax({
        url: '/product/queryProductDetailList',
        type: 'get',
        data: {
            page: 1,
            pageSize: 100
        },
        success: function (res) {
            var html = template('productsTpl',res);
            $('#productBox').html(html);
        }

    });


    $.ajax({
        url: '/category/querySecondCategoryPaging',
        type: 'get',
        data: {
            page: 1,
            pageSize: 200
        },
        success: function (res) {
            var html = template('secondCCategoryTpl',res);
            $('#secondCategoryBox').html(html);
        }
    });


    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            console.log(data);
        }
    });

    $('#addProduct').on('click', function () {
        var brandId = $('#secondCategoryBox').val();
        var proName = $('[name="proName"]').val();
        var oldPrice = $('[name="oldPrice"]').val();
        var price = $('[name="price"]').val();
        var proDesc = $('[name="proDesc"]').val();
        var size = $('[name="size"]').val();
        var num = $('[name="num"]').val();

        if(!brandId.trim() || !proName.trim() || !oldPrice.trim() || !price.trim() || !proDesc.trim() || !size.trim() || !num.trim() || brandLogo.length < 1) {
            alert('信息不完整,请将信息填写完整');
            return;
        }

        $.ajax({
            url: '/product/addProduct',
            type: 'post',
            data: {
                proName: proName,
                oldPrice: oldPrice,
                price: price,
                proDesc: proDesc,
                size: size,
                statu: 1,
                num: num,
                brandId: brandId

            },
            success: function (res) {
                if(res.success) {
                    location.reload();
                }
            }
        });
    })

})