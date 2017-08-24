(function () {
    var imageRoll = {};
    var index = 1;
    var timer = null;
    var num = 5;//轮播图片数量
    var isMoving = false;
    var interval = 3000;//动画执行间隔

    var container = document.querySelector('.image-roll-container');
    var list = container.querySelector('.image-roll-list');//图片容器
    var prevBtn = container.querySelector('.image-roll-prev');
    var nextBtn = container.querySelector('.image-roll-next');
    var focus = container.querySelector('.image-roll-focus');
    var focusElems = focus.children;//焦点元素

    /**
     *图像平滑移动动画
     *@param offset 当前位置与目的位置偏移量
     */
    var animate = function (offset) {
        var span = 10;//两次移动时间间隔
        var time = 300;//移动执行时间
        var times = time / span;
        var speed = offset / times;
        var startVal = list.offsetLeft;//开始位置
        isMoving = true;
        var timer = setInterval(function () {
            if ((speed > 0 && list.offsetLeft < startVal + offset) || (speed < 0 && list.offsetLeft > startVal + offset)) {
                list.style.left = list.offsetLeft + speed + 'px';
            }
            else {
                if (list.offsetLeft > -600) {
                    list.style.left = -600 * num + 'px';
                }
                if (list.offsetLeft < -600 * num) {
                    list.style.left = -600 + 'px';
                }
                clearInterval(timer);
                isMoving = false;
            }
        }, span);
    };

    /**
     *焦点聚焦
     *@param index 焦点元素index属性值
     */
    var focusByIndex = function (index) {
        if (index) {
            for (var i = 0, len = focusElems.length; i < len; i++) {
                if (focusElems[i].className == 'image-roll-on') {
                    focusElems[i].className = '';
                    break;
                }
            }
            focusElems[index - 1].className = 'image-roll-on';
        }
    };

    /**
     *向右移动
     */
    var move = function () {
        if (isMoving) {
            return;
        }
        index++;
        if (index == 6) {
            index = 1;
        }
        animate(-600);
        focusByIndex(index);
    };

    /**
     *轮播动画
     */
    var roll = function () {
        timer = setInterval(move, interval);
    };

    /**
     *停止轮播
     */
    var stop = function () {
        clearInterval(timer);
    };

    prevBtn.addEventListener('click', function () {
        if (isMoving) {
            return;
        }
        index--;
        if (index == 0) {
            index = 5;
        }
        animate(600);
        focusByIndex(index);
    }, false);

    nextBtn.addEventListener('click', move, false);

    focus.addEventListener('click', function (e) {
        if (isMoving) {
            return;
        }
        e = e || window.event;
        var target = e.target;
        if (target.className == 'image-roll-on') {
            return;
        }
        var indexNum = target.getAttribute('index');
        //点击到焦点父元素indexNum为空
        if (!indexNum) {
            return;
        }
        else {
            animate((indexNum - index) * (-600));
            index = indexNum;
            focusByIndex(index);
        }
    }, false);

    //鼠标移入移出
    container.addEventListener('mouseout',roll, false);
    container.addEventListener('mouseover', stop, false);

    roll();

    // var getStyle = function (element, attr) {
    //     if(element.currentStyle) {
    //         return element.currentStyle[attr];//兼容ie版本
    //     } else {
    //         return getComputedStyle(element, false)[attr];//兼容FF和谷歌版本
    //     }
    // };
})()