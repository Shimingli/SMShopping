//Page Object
// 引入发送请求的
import { request } from "../../request/index";

Page({
  data: {

    //  轮播图数组
    swiperList: [],
    // 导航
    catesList: [],

    floorList: [],

  },
  //网络请求
  onLoad: function (options) {
    // 记得加上 this 才能搞
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();



    // VM2154:1 navigateTo:fail url "pages/goods_list?query=%E6%9C%8D%E9%A5%B0" is not in app.json















  },

  handleURl(e) {

    console.log(e)
    const { url } = e.currentTarget.dataset;
    console.log(url)
    try {
      const arr= url.split("?");
      const newUrl=arr[0]+"/index?"+arr[1];
      wx.navigateTo({
        url: newUrl,
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    } catch (error) {
      wx.showToast({
        title: '我在闹矛盾哦',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    }





  },
  getFloorList() {

    request({
      url: "/home/floordata"
    }).then(result => {
      console.log(result)
      this.setData({
        floorList: result
      })
    })
  },

  getCateList() {
    request({
      url: "/home/catitems"
    }).then(result => {
      console.log(result)
      this.setData({
        catesList: result
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
      url: '/home/swiperdata',

    }).then(result => {
      console.log(result)
      this.setData({
        swiperList: result
      })
    })
  },

});
