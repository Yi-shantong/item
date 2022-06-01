
// 放大镜效果
let mask = document.querySelector('.mask');
let big = document.querySelector('.big');
let small = document.querySelector(".small");
let box = document.querySelector('.preview_img');
let img = document.querySelector(".bigimg")
// console.log(mask,big);
// console.log(small,box,img);

// 鼠标移入小图片盒子 黄盒子  大图片出现 移出就消失
small.onmouseenter = function () {
    mask.style.display = "block";
    big.style.display = "block"

}
// 移出消失
small.onmouseleave = function () {
    mask.style.display = 'none';
    big.style.display = 'none';
}

//  黄盒子在小盒子范围内活动  鼠标始终位于黄盒子中心
small.onmousemove = function (e) {
    // 获取鼠标在可视区坐标
    let x = e.clientX;
    let y = e.clientY;

    let offLeft = box.offsetLeft;
    let offTop = box.offsetTop;
    // 计算 鼠标在 small中的坐标
    let tX = x - offLeft;
    let tY = y - offTop;

    // 鼠标位于黄盒子中间
    tX -= mask.offsetWidth / 2;
    tY -= mask.offsetHeight / 2;

    console.log(tY);

    // 黄盒子不能超过限制范围
    let maxX = small.offsetWidth - mask.offsetWidth;
    let maxY = small.offsetHeight - mask.offsetHeight;
    // 判断距离
    tX = tX < 0 ? 0 : tX;
    tX = tX > maxX ? maxX : tX;
    tY = tY < 0 ? 0 : tY;
    tY = tY > maxY ? maxY : tY;

    // 给黄盒子赋值
    mask.style.left = tX + 'px';
    mask.style.top = tY + 'px';

    // 使黄盒子的位置 与大盒子的位置 一致
    let imgMaxX = img.offsetWidth - big.offsetWidth;
    let imgMaxY = img.offsetHeight - big.offsetHeight;

    var imgX = tX / maxX * imgMaxX;
    var imgY = tY / maxY * imgMaxY;

    // 赋值 
    img.style.left = -imgX + 'px';
    img.style.top = -imgY + 'px';

}




