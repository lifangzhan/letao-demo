$(function () {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005
    });

    $.ajax({
        url: '/category/queryTopCategory',
        type: 'get',
        success: function (response) {
            var html = template('category-first',{result: response.rows});
           $('.links').html(html);
            if(response.rows.length){
                var id = response.rows[0].id;
                $('.links').find('a').eq(0).addClass('active');
                getResponse(id);
            }
        }
    });

    $('.links').on('click','a', function () {
        var id = $(this).attr('data-id');
        $(this).addClass('active').siblings().removeClass('active');
        getResponse(id);
    });


//二级分类发送请求获取数据,封装函数
    function getResponse(id) {
        $.ajax({
            url: '/category/querySecondCategory',
            type: 'get',
            data: {
                id: id
            },
            success: function (response) {
                var html = template('category-second',response);
                $('.rightUl').html(html);
            }
        })
    }

})