$.ajax({
    url: '/employee/checkRootLogin',
    type: 'get',
    async: false,
    success: function (res) {
        if(res.error) {
            location.href = 'login.html';
        }
    }
});

$(function () {
    $('.login_out_bot').on('click', function () {
        $.ajax({
            url: '/employee/employeeLogout',
            type: 'get',
            success: function (res) {
                if(confirm('确认需要退出登录吗')){
                    location.href = 'login.html';
                }else {
                    alert(res.message);
                }
            }
        });
    })
})