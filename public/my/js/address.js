
var editContent = null;
$(function () {
    $.ajax({
        url: '/address/queryAddress',
        type: 'get',
        success: function (res) {
            var html = template('addressTmp',{res: res});

            $('#userAddressMessage').html(html);
            editContent = res;
        }
    });


    $('#userAddressMessage').on('tap','.editAddress', function () {
        //console.log(editContent);
        var editTarget = null;
        var id = $(this).data('id');
        for (var i = 0; i < editContent.length; i++) {
            if(id == editContent[i].id) {
                editTarget = editContent[i];
                //把得到的数据存储起来,跳转之后再次使用
                localStorage.setItem('editAddress',JSON.stringify(editTarget));
                break;
            }
        }
        console.log(editTarget);

        $.ajax({
            url: '/address/updateAddress',
            type: 'post',
            data: {
                id: id,
                address: editTarget.address,
                addressDetail: editTarget.addressDetail,
                recipients: editTarget.recipients,
                postcode: editTarget.postCode
            },
            success: function (res) {
                if(res.success) {
                    location.href = 'editAddress.html';
                }
            }
        })
    });


    $('#userAddressMessage').on('tap','.delAddress', function () {
        var id = $(this).data('id');
        var li = $(this).parent().parent();
        mui.confirm('您确认要删除地址吗','友情提示', function (res) {
            if(res.index == 1) {
                $.ajax({
                    url: '/address/deleteAddress',
                    type: 'post',
                    data: {
                        id: id
                    },
                    success: function(res){
                        if(res.success) {
                            location.reload();
                        }
                    }
                });
            }else {
                mui.swipeoutClose(li[0]);
            }
        })
    })
})