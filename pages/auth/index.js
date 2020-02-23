// pages/auth/index.js
import { request } from "../../request/index.js"
// es7 
import regeneratorRuntime from "../../lib/runtime/runtime";

import {login} from "../../utils/asyncWx.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 获取用户的信息
  async handleGetuserinfo(e){
    // console.log(e)
    // 获取用户信息 支付用的
    const {encryptedData,rawData,iv,signature}=e.detail;  
    console.log("encryptedData---------"+encryptedData) ;
    console.log("rawData-------------"+rawData) ;
    console.log("iv----------"+iv) ;
    console.log("signature-----------"+signature) ;
    // 获取小程序登陆成功后的code
    const {code}=await login();
    console.log("code==="+code)
    const loginParams={encryptedData,rawData,iv,signature,code};
  //  发送请求 获取用户的token 
   
    const res=await request({url:"/users/wxlogin",data:loginParams,method:"post"})
    //由于自己不是企业的账号的haunted 
    // 这里就不能访问成功，所以这里需要企业账号 
    // 这里返回为null 
    console.log(res)

    // 假如获取到token了 
    wx.setStorageSync("token", res.token);
    // 返回打开的页面，delta 就是返回上一层  
    // 然后 delta 3 返回上面3成
    wx.navigateBack({
      delta: 1
    });
  }
 

})