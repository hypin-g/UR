let mainList = document.querySelector(".mainList");
let cartSun = document.querySelector(".cartSun");
let count = document.querySelector(".count");
let goods = document.querySelector(".goods");
let without = document.querySelector(".without");
let allcheckd = document.querySelector(".allcheckd");
// 是否进入登录和购物车
let useruState = document.querySelector(".useruState");
let buycart = document.querySelector(".buycart");
let session = sessionStorage.getItem("user");

if (session) {
  useruState.innerHTML = session;
}
useruState.onclick = function () {
  if (!session) {
    window.location.href = "./login.html";
  }
};

let goWuChe = JSON.parse(sessionStorage.getItem("goWuChe"));
if (goWuChe && goWuChe.length > 0) {
  goods.style.display = "block";
  show();
  without.style.display = "none";
} else {
  without.style.display = "block";
  goods.style.display = "none";
}
// 渲染购物🚗
function show() {
  if (goWuChe.length > 0) {
    let bool = goWuChe.every((item) => {
      return item.is_select == 1;
    });
    let str = "";
    let allCount = 0;
    let prices = 0;

    goWuChe.forEach(function (item) {
      if (item.is_select == 1) {
        allCount += item.count;
        prices += item.count * 199;
      }
    });
    let str2 = "";
    let str3 = "";
    for (let i = 0; i < goWuChe.length; i++) {
      str += `
   <div class="cartNews">
          <div><input type="checkbox" name="xuan" ${
            goWuChe[i].is_select == 1 ? "checked" : ""
          }  id=${goWuChe[i].id}></div>
          <div><img src="${goWuChe[i]["图片"]}" /></div>
          <div>
            <p class="b">${goWuChe[i]["标题"]}</p>
            <p>商品编号<span>YL19S7AE2007</span></p>
            <p class="col">颜色<span>棕色印花</span></p>
            <p>尺码<span>S(165/84A)</span></p>
          </div>
          <div>¥<span class="b">199.00</span></div>
          <div class="numb">
            <a href="javascript:;" date-id=${goWuChe[i].id}>-</a>
            <a href="javascript:;">${goWuChe[i].count}</a>
            <a href="javascript:;" date-id=${goWuChe[i].id}>+</a>
          </div>
          <div>
            <a href="javascript:;" date-id=${goWuChe[i].id}>x</a>
          </div>
        </div>   `;
    }

    // 商品总数和价格
    str2 = `<div>
    <p>商品总数</p>
    <p><span>${allCount}</span>件</p>
  </div>
  <div>
    <p>优惠价格</p>
    <p>¥<span>0.00</span></p>
  </div>
  <div>
    <p>总金额</p>
    <p>¥<span>${prices}</span></p>
  </div>`;
    // 全选结算
    str3 = `<div class="all">
  <input type="checkbox" id='quan' onclick='quanclick()' class="allcheckd" ${
    bool ? "checked" : ""
  } />&nbsp;全选
</div>
<div class="gobuy count-btn">
  <a href="./list.html">&lt&nbsp继续购买</a>
</div>
<div class="pay count-btn">结算</div>`;
    // 加入到html文档里
    mainList.innerHTML = str;
    cartSun.innerHTML = str2;
    count.innerHTML = str3;
  } else {
    without.style.display = "block";
    goods.style.display = "none";
  }
}
//给整个对象绑定点击事件
mainList.onclick = function (e) {
  //事件对象兼容
  let event = e || window.event;
  //目标对象兼容
  let target = event.target || event.srcElement;
  //判断点击的是否为选中框对象
  if (target.name == "xuan") {
    let id = target.getAttribute("id");
    goWuChe.forEach(function (item) {
      //判断是否为当前要操作的商品
      if (item.id == id) {
        //判断当前商品中is_select是否等于1
        if (item.is_select == 1) {
          item.is_select = 0;
        } else {
          item.is_select = 1;
        }
      }
    });
    setGoWuChe(goWuChe);
  }
  // 加法
  if (target.innerHTML == "+") {
    let id = target.getAttribute("date-id");

    goWuChe.forEach((ele) => {
      if (ele.id == id) {
        ele.count++;
      }
    });
    setGoWuChe(goWuChe);
  }

  // 减法
  if (target.innerHTML == "-") {
    let id = target.getAttribute("date-id");
    goWuChe.forEach((ele) => {
      if (ele.id == id) {
        if (ele.count == 1) {
          alert("减不了了");
        } else {
          ele.count--;
        }
      }
    });
    setGoWuChe(goWuChe);
  }

  // 删除
  if (target.innerHTML == "x") {
    let id = target.getAttribute("date-id");
    goWuChe = goWuChe.filter((item) => {
      return item.id != id;
    });
    //把修改完毕的goWuChe重新存储在sessionStorage中
    setGoWuChe(goWuChe);
  }
};
// 更新购物车数据到sessionStorage
function setGoWuChe(goWuChe) {
  sessionStorage.setItem("goWuChe", JSON.stringify(goWuChe));
  show();
}
function quanclick() {
  let quan = document.getElementById("quan");
  goWuChe.forEach(function (item) {
    quan.checked ? (item.is_select = 1) : (item.is_select = 0);
  });
  setGoWuChe(goWuChe);
}
