
import { getSetting, chooseAddress, openSetting,showModal,shwoToast } from "../../utils/asyncWx.js";
// 想要使用es7的报错语法的话，还必须引入包
import regeneratorRuntime from "../../lib/runtime/runtime";

// 微信支付的问题 
// 那些账号可以实现微信支付 ？
// 1.企业账号 2、企业账号的小程序后台中 还要给开发者添加上白名单
// 一个appid 可以绑定多个开发者 
// 支付按钮  
// 先获取到token 没有就去授权获取token 
// 加入有token


Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {

    },
    cart: {

    },
 
    totalPrice: 0,
    totalNum: 0,

  },

  onShow() {
    //获取内存中的地址
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync("cart") || [];

    // 过滤后的购物车数组 
    // 就是选着的结合 
    // 这个可以优化哈
    let checkedCart=cart.filter(v=>v.checked);

  
    this.setData({
      address
    })

    this.setCart(checkedCart);
  },
  // 支付按钮 
  async handleOrder(){
    // 判断缓存中是否有token
    const token=wx.getStorageSync("token");
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
        success: (result) => {
          
        },
        fail: () => {},
        complete: () => {}
      });
    }else{
      return;
    }
  },

  // 方法的抽取，设置购物车的状态和底部工具栏的数据 
  setCart(cart) {

    let totalPrice = 0;
    let totalNum = 0;
    
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    });
  
    //  重新存入数据
    this.setData({
      cart,
      totalPrice,
      totalNum
    });

    wx.setStorageSync("cart", cart);
  },
  

})