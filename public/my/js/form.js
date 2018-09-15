$(function () {
//   获取验证码
     var timeId = null;
    $('.getCode').on('tap', function () {
        clearInterval(timeId);
        timeId = null;
        $.ajax({
            url: '/user/vCode',
            type: 'get',
            beforeSend: function () {
                if(timeId) {
                    return;
                }
            },
            success: function(response) {
                var total = 60;
                timeId = setInterval(function () {
                    if(total > 0) {
                        total--;
                        $('.getCode').html(''+total+'秒后重新获取');
                        $('.getCode').css('background','#ccc');
                   /*     $('.getCode').off('tap');*/

                    }else {
                        clearInterval(timeId);
                        timeId = null;
                        $('.getCode').html("获取验证码");
                        $('.getCode').css('background','#006699');
                    }
                },1000);
                console.log(response.vCode);
            }
        })
    });

    $('#register-btn').on('tap', function () {
        var username = $('[name="username"]').val();
        var mobile = $('[name="mobile"]').val();
        var password = $('[name="password"]').val();
        var confirmPw = $('[name="confirmPw"]').val();
        var vCode = $('[name="vCode"]').val();
        console.log(vCode);
         if (!username.trim() || !mobile.trim() || !password.trim() || !confirmPw.trim()) {
            //alert('请将信息填写完整');
            mui.toast('请将信息填写完整');
            return;
        }
        if (mobile.trim().length != 11) {
            alert('手机号不合法,请重新输入');
            return;
        }
        if (password != confirmPw) {
            alert('两次输入的密码不一致,请重新输入');
            return;
        }
    //    发送注册信息
        $.ajax({
            url: '/user/register',
            type: 'post',
            data: {
                username: username,
                password: password,
                mobile: mobile,
                vCode: vCode
            },
            success: function(result) {
                if(result.success) {
                    location.href = "login.html";
                }else {
                    console.log(result);
                    mui.toast('result.message');
                }
            }
        })
    });


    $('#login-now').on('tap', function () {
        location.href = "login.html";
    });



})