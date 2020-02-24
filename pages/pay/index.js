
import { requestPayment,getSetting, chooseAddress, openSetting,showModal,shwoToast } from "../../utils/asyncWx.js";
// 想要使用es7的报错语法的话，还必须引入包
import regeneratorRuntime from "../../lib/runtime/runtime";
import {request} from "../../request/index.js";
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
      console.log("永远获取不到token")
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
    // 有token的时候 就创建订单，创建订单的准备的参数 
// 赋值订单项里面的值 

    const header={Authoriztion:token};
    const order_price=this.data.totalPrice;
    const consignee_addr=this.data.address.all;
    const cart=this.data.cart;
    
    let goods=[];
    cart.forEach(v=>goods.push({
      goods_id:v.goods_id,
      goods_num:v.num,
      goods_price:v.goods_price
    }))
    const orderParams={order_price,consignee_addr,goods};
    //获取订单编号
    const {order_number} =await request({url:"/my/orders/create",method:"POST",data:orderParams,header:header});
    // 获取调用微信支付的参数
    const res=await request({url:"....",method:"POST",header,data:{order_number}});
    await shwoToast({title:"支付成功"});
    // 过滤掉购物车的数据 
    let newCart=wx.getStorageSync("cart");
    newCart=newCart.filter(v=>!v.checked);
    wx.setStorageSync("cart",data);

    // 跳转到订单列表页面
    wx.navigateTo({
      url: '/pages/order/index',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      

    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: '',
      paySign: '',
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
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