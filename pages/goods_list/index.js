// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"众和",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取上个页面传递的参数 options 里面 
  
  },
  // 标题点击事件，只不过从子组件中传递雇来的
  handleTabsItemChange(e){

    console.log("标题点击事件，只不过从子组件中传递雇来的")
    //  获取被点击的标题索引 
    const {index}=e.detail;

    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);

    // 赋值到data

    this.setData({
      tabs
    })

  }
})