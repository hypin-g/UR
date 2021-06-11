var box = document.querySelector(".dt-main");
//获取地址栏中的参数信息
var search1 = location.search;
var dt;
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
buycart.onclick = function () {
  if (!session) {
    window.location.href = "./login.html";
  } else {
    window.location.href = "./shopcart.html";
  }
};

//判断当前地址栏中是否有参数
if (search1) {
  //分割字符串
  var ar1 = search1.split("=");
  //判断当前参数是否为id
  if (ar1[0] == "?id") {
    var id = ar1[1];
    (async function () {
      //发送请求，并获取响应结果
      dt = await promiseAjax({
        url: "../details.json",
        data: "id=" + id,
      });
      //把字符串转为对象
      dt = JSON.parse(dt);

      //把数据渲染到页面中
      var str = `<div class="dt-main">
      <div class="dt-show-img">
        <img src="${dt[0]["图片地址"]}" />
        <img src="${dt[0]["图片地址1"]}" />
        <img src="${dt[0]["图片地址2"]}"/>
        <img src="${dt[0]["图片地址3"]}" />
        <img src="${dt[0]["图片地址4"]}"/>
        <img src="${dt[0]["图片地址5"]}" /> 
      </div>
      <div class="dt-show-text">
        <div class="dt-show-text1">
          <h2>【宋妍霏同款】女装小清新斜挎包</h2>
          <h3 class="price"><span>¥</span>199</h3>
          <div>
            <p>AY16TG2N2001</p>
            <p>面料：聚氨酯合成革 里料：织物 规格：120mm</p>
            <p>清新小巧，约会搭配小心机 巧，约会搭配小心机</p>
          </div>
        </div>
        <div class="dt-show-text1">
          <h3>此商品参与：</h3>
          <p>优惠券抵扣</p>
          <p>新客首单95折</p>
          <p>满199包邮</p>
        </div>
        <div class="dt-show-text1">
          <h3>此商品参与：</h3>
          <p>优惠券抵扣</p>
          <p>新客首单95折</p>
          <p>满199包邮</p>
        </div>
        <div class="dt-show-text1">
          <h3>颜色</h3>
          <img src="../image/01.jpg" alt="" />
        </div>
        <div class="dt-show-text1">
          <h3>选择尺码</h3>
          <a>查看尺码对照表</a>
          <p>S</p>
        </div>
        <div class="dt-show-text1">
          <h3>数量</h3>
          <div class="number">
            <a href="">-</a>
            <p>1</p>
            <a href="">+</a>
          </div>
          <a href="" class="btn" id="tobuy" onclick="tobuy">立即购买</a>
          <a href="" class="btn">加入购物袋</a>
          <a href="" class="btn">收藏</a>
          <h6>
            发货时间：2-7个工作日<br />物流通知：由于发货升级，如您的购买了两件以上产品有可能分包裹发货，请知悉，谢谢。
          </h6>
        </div>
        <div class="tishi">
          <div>
            <h5>洗涤说明&nbsp;&nbsp;<span>+</span></h5>
            <p>
              建议深浅颜色分开洗涤，洗涤温度不高于30度，常规程序，不可漂白，通风处自然晾干，不宜长时间浸泡以及暴晒，烫斗底板温度不高于110度。
            </p>
          </div>
          <div>
            <h5>价格说明&nbsp;&nbsp;<span>+</span></h5>
            <p>
              划线价格：可能是商品的吊牌价或正品零售价指导价或商品曾经展示过的销售价等，仅供您参考。<br />未划线价格：是商品在官网销售标价，具体的成交价可能是因会员使用优惠券、积分等发生变化，最终以订单结算页价格为准。<br /><br />温馨提示：因生产批次不同，款号会有所差异，衣服面料成分可能有所不同，请以实物为准。
            </p>
          </div>

          <h5>退货换货说明&nbsp;&nbsp;<span>+</span></h5>
          <p>
            凡在中国UR官网、APP及微商城购买商品，在发货日的14天内申请退换货。<a
              href="/about/ReturnsService/index"
              >退换货政策例外情况。</a
            >
          </p>
          <h5><a href="javascript:;">查看其他门店库存情况 </a></h5>
        </div>
      </div>
    </div> `;
      box.innerHTML = str;
    })();
  } else {
    alert("参数有误");
    location.href = "./list.html";
  }
} else {
}

function tobuy() {}
