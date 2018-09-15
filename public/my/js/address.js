$(function () {
    $.ajax({
        url: '/address/queryAddress',
        type: 'get',
        success: function (res) {
            console.log(res.length);
            var html = template('addressTmp',{res: res});
            console.log(html);

            $('#userAddressMessage').html(html);
        }
    })
})