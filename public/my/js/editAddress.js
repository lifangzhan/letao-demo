$(function(){
    if(localStorage.getItem('editAddress')) {
        var obj = JSON.parse(localStorage.getItem('editAddress'));
        console.log(obj);
        var html = template('editTpl',obj);
        $('.mui-content').html(html);
    }

    $('.mui-content').on('tap','#select', function () {
        var picker = new mui.PopPicker({layer:3});
        picker.setData(cityData);
        picker.show(function (res) {
            $('#select').val(res[0].text +res[1].text + res[2].text);
        });
    });


    $('.mui-content').on('tap','.confirm',function(){
        mui.toast('修改信息成功');
        var username = $('[name="username"]').val();
        var postcode = $('[name="postcode"]').val();
        var city = $('[name="city"]').val();
        var detail = $('[name="detail"]').val();
        var id = $(this).data('id');
        if(!username || !postcode || !city) {
            mui.toast('请将收货信息填写完整');
            return;
        }
        $.ajax({
            url: '/address/updateAddress',
            type: 'post',
            data: {
                id: id,
                address: city,
                addressDetail: detail,
                recipients: username,
                postcode: postcode
            },
            success: function (res) {
                if(res.success){
                    location.href = 'address.html';
                }
            }

        });


    })



})