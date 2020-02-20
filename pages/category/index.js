// pages/category/index.js
import { request } from "../../request/index.js";
// 不要后面的 .js结尾
import regeneratorRuntime from "../../lib/runtime/runtime";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧菜单数据
    leftMenuList: [],
    // 右侧的商品数据
    rightContent: [],
    // 被点击左侧的菜单
    currentIndex: 0,
    scrollTop: 0,
    mainH: 1000

  },

  // 接口返回的数据
  Cates: [],




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // wx.getSystemInfo({
    //   success: function(res) {
    //     this.setData({
    //       mainH: res.windowHeight
    //     })
    //   }
    // });


    // 先判断是否本地有数据没有 网络上返回的数据太庞大了 本地缓存 
    // 旧的数据有，还有不要过期 
    // 本地存储数据  {time:Date.now(),data:[]} 

    // 1.获取本地存储的数据（小程序有本地存储的数据的）
    const Cates = wx.getStorageSync("cates");
    console.log("第一次数据有没有-----" + Cates)
    // console.log(Cates)
    //2、判断
    if (!Cates) {
      // 不存在发送请求 获取数据
      console.log("没有有数据-----")
      this.getCates();
    } else {
      console.log(Cates)
      console.log("有数据-----")
      // 定义数据过期的时间 10s 
      console.log("现在的时间 " + Date.now())
      console.log("原来的时间  ")
      console.log(Cates.time)
      if (Date.now() - Cates.time > 1000 * 10) {
        this.getCates();
      } else {
        // 
        console.log("可以使用旧的数据-----")
        this.Cates = Cates.data;

        let leftMenuList = this.Cates.map(v => v.cat_name);
        //构造右侧的商品数据 
        let rightContent = this.Cates[0].children;

        this.setData({
          leftMenuList,
          rightContent,

        })




      }


    }



  },
  // handleItemTap 左侧点击的时间
  handleItemTap(e) {

    console.log(e)
    //  获取wxml传递过来的值 index
    const { index } = e.currentTarget.dataset;
    this.setData({
      currentIndex: index
    })
    // 右侧的视图
    let rightContent = this.Cates[index].children;

    this.setData({
      rightContent,

      // 从新设置 scrollTop的值，每次点击左边的话 右边的商品都会改变
      // 自动滚动到顶部
      scrollTop: 0,
    })



  },

  // 使用es7请求网络接口 加上 async 

  async getCates() {

    // 使用es7 async 和await 发送请求 
    const res = await request({ url: "/categories" });
    // 上面代码没有执行的话  下面代码也不会执行

    //  获取的数据最好存储到本地里面去哦 
    // this.Cates = res.data.message;
    // 配置到网络请求里面了
    this.Cates=res;


    // 把接口数据存入到本地存储中去  setStorageSync
    wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });



    let leftMenuList = this.Cates.map(v => v.cat_name);
    //构造右侧的商品数据 
    let rightContent = this.Cates[0].children;

    this.setData({
      leftMenuList,
      rightContent
    })




    //  原来的网络请求的方式 
    // request({
    //   url: "/categories"
    // }).then(res => {
    //   // console.log(res);
    //   // 获取的数据最好存储到本地里面去哦 
    //   this.Cates = res.data.message;

    //   // 把接口数据存入到本地存储中去  setStorageSync
    //   wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });



    //   let leftMenuList = this.Cates.map(v => v.cat_name);
    //   //构造右侧的商品数据 
    //   let rightContent = this.Cates[0].children;

    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // })


  },



















  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})