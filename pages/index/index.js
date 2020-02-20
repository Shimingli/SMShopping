//Page Object
// 引入发送请求的
import { request } from "../../request/index";

Page({
  data: {

    //  轮播图数组
    swiperList: [],
    // 导航
    catesList: [],

    floorList:[],

  },
  //网络请求
  onLoad: function (options) {
    // 记得加上 this 才能搞
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();

  },
  getFloorList(){

    request({
      url: "https://api.zbztb.cn/api/public/v1/home/floordata"
    }).then(result => {
      console.log(result)
      this.setData({
        floorList: result.data.message
      })
    })
  },

  getCateList() {
    request({
      url: "https://api.zbztb.cn/api/public/v1/home/catitems"
    }).then(result => {
      console.log(result)
      this.setData({
        catesList: result.data.message
      })
    })
  },

  // 获取轮播图
  getSwiperList() {
    // 发送异步请求 可以优化 通过es6的promise来解决这个问题
    // var reqTask = wx.request({
    //   url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
    //   data: {},
    //   header: {'content-type':'application/json'},
    //   method: 'GET',
    //   dataType: 'json',
    //   responseType: 'text',
    //   success: (result)=>{
    //      console.log(result)
    //      this.setData({
    //       swiperList:result.data.message
    //      })


    //   },
    //   fail: ()=>{},
    //   //成功和失败都能走
    //   complete: ()=>{}
    // }); 

    request({
      url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',

    }).then(result => {
      console.log(result)
      this.setData({
        swiperList: result.data.message
      })
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});
