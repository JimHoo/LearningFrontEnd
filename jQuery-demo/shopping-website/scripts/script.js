$(function(){
    //搜索框
    $(function () {
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


    //皮肤切换
    $(function () {
        var switchSkin = function (skinName) {
            $('#' + skinName).addClass('selected')
                .siblings().removeClass("selected");
            $('#skin-css').attr('href', 'styles/skin/' + skinName + '.css');
            $.cookie('mySkin', skinName, { path: '/', expires: 10 });//存储的是一个值，即第二个参数
        };

        $('.skin li').click(function () {
            switchSkin(this.id);
        });
        var cookieSkin = $.cookie('mySkin');//取出值
        if (cookieSkin) {
            switchSkin(cookieSkin);
        }
    })



    //导航效果
    //光标移入触发第一个函数，光标移出触发第二个函数。
    $(function () {
        $('.nav li').hover(function () {
            $(this).find('.sub-nav').show();
        }, function () {
            $(this).find('.sub-nav').hide();
        });
    })


    //轮播效果
    $(function () {
        var $rollTab = $('.image-roll > div a');
        var len = $rollTab.length;
        var index = 0;
        var rollTimer;
        var showImage = function (index) {
            var $imageWrap = $('.image-roll .image-list');
            var $rollOn = $rollTab.eq(index);//eq()根据索引获取子元素
            $imageWrap.attr('href', $rollOn.attr('href'))
                .children().eq(index).stop(true, true).fadeIn()//stop()结束动画队列跳到最后
                .siblings().fadeOut();
            $rollOn.addClass('choose')
               .siblings().removeClass('choose');
        };
        $rollTab.mouseover(function () {
            index = $rollTab.index(this);//index()获取子元素索引
            showImage(index);
        });
        $('.image-roll').hover(function () {
            if (rollTimer) {
                clearInterval(rollTimer);
            }
        }, function () {
            rollTimer = setInterval(function () {
                index++;
                if (index == len) {
                    index = 0;
                }
                showImage(index);
            }, 3000);
        }).mouseleave();
    })


    //超链接提示
    $(function () {
        var x = 10;
        var y = 20;
        $('.news a').mouseover(function (e) {
            var $tooltip = $('<div id="tooltip"></div>');
            $('body').append($tooltip);
            $tooltip.text($(this).text());
            $tooltip.css({
                'left': (e.pageX + 10) + 'px',
                'top': (e.pageY + 20) + 'px'
            }).show('fast');//必须show()重新显示，否则只会出现在页面最后
        }).mouseout(function () {
            $('#tooltip').remove();
        }).mousemove(function (e) {
            $('#tooltip').css({
                'left': (e.pageX + 10) + 'px',
                'top': (e.pageY + 20) + 'px'
            })
        });
    })


    //品牌活动横向滚动效果
    $(function () {
        var index = 0;
        $('#brand-title li a').click(function () {
            index = $('#brand-title li a').index(this);
            $(this).parent().addClass('on')
                .siblings().removeClass('on');
            var $brandList = $('.brand-list');
            var rollWidth = $brandList.find('li').outerWidth() * 4;//outerWidth()整个元素宽度
            $brandList.stop(true, false).animate({left: -rollWidth * index}, 1000);
        })
    })


    //鼠标滑过效果
    $(function () {
        $('.brand-list > li > a').hover(function () {
            var $zoomMask = $('<div id="zoom-mask"></div>');
            $(this).append($zoomMask);
        }, function () {
            $('#zoom-mask').remove();
        })
    })
    
})