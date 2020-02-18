//Page Object
Page({
  data: {
    
  //  轮播图数组
  swiperList:[],

  },
  //网络请求
  onLoad: function(options) {
    var reqTask = wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
      data: {},
      header: {'content-type':'application/json'},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result)=>{
         console.log(result)
         this.setData({
          swiperList:result.data.message
         })


      },
      fail: ()=>{},
      //成功和失败都能走
      complete: ()=>{}
    }); 


  },
  onReady: function() {
    
  },
  onShow: function() {
    
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  },
  onPageScroll: function() {

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item) {

  }
});
  