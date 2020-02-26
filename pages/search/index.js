// pages/search/index.js
import { request } from "../../request/index.js";
// es 7的网络请求 
import regeneratorRuntime from "../../lib/runtime/runtime";

/**
 * input的值的改变的事件  
 * 获取输入框的值 
 * 合法性判断 检验通过
 */
Page({

  data: {
    goods: [],
   
    // 按钮显示
    isFocus: false,
    inputValue:""

  },

  TimeID: -1,
  // 输入框的值改变了 
  // 每个输入框的变化了 都会重新输入哦 
  // 防止抖动 输入稳定以后 才能访问网络 
  // 关键就是 TimeID 这个变量
  // 防抖：用在输入框上面
  // 节流：用在页面的下拉或者下拉
  handleInput(e) {
    console.log(e)
    const { value } = e.detail;
    //  去掉前后空格
    if (!value.trim()) {
      this.setData({
        isFocus: false,
        goods: []
      })
      //值不合法 
      return;
    }

    this.setData({
      isFocus: true
    })
    //  this.TimeID该值标识要取消的延迟执行代码块
    clearTimeout(this.TimeID);
    this.TimeID = setTimeout(() => {
      //  这里网络请求 
      this.qswarch(value);
    }, 1000)
    console.log("定时器：" + this.TimeID)


  },
  async qswarch(query) {
    const res = await request({ url: "/goods/qsearch", data: { query } });
    console.log(res);

    this.setData({
      goods: res
    })
  },
  cancle(){
    this.setData({
      inputValue:"",
      isFocus:false,
      goods:[]
    })
  }

})