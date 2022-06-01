class Cart {

    constructor() {
        this.checkLogin();
        this.getCartGoods();
        this.bineEve();
        // this.cartNumber();


    }

    bineEve() {

        this.$('.cart-list').addEventListener('click', this.distributeEve.bind(this));
        // 全选绑定按钮
        this.$('.cart-th input').addEventListener('click', this.clickAllChecked.bind(this));
        // this.$('.plus').addEventListener('click', this.plus.bind(this));




    }




    // 通过事件委托实现单个商品的操作
    distributeEve({
        target
    }) { //结构赋值 获取事件源
        // 有就是删除按钮
        if (target.parentNode.classList.contains("del1")) {

            this.delGoods(target);
            //console.log("bbb");
        }
        // 判断点击的是否是单个的商品的选中
        //contains方法  如果A元素包含B元素，则返回true，否则false
        if (target.classList.contains("good-checkbox")) {
            //console.log(target);
            this.getOneGoodsCheck(target);
            this.getNumPriceGoods()
            //console.log("aaa");

        }

        if (target.classList.contains("plus")) {
            this.increase(target)


        }

        if (target.classList.contains("mins")) {
            this.reduce(target)
            //console.log(target);
        }



    }


    // 删除
    delGoods(target) {

        let layerIndex = layer.confirm("是否确认删除", {
            title: "删除"

        }, function () {

            let ulObj = target.parentNode.parentNode.parentNode;
            // console.log(ulObj);
            let id = ulObj.dataset.id;
            //console.log(id);
            let userId = localStorage.getItem("user_id");
            //console.log(userId); 
            // ajax 删除数据
            axios.get('http://localhost:8888/cart/remove?id=' + userId + '&goodsId=' + id).then(res => {
                let {
                    data,
                    status
                } = res;
                // 删除成功 关闭删除框 并删除商品
                if (data.code == 1) {
                    layer.close(layerIndex);
                    layer.msg("删除成功");
                    ulObj.remove();
                    that.getNumPriceGoods()

                }

            })
        })

    }




    // 单个商品的选中按钮的回调
    getOneGoodsCheck(target) {
        // 如果单个商品中有一个flase 就将全选按钮的状态改为false
        if (!target.checked) {
            this.$('.cart-th input').checked = false;
            return;
        }

        if (target.checked) {
            // find 寻找有没有没被选中的
            let res = Array.from(this.$(".good-checkbox")).find(checkbox => {
                return !checkbox.checked;

            })
            // console.log(res);
            //返回undefind 说明页面中商品都选中了 

            if (!res) this.$(".cart-th input").checked = true;

        }

    }

    // 实现全选,反选
    clickAllChecked(eve) {
        // 获取全选
        let checked = eve.target.checked;


        this.oneGoodsCheck(checked);
        this.getNumPriceGoods();


    }

    // 单个商品的选中状态
    oneGoodsCheck(checkedStatus) {
        let goodsList = this.$(".goods-list")
        // 可以从这里获取商品数量  后面追加到页面的商品数量中去
        //console.log(goodsList);
        goodsList.forEach(ul => {

            ul.firstElementChild.firstElementChild.checked = checkedStatus

        })

        let num = this.$(".carNumber");
        num.innerHTML = goodsList.length;



    }


    // //  将购物车内商品数量追加到页面中去
    // cartNumber() {

    //     // let list  = document.querySelector(".cart-list")
    //     // console.log(list);
    //     let goodsNum = this.$(".cart-list");
    //     console.log(goodsNum);


    //     let res = Array.from(this.$(".cart-list")).forEach(goodsNum => {
    //         // console.log(res.key);
    //         let child = goodsNum.Children;
    //         console.log(child);
    //     });
    //     //console.log(res.length);


    // }






    //  判断用户操作购物车时是否已经登录
    async checkLogin() {
        // 获取token值作为用户是否已经登录的判断依据
        const Token = localStorage.getItem("token");
        // 判断登录过期
        axios.defaults.headers.common['authorization'] = Token;
        let userId = localStorage.getItem("user_id");
        let {
            data,
            status
        } = await axios.get("http://localhost:8888/users/info/" + userId);
        //console.log(data, status);


        if (!Token || data.code == 401) {
            // 没有Token 就是没有登录 跳转到登录页面
            location.assign("../login.html?ReturnUrl=./cart.html")

        }



    }
    //  获取购物车中数据
    async getCartGoods() {
        const Token = localStorage.getItem("token");
        // 用户ID
        let userId = localStorage.getItem("user_id");

        axios.defaults.headers.common['authorization'] = Token;
        let {
            data,
            status
        } = await axios.get("http://localhost:8888/cart/list?id=" + userId);
        // console.log(data , status);
        // 判断是否从服务器中获取到数据
        if (status == 200) {
            // 登录过期就跳转到登录页面
            if (status == 401) {
                location.assign("../login.html?ReturnUrl=./cart.html")
            }
            //console.log(data);
            // 接口状态
            if (data.code == 1) {
                // 将数据追加到页面中
                let html = " ";
                data.cart.forEach(goods => {

                    html += `<ul data-id="${goods.goods_id}" class="goods-list yui3-g">
                    <li class="yui3-u-3-8 pr">
                        <input type="checkbox" class="good-checkbox">
                        <div class="good-item">
                            <div class="item-img">
                                <img src="${goods.img_small_logo}">
                            </div>
                            <div class="item-msg">${goods.title}</div>
                        </div>
                    </li>
                    <li class="yui3-u-1-8">
                       
                    </li>
                    <li class="yui3-u-1-8">
                        <span class="price">${goods.price}</span>
                    </li>
                    <li class="yui3-u-1-8">
                        <div class="clearfix">
                            <a href="javascript:;" class="increment mins">-</a>
                            <input autocomplete="off" type="text" value="${goods.cart_number}" minnum="1" class="itxt">
                            <a href="javascript:;" class="increment plus">+</a>
                        </div>
                        <div class="youhuo">有货</div>
                    </li>
                    <li class="yui3-u-1-8">
                        <span class="sum">${goods.price * goods.cart_number}</span>
                    </li>
                    <li class="yui3-u-1-8">
                        <div class="del1">
                            <a href="javascript:;">删除</a>
                        </div>
                        <div>移到我的关注</div>
                    </li>
                </ul>`;

                });
                this.$('.cart-list').innerHTML = html;

            }
        }


    }



    //  + - 按钮实现商品数量的加减
    // + 按钮
    increase(target) {
        let increase = document.querySelector(".plus")


        // 获取到商品id 
        let ulObj = target.parentNode.parentNode.parentNode;
        // let itxt = document.querySelector(".itxt")
        let itxt = ulObj.querySelector(".itxt")
        let sum = ulObj.querySelector(".sum")

        // console.log(sum);
        let price = ulObj.querySelector(".price")


        //console.log(itxt);
        let id = ulObj.dataset.id;
        let userId = localStorage.getItem("user_id");
        let number = itxt.value;
        // console.log(number);
        //console.log(id,userId);
        axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        let data = `id=${userId}&goodsId=${id}&number=${number}`;
        axios.post("http://localhost:8888/cart/number", data).then(res => {
            let {
                status,
                data
            } = res;
            //console.log(data);

            if (status == 200) {
                if (data.code == 1) {
                    itxt.value++;
                    number++;
                    sum.innerHTML = number * price.innerHTML;


                }
            }

        })

    }
    //

    //- 按钮
    reduce(target) {

        let increase = document.querySelector(".plus")


        // 获取到商品id 
        let ulObj = target.parentNode.parentNode.parentNode;
        let itxt = ulObj.querySelector(".itxt")
        let id = ulObj.dataset.id;
        let userId = localStorage.getItem("user_id");
        let number = itxt.value;
        let sum = ulObj.querySelector(".sum")

        // console.log(sum);
        let price = ulObj.querySelector(".price")
        // console.log(number);
        //console.log(id,userId);
        axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        let data = `id=${userId}&goodsId=${id}&number=${number}`;
        axios.post("http://localhost:8888/cart/number", data).then(res => {
            let {
                status,
                data
            } = res;
            // console.log(data);

            if (status == 200) {
                if (data.code == 1) {
                    if (itxt.value <= 1) {
                        ulObj.querySelector(".itxt").disabled = true;
                    } else {
                        
                        itxt.value--;
                        number--;
                        sum.innerHTML = number * price.innerHTML;
                    }
                }
            }

        })




    }









    // 获取页面中 所有商品的价格和数量 追加到页面中
    getNumPriceGoods() {

        let goods = this.$(".goods-list");
        //console.log(goods);
        // let pn = goods.map(one)
        //  数量价格 给一个默认值
        let totalNum = 0;
        let totalPrice = 0;
        //console.log(goods);
        goods.forEach(one => {
            // 计算商品的数量和价格
            if (one.firstElementChild.firstElementChild.checked) {
                totalNum = one.querySelector(".itxt").value - 0 + totalNum;
                totalPrice = one.querySelector(".sum").innerHTML - 0 + totalPrice;
            }


        })
        this.$(".sumprice-top strong").innerHTML = totalNum;
        this.$(".sumprice-top .summoney").innerHTML = totalPrice + "￥";
    }



    //封装获取节点的方法
    $(ele) {
        let res = document.querySelectorAll(ele);
        return res.length == 1 ? res[0] : res;

    }


}
new Cart;