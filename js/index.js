//1. 轮播图
//  获取节点
const ulLisObj = document.querySelectorAll('#ul li'),
  //console.log(ulLisObj);
  olLisObj = document.querySelectorAll('#ol li'),

  prev = document.querySelector(".arrow-l"),
  next = document.querySelector(".arrow-r");
//console.log(olLisObj);
// 图片下标
let index = 0;
//即将消失图片下标
let lastIndex = 0;
let times;
// 选定原型数字框
olLisObj.forEach((li, key) => {
  li.onclick = function () {
    lastIndex = index;
    index = key;
    change();

    //console.log(key);

  }
})


// 设置两侧的<和>
// 左边
prev.onclick = function () {

  lastIndex = index;
  index--;
  // 第一张<到最后一张
  if (index < 0) {
    index = olLisObj.length - 1;
  }
  change();

}
// 右边
next.onclick = function () {
  lastIndex = index;
  index++;
  //最后一张到第一张
  if (index > olLisObj.length - 1) {
    index = 0;
  }
  change();
}

// 根据下标进行图片切换
// 自动播放定时器
function autoPaly() {
  //console.log(3333);
  times = setInterval(() => {
    //console.log(111);
    next.onclick();
  }, 1000)

}
autoPaly();


next.parentNode.parentNode.onmouseenter = function () {
  clearInterval(times)
}

next.parentNode.parentNode.onmouseleave = function () {
  autoPaly();
}

//console.log(next.parentNode.parentNode);


// 将ac赋值或者取消赋值
function change() {
  olLisObj[lastIndex].className = "";
  ulLisObj[lastIndex].className = "";

  olLisObj[index].className = "ac";
  ulLisObj[index].className = "ac"

}








//倒计时  
// 活动时间 - 当前时间   得到小时分钟秒钟 追加到页面中
// 获取 几点场 的节点
let strong = document.querySelector("#times");
//console.log(strong);
// 获取小时,分钟,秒钟节点  后面将数据追加到这个节点中
let span = document.querySelector(".timer").children;

//console.log(span);

//console.log(nowTime);
function timeFn() {

  let nowTime = new Date();
  // let endTime = + new Date() + (60*60*2*1000);
  // let strTime = endTime.split(" ");
  // // console.log(strTime[1]);
  //  let sh = strTime[1].split(":");
  // //  console.log(sh);
  // strong.innerHTML = sh[0];
  let nowMin = nowTime.getMinutes();  
  let nowS = nowTime.getSeconds();
  let nowHours = nowTime.getHours();
  // console.log(nowMin);
  // console.log(nowS);
  let oneHours =((nowHours % 2 ) * 60 *60 *1000) ;
  if (nowHours % 2) {
    //单数小时 
    nowHours = nowHours - 1;
    
  }

   
   //console.log(oneHours);

  let endTimes =( (60 * 60  *2 *1000) - (nowMin * 1000 * 60 + nowS * 1000 ) - oneHours);
  strong.innerHTML = nowHours;
  // 两个小时后 和现在距离多久  单位是毫秒

  //console.log(endTimes);


  
  //需要多少秒
   let needTime = parseInt(endTimes / 1000);
  // let day = parseInt(needTime /(60*60*24) );
  let hours = parseInt((needTime % (60 * 60 * 24)) / (60 * 60));
  let min = parseInt(needTime % (60 * 60) / 60);
  let s = parseInt(needTime % 60);


  // 时间不够10时候 转变成 01,02....的形式
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (min < 10) {
    min = "0" + min;
  }
  if (s < 10) {
    s = "0" + s;
  }


  //追加到页面中
  span[0].innerHTML = hours;
  span[1].innerHTML = min;
  span[2].innerHTML = s;

  // 开启倒计时  没一秒调用一次
  setInterval(function () {
    timeFn(endTimes);

  }, 1000)


}
timeFn();