(function () {
    var imageRoll = {};
    var index = 1;
    var timer = null;

    // var getStyle = function (element, attr) {
    //     if(element.currentStyle) {
    //         return element.currentStyle[attr];//兼容ie版本
    //     } else {
    //         return getComputedStyle(element, false)[attr];//兼容FF和谷歌版本
    //     }
    // };

    var container = document.querySelector('.image-roll-container');
    var list = container.querySelector('.image-roll-list');
    var prevBtn = container.querySelector('.image-roll-prev');
    var nextBtn = container.querySelector('.image-roll-next');
    var focus = container.querySelector('.image-roll-focus');

    var focusByIndex = function (index) {
        if (index) {
            var focusElem = focus.children;
            for (var i = 0, len = focusElem.length; i < len; i++) {
                if (focusElem[i].className == 'image-roll-on') {
                    focusElem[i].className = '';
                    break;
                }
            }
            focusElem[index - 1].className = 'image-roll-on';
        }
    };
    var isMoving = true;
    var interval = 10;//动画执行间隔
    var time = 500;//动画执行时间
    var times = time / interval;
    var animate = function (leftVal, target) {
        var speed = target / times;
        var i = 0;
        var timer = setInterval(function () {
            isMoving = true;
            if (list.offsetLeft < leftVal + target || list.offsetLeft > leftVal + target) {
                list.style.left = leftVal + speed * i + 'px';
                i++;
            }
            else {
                clearInterval(timer);
                isMoving = false;
            }
        }, interval);
    };

    prevBtn.addEventListener('click', function () {
        var leftVal = list.offsetLeft;
        if (leftVal >= -600) {
            leftVal = -3600;
        }
        animate(leftVal, 600);
        //list.style.left = leftVal + 600 + 'px';
        index--;
        if (index <= 0) {
            index = 5;
        }
        focusByIndex(index);
    }, false);
    var moveToPrev = function () {
        
    };
    var moveToNext = function () {
        var leftVal = list.offsetLeft;
        if (leftVal <= -3600) {
            leftVal = -600;
        }
        animate(leftVal, -600);
        //list.style.left = leftVal - 600 + 'px';
        index++;
        if (index >= 6) {
            index = 1;
        }
        focusByIndex(index);
    };

    var stop = function () {
        clearInterval(timer);
    };

    nextBtn.addEventListener('click', moveToNext, false);

    focus.addEventListener('click', function (e) {
        e = e|| window.event;
        var target = e.target;
        var indexNum = target.getAttribute('index');
        if (!indexNum) {
            return;
        }
        else {
            
            animate(list.offsetLeft, (indexNum - index) * (-600));
            //list.style.left = index * (-600) + 'px';
            index = indexNum;
            focusByIndex(index);
        }
    }, false);

    

    var roll = function () {
        timer = setInterval(moveToNext, 3000);
    };
    roll();

    container.addEventListener('mouseout',roll, false);
    container.addEventListener('mouseover',stop, false);

})()