// pages/cart/index.js
// 引用utils文件

import { getSetting, chooseAddress, openSetting,showModal,shwoToast } from "../../utils/asyncWx.js";
// 想要使用es7的报错语法的话，还必须引入包
import regeneratorRuntime from "../../lib/runtime/runtime";

// 先获取本地存储中的地址的数据 ，把数据显示出来
// 一般数据加载都在 onLoad 但是这个页面是经常会被打开
// 所以呀 在onShow中请求数据
// 1、列表中的点击单个item的事件的改变 绑定change的事件


Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {

    },
    cart: {

    },
    // 是否被全部选中
    allChecked: false,
    totalPrice: 0,
    totalNum: 0,

  },

  onShow() {
    //获取内存中的地址
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync("cart") || [];


    this.setCart(cart);
    this.setData({
      address
    })
  },
  // 结算的按钮 
  async handleOrder(){
    // 判断收货地址 
    const {address,totalNum}=this.data;
    if(!address.userName){
       await shwoToast({title:"选择收货地址"});
       return;
    }

    // 判断是否有商品
    if(totalNum===0){
      await shwoToast({title:"没有商品"});
      return;
   }
  //  跳转到支付的页面
   wx.navigateTo({
     url: '/pages/pay/index',
     success: (result) => {
       
     },
     fail: () => {},
     complete: () => {}
   });
     
  },


  // 商品数量的编辑功能
  async handleItemNumEdit(e) {
    // oper 要和wxml中一样 
    const { oper, id } = e.currentTarget.dataset;
    console.log(oper);
    console.log(id);
    // 获取购物车的数组
    let { cart } = this.data;
    // 获取点选的位置的索引
    const index = cart.findIndex(v => v.goods_id === id);

    // 数量不能顾减为0，当num为1 ，用户点击了减少按钮 那么就要删除
    if (cart[index].num === 1 && oper === -1) {
    //  优化哦


      // wx.showModal({
      //   title: '你要删除',
      //   content: '你确定要删除哦？？',
      //   showCancel: true,
      //   cancelText: '取消',
      //   cancelColor: '#000000',
      //   confirmText: '确定',
      //   confirmColor: '#3CC51F',
      //   success: (result) => {
      //     if (result.confirm) {
      //       // 严删除的index 后面是数量 这里是删除数组中的元素
      //       cart.splice(index, 1);
      //       //  注意这个this不是外卖对选哪个
      //       this.setCart(cart);
      //     }
      //   },
      //   fail: () => { },
      //   complete: () => { }
      // });


      const res=await  showModal({content:"你是否要删除"});
        if (res.confirm) {
            // 严删除的index 后面是数量 这里是删除数组中的元素
            cart.splice(index, 1);
            //  注意这个this不是外卖对选哪个
            this.setCart(cart);
          }
    } else {
      //  进行数量的改变
      cart[index].num += oper;
      this.setCart(cart);
    }



  },

  // 全选和反选遍历购物车数组 每一个属性都全部选中 
  hendleAllChecked() {
    //  获取data中的数据 
    let { cart, allChecked } = this.data;
    allChecked = !allChecked;
    cart.forEach(v => v.checked = allChecked);
    // 修改后的值 重新填充 
    this.setCart(cart);

  },


  //  列表的item的选中或者其他的状态 
  // 记得从wxml传递过来值  goods_id
  handleItemChange(e) {
    // 获取传递过来的值的id 
    const goods_id = e.currentTarget.dataset.id;
    console.log(goods_id);
    // 获取购物车的数组
    let { cart } = this.data;
    // 获取找到的index的角标的值 
    let index = cart.findIndex(v => v.goods_id === goods_id);
    // 状态取反
    cart[index].checked = !cart[index].checked;
    // 调用方法
    this.setCart(cart);



  },
  // 方法的抽取，设置购物车的状态和底部工具栏的数据 
  setCart(cart) {

    // 如果cart数组中，所有的都被选中了，那么全选按钮就被选中了 
    // every数组遍历的方法，会接受回调函数，那么每一个回调函数true，返回true
    // 如果有一个返回false 代码就不会执行了，直接返回false
    // 假如是一个空的数组 调用 every方法，就是调用遍历返回值就是true
    // [].erery() 返回为true
    // 这样判断才是正常的  第一次循环 这个循环可以优化 
    // const allChecked=cart.lenght?cart.every(v=>v.checked):false;

    // 总价格和总数量 需要被选中的时候才会计算 
    let totalPrice = 0;
    let totalNum = 0;
    let allChecked = true;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    });
    // 但是还要判断一下，数据是否为空 因为为空的话 这个值v.checked为true 
    allChecked = cart.length != 0 ? allChecked : false;

    //  重新存入数据
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    });

    wx.setStorageSync("cart", cart);
  },

  /**
   * 考虑不再里面用的原因
   */
  onLoad: function (options) {

  },
  // 使用了es7的异步回调
  async handleAddAddress() {
    // 最终用异常去捕捉 

    try {
      //获取 权限的状态 
      const res = await getSetting();
      // 获取系统授予权限的情况
      const scopeAddress = res.authSetting['scope.address'];
      // 判断权限的状态
      // if(scopeAddress===true||scopeAddress===undefined){
      //     //  调用获取收货地址的 api
      //     const res1=await chooseAddress();
      //     console.log("第一次授权或者是有权限了")
      //     console.log(res1);
      // }else{
      //   // 诱导用户打开授权页面
      //   await openSetting();
      //   const res1=await chooseAddress();
      //   console.log("没有权限哦");
      //   console.log(res1)
      // }

      // 优化
      if (scopeAddress === false) {
        await openSetting();
      }
      //  es6 中新增了let和const变量申明的方式 ，加上var 一共三种

      //  1、默认全用 let，只在符合一些写代码的人的主观判断条件的时候用 const
      // 2、 默认全用 const，只有该变量需要被重新赋值才用 let （实际代码中用到 const 的几率大概会是 95%）
      // 我学习资料就是第二种的方式 

      const address = await chooseAddress();


      address.allAddress = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      console.log(address);
      // 获取到了详细的地址的话 ，就把这个地址缓存到本地中

      wx.setStorageSync("address", address);

    } catch (errro) {
      console.log("我捕捉到异常了");
      console.log(errro);
    }



  },

  oldhandleAddAddress() {
    console.log("加入地址");
    // 获取收货地址 小程序内部的收货地址
    // 第一次用户点击但是用户取消了没有给与权限
    // wx.chooseAddress({
    //   success: (result) => {
    //     console.log(result);
    //   },
    //   fail: () => {
    //     // 用户拒绝了权限了
    //     console.log("我弹窗不起来");

    //   },
    //   complete: () => {}
    // });

    // 正确的做法是获取权限  
    // 获取用户对小程序所给与的权限 权限的状态为scope 
    // 如果给与了权限的话 scope.address 的值为true
    // 还有在undefined的时候 也可以调用的哦 
    // 当 scope值为false的时候 ，诱导用户打开设置的权限 

    // 获取权限信息 
    // wx.getSetting({
    //   success: (result)=>{
    //     // authSetting 
    //     // authSetting[""scope.address""]
    //     // authSetting[""scope.address""]
    //     console.log("权限："+result);
    //     console.log(result);
    //   },
    //   fail: ()=>{},
    //   complete: ()=>{}
    // });

    // 正确的做法
    wx.getSetting({
      success: (result) => {
        // 权限的状态 当发现属性名称很怪异的时候 ，都要使用 [] 来获取值
        const scopeAddress = result.authSetting["scope.address"];
        console.log("获取的值为 " + scopeAddress);
        //  第一次获取的值为 undefined 如果授权来了的话 就位true
        if (scopeAddress === true || scopeAddress === undefined) {
          wx.chooseAddress({
            success: (result) => {
              console.log(result);
            },
            fail: () => { },
            complete: () => { }
          });

        } else {
          //  用户拒绝过过这个权限 打开权限授予的页面
          wx.openSetting({
            success: (result) => {
              // 当获取成功了 就在打开地址 
              // 我觉得这里 还有优化一下哦
              wx.chooseAddress({
                success: (result) => {
                  console.log(result);
                },
                fail: () => { },
                complete: () => { }
              });
            },
            fail: () => { },
            complete: () => { }
          });
        }

      },
      fail: () => { },
      complete: () => { }
    });


  }

})