$.ajax({
    url: '/employee/checkRootLogin',
    type: 'get',
    async: false,
    success: function (res) {
        if(res.success) {
            location.href = 'user.html';
        }
    }
});

$(function () {
    $('#loginBtn').on('click', function () {
        var username = $('[name="username"]').val();
        var password = $('[name="password"]').val();
        if(!username) {
            alert('请输入用户名');
            return;
        }
        if(!password) {
            alert('请输入密码');
            return;
        }
        $.ajax({
            url: '/employee/employeeLogin',
            type: 'post',
            data: {
                username: username,
                password: password
            },
            success: function(res){
                if(res.success){
                    location.href = 'user.html';
                }else {
                    alert(res.message);
                }
            }
        })
    })
})