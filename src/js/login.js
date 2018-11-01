$(function () {

    layui.use(['form', 'layer'], function () {
        var form = layui.form;
        var layer = layui.layer;
        form.on('submit(login)', function (data) {

            $.ajax({
                type: "post",
                url: "",
                data: "data",
                dataType: "dataType",
                success: function (response) {
                    
                }
            });
            layer.msg(JSON.stringify(data.field));
            console.log(1233);

            // return false;
        });

        form.verify({
            account: function (value, item) {
                if (!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(value)) {
                    if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)) {
                        return '请输入正确的邮箱或手机号';
                    }
                }
            }
        })


    });
    $('.showpwd').click(function (e) {
        e.preventDefault();
        if ($(this).hasClass('icon-normal')) {
            $(this).removeClass('icon-normal');
            $(this).addClass('icon-yanjing');
            $('#password').attr('type', 'password');
        } else if ($(this).hasClass('icon-yanjing')) {
            $(this).removeClass('icon-yanjing');
            $(this).addClass('icon-normal');
            $('#password').attr('type', 'text');
        }
    });
});