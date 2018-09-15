$(function () {
    $('#confirmUpdatePw').on('tap', function () {
        var oldPw = $('[name="oldPw"]').val();
        var newPw = $('[name="newPw"]').val();
        var confirmNewPw = $('[name="confirmNewPw"]').val();
        var vCode = $('[name="vCode"]').val();

        if(!oldPw || !newPw || !confirmNewPw || !vCode) {
            mui.toast('请将密码填写完整');
            return;
        }
        if(newPw != confirmNewPw){
            mui.toast('2次输入的密码不一致,请重新核对输入');
            return;
        }

        $.ajax({
            url: '/user/updatePassword',
            type: 'post',
            data: {
                oldPassword: oldPw,
                newPassword: newPw,
                vCode: vCode
            },
            success: function (res) {
                console.log(res);
                if(res.success) {
                    mui.toast('修改密码成功');
                    setTimeout(function () {
                       location.href = "login.html";
                    },2000);
                }
            }
        });
    })


    $('.vCode').on('tap', function () {
        $.ajax({
            url: '/user/vCodeForUpdatePassword',
            type: 'get',
            success: function (res) {
                console.log(res.vCode);
            }
        });
    })
});