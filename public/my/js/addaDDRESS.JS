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
    });


/*    {"id":15,"userId":6,"address":"北京市北京市东城区","addressDetail":"传智","isDelete":1,"recipients":"猪八戒","postCode":"10010","mobile":null}*/
    if(localStorage.getItem('editAddress')) {

        //此时是一个字符串,无法操作数据,需要转换成对象
        //console.log(localStorage.getItem('editAddress'));
        var obj = JSON.parse(localStorage.getItem('editAddress'));
        var html = template('editTpl',obj);
        console.log(html);
        $('.mui-content').html(html);
    }
})