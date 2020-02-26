// pages/order/index.js
import { request } from "../../request/index.js"
// es7 
import regeneratorRuntime from "../../lib/runtime/runtime";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "全部",
        isActive: true
      },
      {
        id: 1,
        value: "代付款",
        isActive: false
      },
      {
        id: 2,
        value: "待发货",
        isActive: false
      },
      {
        id: 3,
        value: "退货退款",
        isActive: false
      }
    ],
    // 这个数据我永远拿不到哦 因为我的账号没有权限哦 
    orders: [],
    demoOrders: [
      {
        order_id: 0,
        order_number:"No4587291346448",
        order_price:"15482",
        create_time:"20200225(假)"
      },
      {
        order_id: 1,
        order_number:"Nodfdd46448",
        order_price:"1582",
        create_time:"20200225(假)"
      },
      {
        order_id: 2,
        order_number:"No6456456546565",
        order_price:"182",
        create_time:"20200225(假)"
      },
      {
        order_id: 3,
        order_number:"No4587291346448",
        order_price:"15482",
        create_time:"20200225(假)"
      },
      {
        order_id: 4,
        order_number:"No45872555656566448",
        order_price:"82",
        create_time:"20200225(假)"
      },
      {
        order_id: 5,
        order_number:"No4454278464646",
        order_price:"12",
        create_time:"20200225(假)"
      }

    ]

  },
  // 这个页面最重要的是需要token 没有token 需要token哦
  //  1、获取url的参数然后通过type去获取订单数据 
  // 2、点击不同的标题，重新发送请求并且渲染数据 

  onShow(e) {
    //  这个页面最重要的是需要token 没有token 需要token哦
    const token = wx.getStorageSync("token");
    // 为了效果 这行代码注释掉
    // if (!token) {
    //   wx.navigateTo({
    //     url: '/pages/auth/index',
    //     success: (result) => {

    //     },
    //     fail: () => { },
    //     complete: () => { }
    //   });
    //   return;
    // }




    console.log("我是onShow")
    console.log(e);
    // 如何获取上个页面传递过来的值 
    // 1、获取当前小程序的页面栈=数组，长度最大是10个页面
    // 小程序最多只能够有10个页面
    let curPages = getCurrentPages();

    console.log(curPages);

    let nowPage = curPages[curPages.length - 1];
    console.log("现在页面")
    console.log(nowPage)
    // 获取现在页面上的参数 
    const { type } = nowPage.options;
    // 改变上面的type
    this.changTitIndex(type - 1);
    console.log("type::" + type)
    this.getOrders(type);
  },


  async getOrders(type) {
    const res = await request({ url: "/my/orders/all", data: { type } });

    console.log(res);
  },


  // 上个页面传递的值，只能在onLoad中传递过来
  onLoad(e) {
    console.log(e);
  },

  changTitIndex(index) {
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);

    // 赋值到data

    this.setData({
      tabs
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

    // 当type=1的时候 index=0 同时这来要重新请求网络

    this.getOrders(index + 1);



  }
})