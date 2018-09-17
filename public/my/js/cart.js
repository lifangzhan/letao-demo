
$(function () {
    $.ajax({
        url: '/cart/queryCartPaging',
        type: 'get',
        data: {
            page: 1,
            pageSize: 9
        },
        success: function (res) {
            console.log(res);
            if (res.data) {
                var html = template('cartTpl', res);
                $('.mui-table-view').html(html);

            }
        }
    });


    $('.mui-popup').on('tap', '.detail-size > span', function () {
        $(this).addClass('activeSize').siblings().removeClass('activeSize');
    });

    $('.mui-popup').on('tap', '.detail-num > .reduce', function () {
        var num = $('#num').val();
        console.log(num);
        num--;
        if (num <= 1) {
            num = 1;
        }
        $('#num').val(num);
    });

    $('.mui-popup').on('tap', '.detail-num > .increase', function () {
        var num = $('#num').val();
        num++;
        if (num > 56) {
            num = 56;
        }
        $('#num').val(num);
    });


    var editId = null;

    $('.mui-table-view').on('tap', '#cart-edit', function () {
        $('.mui-backdrop').css('display', 'block');
        $('.mui-popup').css('display', 'block');
        editId = $(this).data('id');

    });

    $('.mui-popup').on('tap', '.confirmEditCart', function () {

        var size = $('.activeSize').html();
        var num = $('#num').val();

        $.ajax({
            url: '/cart/updateCart',
            type: 'post',
            data: {
                id: editId,
                size: size,
                num: num
            },
            success: function (res) {
                if (res.success) {
                    $('.mui-backdrop').css('display', 'none');
                    $('.mui-popup').css('display', 'none');
                    mui.toast('修改成功');
                    setTimeout(function () {
                        location.reload();
                    }, 1000)
                }
            }
        });

    });

    $('.mui-popup').on('tap','.cancelEditCart', function (){
        $('.mui-backdrop').css('display','none');
        $('.mui-popup').css('display','none');
        mui.toast('已取消修改');
        location.reload();
    });

    $('header > .mui-icon-reload').on('tap', function () {
        location.reload();
    });


    $('.mui-table-view').on('tap', '#delCart', function () {
        var arr =[];
        var delId = $(this).data('id')
        mui.confirm('确认要删除此商品吗','温馨提示', function (res) {
           if(res.index) {
               $.ajax({
                   url: '/cart/deleteCart',
                   type: 'get',
                   data: {
                        id: arr
                   },
                   success: function (res) {
                       if(res.success){
                           location.reload();
                       }
                   }


               });
           }
        })



    });
})

