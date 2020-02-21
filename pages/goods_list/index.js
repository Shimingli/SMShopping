// pages/goods_list/index.js
// 导入网络请求 
import { request } from "../../request/index.js"
// es7 
import regeneratorRuntime from "../../lib/runtime/runtime";

// 本页面需要 上啦刷新和到底就开始加载更多  
// 1 滚动到底的下一页数据 
// 2 判断是否有数据 没有弹窗，有的话 加载更多 

// 下拉刷新 json文件配置  
// "enablePullDownRefresh":true    "backgroundTextStyle":"dark"
// 触发下拉刷新的事件 




Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "众和",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodsList: []

  },
  // 接口的参数  入股pageSize的数据足够下，没有盛满屏幕的时候 应该怎么办呢？
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  // 总页数 全局变量 
  totalPages: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取上个页面传递的参数 options 里面 

    this.QueryParams.cid = options.cid;
    this.getGoodsList();

    // 把这个抽取的到网络框架中去  抽取才是最好的 
    // 显示加载中的图标 
    // wx.showLoading({
    //   title: " 加载中",
    // });
    // // 多久关闭 
    // setTimeout(function () {
    //   wx.hideLoading();
    // }, 5000)




  },
  // 数据请求回来 手动的关闭下拉刷新的动作
  onPullDownRefresh() {
    console.log("下拉刷新的")
    //  重置数据源 
    this.setData({
      goodsList: []
    })
    this.QueryParams.pagenum = 1;
    this.getGoodsList();


  },


  // 滚动条触底实践 
  onReachBottom() {
    console.log("到底了");
    // 判断是否有下一页
    if (this.QueryParams.pagenum >= this.totalPages) {
      // 没有下一页数据 
      console.log("没有下一页数据 ")
      wx.showToast({
        title: '没有下一页数据'

      });

    } else {
      console.log("有下一页数据 ")
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },


  // 获取商品列表数据 
  async  getGoodsList() {
    const res = await request({ url: "/goods/search", data: this.QueryParams });
    console.log(res);
    // 获取总条数 
    const total = res.total;
    //向上取正数 2.3 取整数就是3
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize);
    console.log("吃条目 加载最多的页数" + this.totalPages)
    this.setData({
      // goodsList: res.goods
      // 请求回来的数组记得重新拼接 ... 
      goodsList: [...this.data.goodsList, ...res.goods]
    })

    // 手动的关闭下拉刷新的动作 
    //  和安卓一样 下拉刷新的功能没有进行 也可以关闭的 
    wx.stopPullDownRefresh();

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