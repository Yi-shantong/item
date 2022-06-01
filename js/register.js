// 手机号栏
// 绑定事件
let tel = document.querySelector("#tel");
let em = document.querySelector("#phone-sure");
//console.log(em);
let phone = /^1{1}[356789]{1}\d{9}$/;
tel.onblur = function () {
    let val = this.value;
    if (!phone.test(val)) {

        em.innerHTML = "请输入正确的手机号!"
        em.style.color = "red";

    } else {
        em.innerHTML = "手机号格式正确! ^_^"
        em.style.color = "green";
    }

}
// 手机号验证码
let code = document.querySelector("#code2")
let one = document.querySelector("#one")

let res1 = /^\d{6}$/
code.onblur = function () {
    let val = this.value;
    if (!res1.test(val)) {
        console.log("aaa");
        one.innerHTML = "请输入正确的验证码!"
        one.style.color = "red";

    } else {
        one.innerHTML = "验证码正确! ^_^"
        one.style.color = "green";

    }


}

// 密码框
let psw= document.querySelector("#psw")
let ps = document.querySelector("#password-sure")
//console.log(psw, ps);
let  pasw = /^\w{6,16}$/
psw.onblur = function () {
    let val = this.value;
    if (!pasw.test(val)) {
        
        ps.innerHTML = "密码输入错误!"
        ps.style.color = "red";

    } else {
        ps.innerHTML = "密码正确! ^_^"
        ps.style.color = "green";

    }


}