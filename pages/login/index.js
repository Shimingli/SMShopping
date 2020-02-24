// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 获取个人信息 
  handleGetuserinfo(e){
    console.log(e);

    const {userInfo}=e.detail;

    wx.setStorageSync("userInfo", userInfo);

    // 滚回到上个页面
    wx.navigateBack({
      delta: 1
    });
      
  }

})