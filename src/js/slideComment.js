let dom = document.querySelector(".comments");
let slide = document.querySelector(".slide");
let disX = 0;
let disY = 0;
let down = false;
let shouldOffset = 100;

dom.onmousedown = function(e) {
  down = true;
  disX = e.clientX - this.offsetLeft;
  disY = e.clientY - this.offsetTop;
  return false;
};
document.onmousemove = function(e) {
  if (down == true) {
    let temp = e.clientX - disX;
    //偏移范围，主要是右边为外面与里面之差
    if (
      temp < 0 + shouldOffset &&
      temp >= -(dom.clientWidth - slide.clientWidth + shouldOffset)
    ) {
      dom.style.left = temp + "px";
    }
  }
};
document.onmouseup = function(e) {
  down = false;
  //返回动画
  if (dom.offsetLeft > 0) {
    reback(0);
  }
  if (dom.offsetLeft < -(dom.clientWidth - slide.clientWidth)) {
    reback(-(dom.clientWidth - slide.clientWidth));
  }
};

dom.ontouchstart = function(e) {
  down = true;
  disX = e.changedTouches[0].clientX - this.offsetLeft;
  return false;
};
document.ontouchmove = function(e) {
  if (down == true) {
    let temp = e.changedTouches[0].clientX - disX;
    if (
      temp < 0 + shouldOffset &&
      temp >= -(dom.clientWidth - slide.clientWidth + shouldOffset)
    ) {
      dom.style.left = temp + "px";
    }
  }
};
document.ontouchend = function(e) {
  down = false;
  if (dom.offsetLeft > 0) {
    reback(0);
  }
  if (dom.offsetLeft < -(dom.clientWidth - slide.clientWidth)) {
    reback(-(dom.clientWidth - slide.clientWidth));
  }
};

let start = 0;

let reback = (function() {
  let backer;
  return function(target) {
    clearInterval(backer);
    backer = setInterval(function() {
      if (target - dom.offsetLeft != 0) {
        //像素改变最小为1，target大时向上取整为1，target小时向下取整为-1
        if (target > dom.offsetLeft) {
          dom.style.left =
            Math.ceil((target - dom.offsetLeft) / 20) + dom.offsetLeft + "px";
        } else {
          dom.style.left =
            Math.floor((target - dom.offsetLeft) / 20) + dom.offsetLeft + "px";
        }
      } else {
        clearInterval(backer);
      }
    }, 16);
  };
})();
