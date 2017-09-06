$(function(){
    $(function() {
        //搜索框
        $('#input-search').focus(function () {
            if ($(this).val() == this.defaultValue) {
                $(this).val("");
            }
        }).blur(function () {
            if ($(this).val() == "") {
                $(this).val(this.defaultValue);
            }
        }).keyup(function (e) {
            if (e.which == 13) {
                alert("提交成功！");
            }
        });
    })



    $(function() {
        //皮肤切换
        var switchSkin = function (skinName) {
            $('#' + skinName).addClass('selected')
                .siblings().removeClass("selected");
            $('#skin-css').attr('href', 'styles/skin/' + skinName + '.css');
            $.cookie('mySkin', skinName, {path: '/', expires: 10});//存储的是一个值，即第二个参数
        };

        $('.skin li').click(function () {
            switchSkin(this.id);
        });
        var cookieSkin = $.cookie('mySkin');//取出值
        if (cookieSkin) {
            switchSkin(cookieSkin);
        }
    })


    $(function() {
        //导航效果
        //光标移入触发第一个函数，光标移出触发第二个函数。
        $('.nav li').hover(function () {
            $(this).find('.sub-nav').show();
        }, function () {
            $(this).find('.sub-nav').hide();
        });
    })
    
    //点击小图切换大图功能也包含在jqzoom.js插件中，只需设置对应元素的rel属性。

    $(function() {
        //点击小图更改弹出层图片
        $('.small-img-list li a').on('click', function() {
            var srcImg = $(this).find('img').attr('src');
            var i = srcImg.lastIndexOf('.');
            var name = srcImg.slice(0, i);
            var suffix = srcImg.slice(i);
            $('#thickImg').attr('href', name + '_big' + suffix);
        })
    })

    $(function () {
        //产品属性选项卡
        var $menu = $('.product-tab .tab-menu li');

        $menu.on('click', function () {
            $(this).addClass('selected')
                .siblings().removeClass('selected');
            var index = $menu.index($(this));
            $('.product-tab .tab-box div').eq(index).show()
                .siblings().hide();
        })
    })

    $(function () {
        //颜色切换
        $('#select-color li img').on('click', function () {
            $(this).addClass('selected')
                .parent().siblings().find('img').removeClass('selected');
            var img = $(this).attr('src');
            var i = img.lastIndexOf('.');
            var name = img.substring(0, i);
            var suffix = img.substring(i);

            var bigImg = name + '_one_big' + suffix;
            var smallImg = name + '_one_small' + suffix;
            $('#bigImg').attr('src', smallImg);
            $('#thickImg').attr('href', bigImg);

            var color = name.substring(name.lastIndexOf('/') + 1)
            $('.small-img-list li').hide()
                .filter('.list-' + color).show();

            var text = $(this).attr('alt');
            $('#color-text').text(text);

            $('.small-img-list li').filter('.list-' + color).eq(0)
                .find('a').trigger('click');
        })
    })

    $(function () {
        //尺寸
        $('.size li').on('click', function () {
            $(this).addClass('selected')
                .siblings().removeClass('selected');

            $(this).parent('ul').siblings('#size-text')
                .text($(this).text());
        });
    })

    $(function () {
        //数量价格联动
        var $priceText = $('#price-text');
        var price = $priceText.text();
        $('.quantity select').change(function () {
            var num = $(this).val();
            $priceText.text(num * price);
        }).change();
    })
    
    $(function () {
        //评分效果
        $('.score a').on('mouseover', function () {
            // var index = 
        });
    })
})