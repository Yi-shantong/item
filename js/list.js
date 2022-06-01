class List {
    baseUsrl = "http://localhost:8888/goods/list?current=1"
    constructor() {
        this.getData();
        this.$('.sk_bd ul').addEventListener('click', this.addCartFn.bind(this))


    }

    // 获取服务器中数据
    async getData() {

        let {
            data,
            status
        } = await axios.get(this.baseUsrl)
        if (status == 200) {
            let html = "";
            data.list.forEach(goods => {
                //console.log(goods);
                // 拼接商品信息
                html += `<li class="sk_goods" data-id="${goods.goods_id}">
                <a href="detail.html"><img src="${goods.img_big_logo}" alt=""></a>
                <h5 class="sk_goods_title">${goods.title}</h5>
                <p class="sk_goods_price"><em>¥${goods.current_price}</em> <del>￥${goods.price}</del></p>
                <div class="sk_goods_progress">
                    已售<i>${goods.sale_type}</i>
                    <div class="bar">
                        <div class="bar_in"></div>
                    </div>
                    剩余<em>${goods.goods_number}</em>件
                </div>
                <a href="#none" class="sk_goods_buy">立即抢购</a>
            </li>`;
            })
            // 绑定节点   把数据追加到节点上
            this.$(".sk_bd ul").innerHTML = html;
        }
    }


    // 加入购物车
    async addCartFn(eve) {
        // 判断用户是否已经登录  登录的话可以获取到 token 反之表示未登录
        //localStorage.getItem(key):获取指定key本地存储的值
        let token = localStorage.getItem("token");
        // if (!token) location.assign("./login.html?ReturnUrl=./list.html")
        if (!token) location.assign('./login.html?ReturnUrl=./list.html')
        console.log("11");
        // 事件委托 通过 抢购 a 标签获取到li中的商品信息
        //class.contains  判断是否包含一个指定的类名
        if (eve.target.classList.contains("sk_goods_buy")) {
            let lisObj = eve.target.parentNode;
            // 商品 ID
            let goodsId = lisObj.dataset.id;
            // 用户 ID
            let userId = localStorage.getItem("user_id");

            //验证ID
            if (!userId || !goodsId) throw new Error("未获取到商品或用户ID");
            // 提供表头 让服务器能够接收到数据
            axios.defaults.headers.common['authorization'] = token;
            axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            let param = `id=${userId}&goodsId=${goodsId}`;
            let {data,status} = await axios.post("http://localhost:8888/cart/add", param);
            // console.log(data);
            if (status == 200) {
                if (data.code == 1) {
                    layer.open({
                        content: "已加入购物车",
                        btn: ["跳转到购物车结算", "留在当前页面"],
                        //点击 第一个按钮 
                        yes:function (index , layer){
                            location.assign('./cart.html')
                        },
                        btn2:function (index , layer){

                        }


                    })
                }
            }

        }

    }





    //封装获取节点的方法
    $(ele) {
        let res = document.querySelectorAll(ele);
        return res.length == 1 ? res[0] : res;

    }






}

new List;