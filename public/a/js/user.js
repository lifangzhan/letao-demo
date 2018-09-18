$(function () {
    $.ajax({
        url: '/user/queryUser',
        type: 'get',
        data: {
            page: 1,
            pageSize: 10
        },
        success: function(res){
            console.log(res);
            var html = template('userTpl',res);
            $('#userBox').html(html);
        }
    });


    $('#userBox').on('click','#edit-btn',function(){
        var id = $(this).data('id');
        var isDelete = parseInt($(this).data('delete'));
        console.log(isDelete);

        $.ajax({
            url: '/user/updateUser',
            type: 'post',
            data: {
                id: id,
                isDelete: isDelete ? 0 : 1
            },
            success: function (res) {
                if(res.success) {
                    location.reload();
                }
            }

        });
    })
});


