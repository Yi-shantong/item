class Login {

    constructor() {

        // 绑定登录的点击事件
        this.$(".login-w .over").addEventListener("click", this.logFn.bind(this))
    }


    logFn() {
        console.log(location.search);
        // 获取表单
        let forms = document.forms[0].elements;
        //console.log(froms);
        // 验证账号密码框不能为空
        let username = forms.uname.value;
        let password = forms.password.value
        if (!username.trim() || !password.trim()) throw new Error("账号密码不能为空!");
        // 向服务器发送post请求 验证账号密码  获取token值
        // 改变发送类型 json请求服务器不接受
        axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        // 对参数进行编码
        let data = `username=${username}&password=${password}`;
        axios.post('http://localhost:8888/users/login', data).then(res => {

            let {
                status,
                data
            } = res;
            console.log(data);
            // 验证密码
            if (status == 200) {
                if (data.code == 1) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user_id", data.user.id);
                    location.assign(location.search.split("=")[1]);
                } else {
                    layer.open({
                        title: '登录提示',
                        content: '用户名或者密码错误'
                    });
                }

            }

        });
    }

    // 绑定封装
    $(ele) {
        let res = document.querySelectorAll(ele);
        return res.length == 1 ? res[0] : res;

    }

}
new Login;