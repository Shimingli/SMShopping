// 导入网络请求 
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
        value: "体验问题",
        isActive: true
      },
      {
        id: 1,
        value: "商品、商家投诉",
        isActive: false
      },

    ],

    // 本选择的图片路径的数组 
    chooseImgs: [],
    textVal: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log()
  },

  //输入事件 文本域的输入
  handleText(e) {
    this.setData({
      textVal: e.detail.value,
    })
  },
  // 提交按钮的点击事件
  handleCommit() {
    const { textVal,chooseImgs } = this.data;

    if (!textVal.trim()) {
      wx.showToast({
        title: '输入不符合',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true,
        success: (result) => {

        },
        fail: () => { },
        complete: () => { }
      });
      return
    }
    // 上传图片到 专门的图片服务器 
    // 上传的文件的是个数组，但是这个api是不能够同时上传多个文件的
    // 这里需要遍历数组 挨着一个个的上传 
    chooseImgs.forEach((v,i)=>{

      var upTask = wx.uploadFile({
        // 图片的地址
        url: '',
        // 上传的文件的路径
        filePath: "v",
        // 上传的文件的名称，给后台获取文件的，和后台约定
        name: "file",
        // 上传文件的顺带的文本信息
        formData: {},
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
  
    })

    

  },

  //  删除图片 
  handleRemoveItem(e) {
    // wxml 传递过来index
    const { index } = e.currentTarget.dataset;
    console.log(index);

    let { chooseImgs } = this.data;
    //  第一个是角标，第二个是删除的数量
    chooseImgs.splice(index, 1);
    this.setData({
      chooseImgs
    })


  },

  // 选择图片的事件
  handleButton() {
    wx.chooseImage({
      //  图片数量
      count: 9,
      //  图片的原图和压缩
      sizeType: ['original', 'compressed'],
      //  图片的来源
      sourceType: ['album', 'camera'],
      success: (result) => {
        console.log(result)
        this.setData({
          // chooseImgs:result.tempFilePaths,
          //这里拼接数组 
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        })
      },
      fail: () => { },
      complete: () => { }
    });
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