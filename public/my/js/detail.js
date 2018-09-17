function getRessult(url, name) {
    var str = url.substr(url.indexOf('?') + 1);
    var arrs = str.split('&');
    for (var i = 0; i < arrs.length; i++) {
        var arr = arrs[i].split('=');
        if (arr[0] == name) {
            return arr[1];
        }
    }
};
$(function () {
    var id = getRessult(location.href,'id');
    var largeNum = null;
    $.ajax({
        url: '/product/queryProductDetail',
        type: 'get',
        data: {
            id: id
        },
        success: function (res) {
            largeNum = res.num;
            console.log(res);
            var html = template('detailTpl',res);
            $('.mui-content').html(html);

            //模板引擎使用之后,导致轮播图失效,此时需要格式化轮播图
            var gallery = mui('.mui-slider');
            gallery.slider();
        }
    });

    $('.mui-content').on('tap','.num > .reduce',function(){
        var num = $('#num').val();
        console.log(num);
        num--;
        if(num <= 1) {
            num = 1;
        }
        $('#num').val(num);
    });

    $('.mui-content').on('tap','.num > .increase',function(){
        var num = $('#num').val();
        num++;
        if(num > largeNum) {
            num = largeNum;
        }
        $('#num').val(num);
    });

    $('.mui-content').on('tap','.size > .bgc', function () {
        $(this).addClass('activeSize').siblings().removeClass('activeSize');
    });


    $('.mui-content').on('tap','.cart >.addCart', function () {
        var num = $('#num').val();
        var size = $('.activeSize').html();
        if(size) {
            mui.toast('添加购物车成功');
            $.ajax({
               url: '/cart/addCart',
                type: 'post',
                data: {
                    productId: id,
                    num: num,
                    size: size
                },
                success: function (res) {
                    if(res.error && res.error == 400) {
                        mui.toast('未登录,请先登录');
                        location.href = 'login.html';
                    }else if (res.success) {
                        mui.confirm('添加购物车成功','是否进入购物车', function (res) {
                            if(res.index) {
                                setTimeout(function () {
                                    location.href = 'cart.html';
                                },2000);
                            }
                        })

                    }
                }
            });

        }else{
            mui.toast('请选择尺码');
        }

    })




})