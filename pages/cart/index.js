// pages/cart/index.js
// 引用utils文件

import { getSetting, chooseAddress, openSetting } from "../../utils/asyncWx.js";
// 想要使用es7的报错语法的话，还必须引入包
import regeneratorRuntime from "../../lib/runtime/runtime";

// 先获取本地存储中的地址的数据 ，把数据显示出来
// 一般数据加载都在 onLoad 但是这个页面是经常会被打开
// 所以呀 在onShow中请求数据

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{

    },
  },

 onShow(){
    const address= wx.getStorageSync("address");
    this.setData({
      address
    })
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
       

      address.allAddress=address.provinceName+address.cityName+address.countyName+address.detailInfo;
      console.log(address);
      // 获取到了详细的地址的话 ，就把这个地址缓存到本地中

     wx.setStorageSync("address",address);
       
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