//获取操作对象
var shoplist = document.querySelector(".shoplist");
var pagination = document.querySelector(".pagination");

//通过自执行函数来获取数据
(async function () {
  var arr = await promiseAjax({
    url: "../listdate.json",
  });
  //把字符串转为对象
  arr = JSON.parse(arr);

  for (let i = 0; i < arr.length; i++) {
    arr[i].id = i + 1;
  }
  sessionStorage.setItem("allList", JSON.stringify(arr));
  //配置传入的对象信息
  var o1 = {
    pageInfo: {
      pagenum: 1,
      pagesize: 8,
      totalsize: arr.length,
      totalpage: Math.ceil(arr.length / 8),
    },
    textInfo: {
      first: "首页",
      prev: "上一页",
      next: "下一页",
      last: "尾页",
    },
  };
  //实例化分页器对象
  new Pagination(pagination, o1, (m) => {
    //通过页码，来进行分页数据显示
    var arr2 = arr.slice((m - 1) * 8, m * 8);

    //创建字符串，拼接所有内容
    var str = "";
    //遍历数组中所有数据
    arr2.forEach((item) => {
      str += ` <div class="shopList-item">
          <a>
            <div onclick=goDetails(${item.id})>
            <img src="${item.图片}" /></div>
            <p class="collection bdrd">收藏</p>
            <span class="ShoppingBag bdrd" onclick=shoppingBag(${item.id})>加购</span>
            <p class="OpenToBooking">${item.dresscolimg}</p>
          </a>
          <div class="listtext">
            <p>${item.标题}</p>
            <p>${item.dresstext}</span><span class="yuanjia"></span></p>
          </div>
        </div> 
          `;
    });
    //把拼接好的内容渲染到页面中
    shoplist.innerHTML = str;
  });
})();
function shoppingBag(id) {
  let allList = JSON.parse(sessionStorage.getItem("allList"));
  if (allList) {
    let newArr = allList.filter(function (item) {
      return item.id === id;
    });
    console.log(newArr, newArr[0]);
    let goWuChe = JSON.parse(sessionStorage.getItem("goWuChe"));
    if (goWuChe && goWuChe.length >= 1) {
      if (Array.isArray(goWuChe)) {
        for (let i = 0; i < goWuChe.length; i++) {
          if (goWuChe[i].id === id) {
            goWuChe[i].count += 1;
            sessionStorage.setItem("goWuChe", JSON.stringify(goWuChe));
          } else {
            newArr[0].count = 1;
            sessionStorage.setItem(
              "goWuChe",
              JSON.stringify(goWuChe.concat(newArr))
            );
          }
        }
      }
    } else {
      newArr[0].count = 1;
      sessionStorage.setItem("goWuChe", JSON.stringify(newArr));
    }
  }
  alert("添加成功");
}

function goDetails(id) {
  window.location.href = `../pages/details.html?id=${id}`;
}

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
