var mes = null;
$.ajax({
    url: '/user/queryUserMessage',
    type: 'get',
    async: false,
    success: function(res){
        if(res.error && res.error == 400) {
            location.href = 'login.html';
        }
        mes = res;
    }
});
$(function () {
    var html = template('userTpl',mes);
    $('#userMes').html(html);
    $('#login-out').on('tap', function () {
        $.ajax({
            url: '/user/logout',
            type: 'get',
            success: function (res) {
                if(res.success) {
                    location.href = 'login.html';
                }
            }
        });
    });

})