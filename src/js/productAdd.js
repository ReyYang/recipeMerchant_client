$(function () {
    var BODY = $('body');
    var t_cols = new Array();
    var t_data = [];
    var Classify = [{
        "marque": "重量",
        "model": [{
                "name": "2500g"
            },
            {
                "name": "5000g"
            },
            {
                "name": "7500g"
            }
        ]
    }, {
        "marque": "尺寸",
        "model": [{
                "name": "15cm"
            },
            {
                "name": "25cm"
            },
            {
                "name": "35cm"
            }
        ]
    }, {
        "marque": "材质",
        "model": [{
                "name": "不锈钢"
            },
            {
                "name": "竹制"
            }
        ]
    }]

    function gettabledata() {
        var Classifycols = {};
        var Classifydata = {};
    }
    //屏幕滚动时事件（导航条）
    $(window).scroll(function () {
        var topp = 50 - BODY.scrollTop();
        $('.top-nav').css('top', topp > 0 ? topp + 'px' : '0');
    });
    //打开商品类型面板
    $('#showModel-btn').click(function (e) {
        e.preventDefault();
        $('#modeldefault').attr('style', 'display:none;');
        $('#showModel').attr('style', 'display:block;');
    });

    //文本框字数限制
    $("#productTitle").on("input propertychange", function () {
        var $this = $(this),
            _val = $this.val(),
            count = "";
        if (_val.length > 60) {
            $this.val(_val.substring(0, 60));
        }
        count = $this.val().length;
        $("#text-count").text(count);
    });
    //商品型号面板内容
    var showModelDiv = [
        '<div class="layui-card product-card">',
        '   <div class="layui-card-header product-div-model-title ">',
        '       <div class="div_select" style="width:150px; display: inline-block;">',
        '           <select name="productClassify" lay-verify="required" lay-filter="choose_classify">',
        '               <option value="">请选择型号分类</option>',
        '               <option value="重量">重量</option>',
        '               <option value="尺寸">尺寸</option>',
        '               <option value="材质">材质</option>',
        '               <optgroup label="自定义型号分类">',
        '                   <option value="0">自定义</option>',
        '               </optgroup>',
        '           </select>',
        '       </div>',
        '       <div style="display: inline-block;">',
        '           <div class="addModelImg">',
        '               <input type="checkbox" name="addimg" lay-skin="switch" lay-text="添加图片|添加图片" style="height: 60px;" lay-filter="appendImg">',
        '           </div>',
        '       </div>',
        '       <i class="layui-icon layui-icon-close closeModel-btn closeModel"></i>',
        '   </div>',
        '    <div class="layui-card-body addModelClassify-div" style="padding:10px 0px;">',
        '       <ul style="min-height:80px; padding: 10px 15px;">',
        '           <li class="model-li-add model-li">',
        '               <a href="javascript:;" class="addMarque">+添加型号</a>',
        '               <div class="addModel-div">',
        '                   <i id="arrow" class="layui-icon layui-icon-up"></i>',
        '                   <section class="addmodel-section">',
        '                       <div class="section-model-li">',
        '                           <div class="model-name-div">',
        '                               <input class="modelName" type="checkbox" name="" title="0" lay-filter="modelName-filter">',
        '                           </div>',
        '                           <i class="layui-icon layui-icon-close model-li-del"></i>',
        '                       </div>',
        '                   </section>  <hr>',
        '                   <div class="model-name-input">',
        '                       <label class="layui-form-label" style="box-sizing: content-box;width: auto;">添加型号</label>',
        '                       <input type="text" name="title" placeholder="输入型号" class="layui-input model-name" style="width: 230px;display: inline-block;">',
        '                       <a href="" class="addmodel-name-btn addmodel-name-btn-add">添加</a>',
        '                       <a href="" class="addmodel-name-btn addmodel-name-btn-cencle">取消</a>',
        '                   </div>',
        '                   <div class="addModel-footer">',
        '                       <a href="" class="layui-btn layui-btn-primary addModel-div-cencle">取消</a>',
        '                       <a href="" class="layui-btn layui-btn-danger addModel-div-confirm">确定</a>',
        '                   </div>',
        '               </div>',
        '           </li>',
        '       </ul>',
        '       <hr>',
        '       <div>',
        '           <div class="addModel-btn-div">',
        '               <button class="layui-btn layui-btn-primary addModelClassify" type="button">添加型号分类</button>',
        '           </div>',
        '       </div>',
        '   </div>',
        '</div>'
    ].join('');
    //添加商品型号面板
    BODY.on('click', '.addModelClassify', function (e) {
        e.preventDefault();
        var lay = layui.layer;
        var layform = layui.form;
        layform.render();
        if ($('.product-cards').children().length >= 3) {
            lay.msg("最多只能有3个商品型号哦！");
        } else {
            // $('.product-cards').append(showModelDiv.clone());
            $(this).css('display', 'none');
            $('.product-cards').append(showModelDiv);
            layform.render();
        }
    });
    //关闭商品型号面板
    BODY.on('click', '.closeModel', function (e) {
        e.preventDefault();
        if ($('.product-cards').children().length <= 1) {
            $('#modeldefault').attr('style', 'display:block;');
            $('#showModel').attr('style', 'display:none;');
            $('.addModelClassify').css('display', 'block');
        } else {
            $(this).parents('.product-card').remove();
            $('.product-card').last().find('.addModelClassify').css('display', 'block');
        }
    });
    //添加型号
    BODY.on('click', '.addMarque', function (e) {
        e.preventDefault();
        $(this).siblings('.addModel-div').css('display', 'block');
    });
    //添加型号输入框取消清空
    BODY.on('click', '.addmodel-name-btn-cencle', function (e) {
        e.preventDefault();
        $(this).siblings('.model-name').val('');
    });
    //添加型号取消关闭
    BODY.on('click', '.addModel-div-cencle', function (e) {
        e.preventDefault();
        $(this).parents('.addModel-div').css('display', 'none');
    });
    //添加型号遍历插入
    BODY.on('click', '.addmodel-name-btn-add', function (e) {
        e.preventDefault();
        var form = layui.form;
        //添加型号型号名内容
        var modelli = [
            '<div class="section-model-li">',
            '   <div class="model-name-div">',
            '       <input class="modelName" type="checkbox" name="" title="" lay-filter="modelName-filter">',
            '   </div>',
            '   <i class="layui-icon layui-icon-close model-li-del"></i>',
            '</div>'
        ].join('');
        var layer = layui.layer;
        var addflag = 'meiyou';
        var addflag1 = 'meiyou';
        var addindex = $('.addmodel-name-btn-add').index($(this));

        if (/^\s+$/.test($(this).siblings('.model-name').val()) || $(this).siblings('.model-name').val() == '') {
            layer.msg('类型名不能为空！');
        } else {
            var text = $(this).siblings('.model-name').val();
            $($('.addModel-div').get(addindex)).find('.modelName').each(function (indexInArray, valueOfElement) {
                var title = $(this).attr('title');
                if (title == text) {
                    layer.msg('不许添加同名类型');
                    addflag = 'youle';
                    return false;
                }
            });
            $($('.addModelClassify-div').get(addindex)).children('ul').find('.li-span-name span').each(function (indexInArray, valueOfElement) {
                var spantext = $(this).text();
                if (spantext == text) {
                    layer.msg('不许添加同名类型');
                    addflag1 = 'youle';
                    return false;
                }
            });
            if ($('.modelName').length == 0 && addflag1 == 'meiyou') {
                $($('.addModel-div').get(addindex)).children('.addmodel-section').append(modelli);
                $($('.addModel-div').get(addindex)).find('.addmodel-section .section-model-li:nth-last-child(1) input').attr('title', text);
                $($('.addModel-div').get(addindex)).find('.model-name').val('');
                form.render();
            } else {
                if (addflag == 'meiyou' && addflag1 == 'meiyou') {
                    $($('.addModel-div').get(addindex)).children('.addmodel-section').append(modelli);
                    $($('.addModel-div').get(addindex)).find('.addmodel-section .section-model-li:nth-last-child(1) input').attr('title', text);
                    $($('.addModel-div').get(addindex)).find('.model-name').val('');
                    form.render();
                }
            }
        }
    });

    //删除添加型号面板的型号
    BODY.on('click', '.model-li-del', function (e) {
        e.preventDefault();
        $(this).parent('.section-model-li').remove();
    });
    //删除型号面板的型号
    BODY.on('click', '.model-li-close', function (e) {
        e.preventDefault();
        var form = layui.form;
        var modelli = $([
            '<div class="section-model-li">',
            '   <div class="model-name-div">',
            '       <input class="modelName" type="checkbox" name="" title="" lay-filter="modelName-filter">',
            '   </div>',
            '   <i class="layui-icon layui-icon-close model-li-del"></i>',
            '</div>'
        ].join(''));
        var text = $(this).siblings('span').text();
        $(this).parents('ul').find('section').append(modelli);
        modelli.find('input').attr('title', text);
        $(this).parents('.model-li').remove();
        form.render();
    });


    layui.use(['element', 'form', 'upload', 'table'], function () {
        var $ = layui.jquery,
            upload = layui.upload,
            form = layui.form,
            layer = layui.layer,
            table = layui.table;
        var upload_i = 0;
        //添加型号插入型号面板
        BODY.on('click', '.addModel-div-confirm', function (e) {
            e.preventDefault();
            //类型名内容
            var addModelli = [
                '<li class="model-li">',
                '    <div class="li-div-modelname">',
                '       <span class="li-span-name">',
                '           <span></span>',
                '           <i class="layui-icon layui-icon-close model-li-close"></i>',
                '       </span>',
                '       <div class="nohave-img showimgpreview">',
                '           <div class="upload-img-preview" >',
                '               <i class="layui-icon layui-icon-add-1"></i>',
                '               <img src="" alt="" class="layui-upload-img">',
                '           </div>',
                '           <div class="upload-ops">',
                '               <a href="javascript:;" class="imgSingleDel">删除</a>',
                '           </div>',
                '       </div>',
                '   </div>',
                '</li>'
            ].join('');
            var index = $(".addModel-div-confirm").index($(this));
            $(this).parent('.addModel-footer').siblings('section').find('.layui-form-checked span').each(
                function (indexInArray, valueOfElement) {
                    if ($($('.product-div-model-title').get(index)).find('div[lay-skin="_switch"]').hasClass('layui-form-onswitch')) {
                        upload_i++;
                        $($('.addModelClassify-div').get(index)).children("ul").prepend(addModelli);
                        $($('.addModelClassify-div').get(index)).children("ul").children("li:first-child").find('.li-span-name span').text($(this).text());
                        $($('.addModelClassify-div').get(index)).children("ul").children("li:first-child").find('.showimgpreview').css('display', 'block');
                        $(this).parents('.section-model-li').remove();
                        $($('.addModelClassify-div').get(index)).children("ul").children("li:first-child").find('.upload-img-preview').attr('id', 'upload-img-preview' + upload_i);
                        onImgUpload('#upload-img-preview' + upload_i + '');
                    } else {
                        upload_i++;
                        $(addModelli).find('.upload-img-preview').attr('id', 'upload-img-preview' + upload_i + '');
                        $($('.addModelClassify-div').get(index)).children("ul").prepend(addModelli);
                        $($('.addModelClassify-div').get(index)).children("ul").children("li:first-child").find('.li-span-name span').text($(this).text());
                        $(this).parents('.section-model-li').remove();
                        $($('.addModelClassify-div').get(index)).children("ul").children("li:first-child").find('.upload-img-preview').attr('id', 'upload-img-preview' + upload_i);
                        // // t_data[index].model = tabeldata;
                        // var obj = {
                        //     model: tabeldata
                        // }
                        // t_data[index] = obj;
                        // // var jsio = JSON.stringify(t_data);
                        // // console.log(jsio);
                        onImgUpload('#upload-img-preview' + upload_i + '');
                    }
                }
            );
            // var jsio = JSON.stringify(t_data);
            // console.log(t_data);
        });

        

        function onImgUpload(element) {
            var uploadInst = upload.render({
                elem: element,
                acceptMime: "images",
                auto: false,
                // url: '',
                bindAction: '',
                choose: function (obj) {
                    var files = obj.pushFile();
                    var thisItem = $(this.item);
                    var delindex = $('.upload-img-preview').index(thisItem);
                    console.log('thisItem :', thisItem);
                    //预读本地文件示例，不支持ie8
                    obj.preview(function (index, file, result) {
                        thisItem.find('.layui-upload-img').attr('src', result); //图片链接（base64）
                        setTimeout(() => {
                            thisItem.parent('.nohave-img').addClass('have-img').removeClass('nohave-img');
                        }, 100);
                        thisItem.children('i').css('display', 'none');
                        thisItem.siblings('.upload-ops').css('display', 'block');

                        //删除
                        thisItem.siblings('.upload-ops').find('.imgSingleDel').on('click', function (e) {
                            e.preventDefault();
                            setTimeout(() => {
                                thisItem.parent('.have-img').addClass('nohave-img').removeClass('have-img');
                            }, 100);
                            thisItem.siblings('.upload-ops').css('display', 'none');
                            thisItem.children('i').css('display', 'block');
                            thisItem.find('.layui-upload-img').attr('src', ''); //图片链接（base64）
                            delete files[index];
                            uploadInst.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                        });
                    });
                }
            });
        }

        function merge(res) {

            var data = res.data;
            var mergeIndex = 0; //定位需要添加合并属性的行数
            var mark = 1; //这里涉及到简单的运算，mark是计算每次需要合并的格子数
            var columsName = ['重量', 'size']; //需要合并的列名称
            var columsIndex = [0, 1]; //需要合并的列索引值

            for (var k = 0; k < columsName.length; k++) { //这里循环所有要合并的列
                var trArr = $(".layui-table-body>.layui-table").find("tr"); //所有行
                for (var i = 1; i < res.data.length; i++) { //这里循环表格当前的数据
                    var tdCurArr = trArr.eq(i).find("td").eq(columsIndex[k]); //获取当前行的当前列
                    var tdPreArr = trArr.eq(mergeIndex).find("td").eq(columsIndex[k]); //获取相同列的第一列

                    if (data[i][columsName[k]] === data[i - 1][columsName[k]]) { //后一行的值与前一行的值做比较，相同就需要合并
                        mark += 1;
                        tdPreArr.each(function () { //相同列的第一列增加rowspan属性
                            $(this).attr("rowspan", mark);
                        });
                        tdCurArr.each(function () { //当前行隐藏
                            $(this).css("display", "none");
                        });
                    } else {
                        mergeIndex = i;
                        mark = 1; //一旦前后两行的值不一样了，那么需要合并的格子数mark就需要重新计算
                    }
                }
                mergeIndex = 0;
                mark = 1;
            }
        }

        //多图片上传
        var demoListView = $('#demo2'),
            uploadListIns = upload.render({
                elem: '#moreImgupload',
                url: '${ctx}/inside/houseInsideInfo/upload',
                multiple: true,
                accept: "images",
                auto: false,
                bindAction: "#subup", //手动提交的按钮
                number: 5,

                choose: function (obj) {
                    //将每次选择的文件追加到文件队列
                    var files = obj.pushFile();
                    //预读本地文件示例，不支持ie8
                    obj.preview(function (index, file, result) {
                        console.log(index);
                        $("#nameImage").val($("#nameImage").val() + file.name + ":");

                        //$('#demo2').append('<img src="'+ result +'" alt="'+ file.name +'" class="layui-upload-img" width="90px" height="90px">');
                        // var tr = $(['<tr id="upload-' + index + '" class="editimg">',
                        //     '<td>', '<div class="imgs">',
                        //     '<img src="' + result + '" alt="' + file.name + '" class="layui-upload-img" width="90px" height="90px">',
                        //     '<a class="layui-icon layui-icon-close demo-delete"> <i class="fa fa-times"></i></a>',
                        //     '</div>', '</td>', '</tr>'
                        // ].join(''));

                        var tr = $(['<div id="upload-' + index + '" class="editimg">',
                            '<div class="imgs">',
                            '<img src="' + result + '" alt="' + file.name + '" class="layui-upload-img" width="90px" height="90px">',
                            '<a class="demo-delete layui-btn"><i class="layui-icon layui-icon-close "></i></a>',
                            '</div>', '</div>'
                        ].join(''));
                        //删除
                        tr.find('.demo-delete').on('click', function () {
                            $("#nameImage").val($("#nameImage").val().replace(files[index].name + ":", ''));
                            delete files[index]; //删除对应的文件
                            tr.remove();
                            uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                        });
                        //张数限制
                        var count = parseInt(index.split("-")[1]) + 1; //得到文件索引                      
                        console.log(count);

                        if (count > 4) {
                            $("#nameImage").val($("#nameImage").val().replace(files[index].name + ":", ''));
                            //但是layUI的before方法，不管返回什么，还是会进行上传
                            delete files[index];
                            layer.msg("最多上传4张图片！");
                            uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                            return false;
                        } else {
                            demoListView.append(tr);
                        }
                    });
                },
                before: function () {
                    console.log(123);

                },
                done: function (res, index, upload) {
                    //上传完毕
                    if (res.result == 0) {
                        layer.msg(res.message);
                    } else {
                        layer.msg("文件:" + res.filename + "---" + res.message);
                    }
                },
                error: function (index, upload) {
                    layer.msg("服务器返回错误！");
                    layer.closeAll('loading');

                }
            });

        //表单验证/
        form.verify({
            price: [
                /^[0-9]+([.]{1}[0-9]{1,2})?$/,
                '价格必须为大于等于0的金额，精确到小数点后两位'
            ],
            repertory: [
                /^[1-9]\d*|0$/,
                '库存只能为正整数'
            ]
        });

        //开关监听
        form.on('switch(appendImg)', function (data) {
            var index = $("input[lay-filter=appendImg]").index($(this));
            if (data.elem.checked) {
                $($(".addModelClassify-div").get(index)).find(".showimgpreview").css('display', 'block');
            } else {
                $($(".addModelClassify-div").get(index)).find(".showimgpreview").css('display', 'none');
            }
        });


        form.on('select(choose_classify)', function (data) {
            var markclassify = 'youle';
            var index = $('select[lay-filter="choose_classify"]').index(data.elem);
            var text = $($('.div_select').get(index)).find('dl.layui-select-group dd.layui-this').text();
            var length = $('.div_select').length;
            $('.div_select').each(function (indexInArray, valueOfElement) {
                if (length == 1) {
                    markclassify = 'meiyou'
                } else if (indexInArray == index) {
                    return true;
                } else {
                    var othertext = $($(this)).find('dl.layui-select-group dd.layui-this').text();
                    if (text == othertext) {
                        markclassify = 'youle';
                        return false;
                    } else {
                        markclassify = 'meiyou';
                    }
                }
            });
            if (markclassify == 'youle') {
                layer.msg('商品型号不能重复');
            }
        });

        //数据表格
        table.render({
            elem: '#modeltable',
            page: false,
            limit: 10000,
            cols: [
                [{
                    field: "重量",
                    // minWidth: 230,
                    align: "center",
                    title: Classify[0].marque
                }, {
                    field: "size",
                    // minWidth: 230,
                    align: "center",
                    title: Classify[1].marque
                }, {
                    field: "texture",
                    // minWidth: 230,
                    align: "center",
                    title: Classify[2].marque
                }, {
                    field: "product_op_price",
                    // minWidth: 80,
                    width: 130,
                    align: "center",
                    title: "价格",
                    // fixed: "right",
                    templet: '<div><input type="text" style="width:80px; border: 1px solid #f1f1f1;"></div>'
                }, {
                    field: "product_op_repertory",
                    // minWidth: 80,
                    width: 130,
                    align: "center",
                    title: "库存",
                    // fixed: "right",
                    templet: '<div><input type="text" style="width:80px; border: 1px solid #f1f1f1;"></div>'
                }]
            ],
            data: [{
                "重量": Classify[0].model[0].name, //第一个
                "size": Classify[1].model[0].name,
                "texture": Classify[2].model[0].name
            }, {
                "重量": Classify[0].model[0].name,
                "size": Classify[1].model[0].name,
                "texture": Classify[2].model[1].name

            }, {
                "重量": Classify[0].model[0].name,
                "size": Classify[1].model[1].name,
                "texture": Classify[2].model[0].name
            }, {
                "重量": Classify[0].model[0].name,
                "size": Classify[1].model[1].name,
                "texture": Classify[2].model[1].name
            }, {
                "重量": Classify[0].model[0].name,
                "size": Classify[1].model[2].name,
                "texture": Classify[2].model[0].name

            }, {
                "重量": Classify[0].model[0].name,
                "size": Classify[1].model[2].name,
                "texture": Classify[2].model[1].name
            }, {
                "重量": Classify[0].model[1].name, //第二个
                "size": Classify[1].model[0].name,
                "texture": Classify[2].model[0].name
            }, {
                "重量": Classify[0].model[1].name,
                "size": Classify[1].model[0].name,
                "texture": Classify[2].model[1].name
            }, {
                "重量": Classify[0].model[1].name,
                "size": Classify[1].model[1].name,
                "texture": Classify[2].model[0].name
            }, {
                "重量": Classify[0].model[1].name,
                "size": Classify[1].model[1].name,
                "texture": Classify[2].model[1].name
            }, {
                "重量": Classify[0].model[1].name,
                "size": Classify[1].model[2].name,
                "texture": Classify[2].model[0].name
            }, {
                "重量": Classify[0].model[1].name,
                "size": Classify[1].model[2].name,
                "texture": Classify[2].model[1].name
            }, {
                "重量": Classify[0].model[2].name, //第三个
                "size": Classify[1].model[0].name,
                "texture": Classify[2].model[0].name
            }, {
                "重量": Classify[0].model[2].name,
                "size": Classify[1].model[0].name,
                "texture": Classify[2].model[1].name
            }, {
                "重量": Classify[0].model[2].name,
                "size": Classify[1].model[1].name,
                "texture": Classify[2].model[0].name
            }, {
                "重量": Classify[0].model[2].name,
                "size": Classify[1].model[1].name,
                "texture": Classify[2].model[1].name
            }, {
                "重量": Classify[0].model[2].name,
                "size": Classify[1].model[2].name,
                "texture": Classify[2].model[0].name
            }, {
                "重量": Classify[0].model[2].name,
                "size": Classify[1].model[2].name,
                "texture": Classify[2].model[1].name
            }],
            done: function (res) {
                merge(res);
            }
        });
    });
});