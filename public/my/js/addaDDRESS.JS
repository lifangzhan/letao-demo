$(function(){
    $('#select').on('tap', function () {
        var picker = new mui.PopPicker({layer:3});
        picker.setData(cityData);
        picker.show(function (res) {
            $('#select').val(res[0].text +res[1].text + res[2].text  );
        });


    });

    $('.confirm').on('tap', function () {

        var username = $('[name="username"]').val();
        var postcode = $('[name="postcode"]').val();
        var city = $('[name="city"]').val();
        var detail = $('[name="detail"]').val();

        if(!username || !postcode || !city) {
            mui.toast('请将收货信息填写完整');
            return;
        }
        $.ajax({
            url: '/address/addAddress',
            type: 'post',
            data: {
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