$(function () {

    $('body').on('click','a',function(){
        mui.openWindow({
            url: $(this).attr('href')
        })
    })

})