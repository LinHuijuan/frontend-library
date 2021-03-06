// JavaScript Document

//'$'operation
function $(v) {
    if (typeof v === 'function') {
        window.onload = v;
    } else if (typeof v === 'string') {
        return document.getElementById(v);
    } else if (typeof v === 'object') {
        return v;
    }
}

//Get Style
function getStyle(obj, attr) {
    //currentStyle(只兼容IE，只能获取不能设置）
    //getComputedStyle(只兼容火狐谷歌，只能获取不能设置)
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}

//Multivalued Motion
//dir: frequency
function doMove(obj, attr, dir, target, endFn) {

    dir = parseInt(getStyle(obj, attr)) < target ? dir : -dir;

    clearInterval(obj.timer);

    obj.timer = setInterval(function () {

        var speed = parseInt(getStyle(obj, attr)) + dir; // 步长

        if (speed > target && dir > 0 || speed < target && dir < 0) {
            speed = target;
        }

        obj.style[attr] = speed + 'px';

        if (speed == target) {
            clearInterval(obj.timer);

            /*
            if ( endFn ) {
            	endFn();
            }
            */
            endFn && endFn();

        }

    }, 30);
}

//System Time
function fnTime() {
    var oBody = document.body;
    var myTime = new Date();
    // number
    var iYear = myTime.getFullYear();
    var iMonth = myTime.getMonth() + 1;
    var iDate = myTime.getDate();
    var iWeek = myTime.getDay();
    var iHours = myTime.getHours();
    var iMin = myTime.getMinutes();
    var iSec = myTime.getSeconds();
    var str = '';
    var arr = ['日', '一', '二', '三', '四', '五', '六'];
    iWeek = '星期' + arr[iWeek];
    str = iYear + '年' + iMonth + '月' + iDate + '日 ' + iWeek + ' ' + toTwo(iHours) + ' : ' + toTwo(iMin) + ' : ' + toTwo(iSec);

    oBody.innerHTML = str;

}


//Shake Function
//var pos = parseInt(getStyle(obj, attr));
function shake(obj, attr, pos, endFn) {

    var arr = []; // 20, -20, 18, -18 ..... 0
    var num = 0;
    var timer = null;

    for (var i = 20; i > 0; i -= 2) {
        arr.push(i, -i);
    }
    arr.push(0);

    clearInterval(obj.shake);
    obj.shake = setInterval(function () {
        obj.style[attr] = pos + arr[num] + 'px';
        num++;
        if (num === arr.length) {
            clearInterval(obj.shake);
            endFn && endFn();
        }
    }, 50);
}

var EventUtil = {

    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        }
    },

    getEvent: function (event) {
        return event || window.event;
    },

    getTarget: function (event) {
        return event.target || event.srcElement;
    },

    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        }
    },

    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }

};