$(function () {
    $('#login-btn').on('tap', function () {
        var username = $('[name="username"]').val();
        var password = $('[name="password"]').val();
        $.ajax({
            url: '/user/login',
            type: 'post',
            data: {
                username: username,
                password: password
            } ,
            success: function(res){
                if(res.success){
                    location.href = 'user.html';
                }else {
                    mui.toast(res.message);
                }
            }
        });

    });




    $('#register-now').on('tap', function () {
        location.href = 'register.html';
    })
});