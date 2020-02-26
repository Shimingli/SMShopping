// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 这个数据是缓存当中的
    collect:[],
    tabs: [
      {
        id: 0,
        value: "商品收藏",
        isActive: true
      },
      {
        id: 1,
        value: "平拍收藏",
        isActive: false
      },
      {
        id: 2,
        value: "店铺收藏",
        isActive: false
      },
      {
        id: 3,
        value: "浏览器足迹",
        isActive: false
      }
    ],
  },
  onShow(){
    const collect= wx.getStorageSync("collect");
    this.setData({
      collect
    })
 
  },
  // 标题点击事件，只不过从子组件中传递雇来的
  handleTabsItemChange(e) {

    console.log("标题点击事件，只不过从子组件中传递雇来的")
    //  获取被点击的标题索引 
    const { index } = e.detail;

    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);

    // 赋值到data

    this.setData({
      tabs
    })

  }
})