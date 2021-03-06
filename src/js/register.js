$(function () {
    // 从JSON文件中获取省市区信息
    $.getJSON("../res/address.json",
        function (jasondata) {
            jasondata.forEach(element => {
                var province = element.name;
                var op = $('<option/>');
                op.html(province);
                $('#province').append(op);
            });
            layui.use('form', function () {
                var form = layui.form;
                form.on('select(provincepick)', function (data) {
                    $('#city>option').remove();
                    $('#city').append('<option value="">请选择城市</option>')
                    jasondata.forEach(element => {
                        if (data.value == element.name) {
                            element.city.forEach(element => {
                                var city = element.name;
                                // console.log(city);
                                var oc = $('<option/>');
                                oc.html(city);
                                $('#city').append(oc);
                            });
                        }
                    });
                    form.render();
                });
                form.on('select(citypick)', function (data) {
                    $('#area>option').remove();
                    $('#area').append('<option value="">请选择地区</option>')
                    jasondata.forEach(element => {
                        element.city.forEach(element => {
                            if (data.value == element.name) {
                                element.area.forEach(element => {
                                    var area = element;
                                    var oa = $('<option/>');
                                    oa.html(area);
                                    $('#area').append(oa);
                                });
                            }
                        });
                    });
                    form.render();
                });
            });
        }
    );

    layui.use(['form', 'laydate', 'element'], function () {
        var form = layui.form;
        var laydate = layui.laydate;
        var element = layui.element;

        laydate.render({
            elem: '#birth',
            theme: '#FFB800',
            min: '1800-1-1',
            done: function (value, date, endDate) {
                console.log(value); //得到日期生成的值，如：2017-08-18
                console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
            }
        });
       
        form.on('submit(login)', function (data) {
            layer.msg(JSON.stringify(data.field));
            return false;
        });

        form.verify({
            account: function (value, item) {
                if(!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(value)){
                    if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)) {
                        return '请输入正确的邮箱或手机号';
                    }
                }
            }
            ,password: function(value,item){
                //密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
                //123456Y&y123
                if(!/^(?![A-Za-z]+$)(?![A-Z\d]+$)(?![A-Z\W]+$)(?![a-z\d]+$)(?![a-z\\W]+$)(?![\d\W]+$)\S{6,12}$/.test(value)){
                    return '密码6-12位，数字,大写字母,小写字母,特殊符,至少其中三种组成密码';
                }
            }
            ,repassword: function(value,item){
                if($('#repassword').val() != $('#password').val()){
                    return '密码不匹配';
                }
            }
        });
        form.render();
    });
});
