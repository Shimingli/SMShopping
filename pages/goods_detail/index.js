// pages/goods_detail/index.js
import { request } from "../../request/index.js";
// es 7的网络请求 
import regeneratorRuntime from "../../lib/runtime/runtime";

// 在小程序中 如果富文本加载 webb格式的图片，ios的手机不能够加载，这点注意

// 轮播图预览大图 其实就是调用了小程序的api  previewImage 

//  点击加入购物车 这里使用本地缓存的数据 到本地
// 1、绑定事件 2、获取缓存的购物车的数据 数组格式
// 3、判断是否存在于购物车 4、已经存在购物车数量就++ 重新把购物车数组重新缓存
// 5、不存在购物车素组 直接添加一个新的元素 就是nums 1 重新缓存
// 6 、弹窗提醒

// 商品收藏功能
// 加载缓存中的商品数据，判断是否是收藏的，
// 如果是就改变图标，不是的话，就不能改变，同时要缓存到本地的缓存中 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 如果用不上的字符的话，就不要接受，这样子会导致性能降低
    goodsObj: {},
    // 商品是否被收藏国
    isCollect: false

  },
  // 商品对象 
  GoodsInfo: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    // onShow的话 就拿不到options的参数
    // 这样做 拿到当前的页面栈,获取上个页面传递过来的值
    let currentPages = getCurrentPages();
    let currentNewPages = currentPages[currentPages.length - 1];
    let options = currentNewPages.options;
    const { goods_id } = options;
    console.log(goods_id);
    // 这个是回调的代码哦 
    this.getGoodsDetail(goods_id)




  },
  //点击加入购物车  
  handleAddCart() {
    console.log("加入购物车");

    // 1、 获取缓存 
    // 第一次获取的是个空的 所以转成数组
    let cart = wx.getStorageSync("cart") || [];
    // 2、 判断商品对象是否存在购物车中
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
    if (index === -1) {
      // 不存在数据 
      this.GoodsInfo.num = 1;
      // 增加购物车是否选中的标记
      this.GoodsInfo.checked = true;
      // 添加进去 把数据
      cart.push(this.GoodsInfo);
    } else {
      // 已经存在数据 这个num的数量+1
      cart[index].num++;
    }
    // 把购物车重新添加到缓存中 
    wx.setStorageSync("cart", cart);

    wx.showToast({
      title: '加入成功',
      icon: 'success',
      image: '',
      duration: 1500,
      // 改为true ，不可点击，必须等到1.5s后才能点击按钮
      mask: false,
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });





  },

  // 预览大图 
  handlePreviewImage(e) {
    // 图片的数组  map 构造的新的数组
    const urlImages = this.GoodsInfo.pics.map(v => v.pics_mid);

    // 接受点击事件的图片的url
    const currentUrl = e.currentTarget.dataset.url;
    wx.previewImage({
      current: currentUrl,
      urls: urlImages,
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });

  },

  // 获取商品详情的数据
  async getGoodsDetail(goods_id) {
    const goodsObj = await request({ url: "/goods/detail", data: { goods_id } });
    this.GoodsInfo = goodsObj;

    // 收藏的功能 获取缓存中的商品收藏的数组 
    let collect = wx.getStorageSync("collect") || [];
    // 判断当前的商品是否被收藏了 
    let isCollect = collect = collect.some(v => v.goods_id === this.GoodsInfo.goods_id)

    console.log(goodsObj)
    this.setData({
      // 提高性能的开发，不需要的字段就不要接受回来了哦
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        // iphone部分手机 不识别webp的图片格式 
        // 临时本地自己改 但是确保后台存在 相同webp和jpg
        // 方法就是使用正则
        // goods_introduce:goodsObj.goods_introduce,

        goods_introduce: goodsObj.goods_introduce.replace(/.webp/g, '.jpg'),

        pics: goodsObj.pics,
      },
      // 在同步代码的后面 赋值
      isCollect
    })
  },
  // 点击商品收藏图标
  handleCollect() {
    let isCollect = false;
    //  获取缓存中的商品收藏数组 
    let collect = wx.getStorageSync("collect") || [];
    // 如果能找到的话，这个值不会为-1 
    let index = collect.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);

    if (index !== -1) {
      // 已经收藏过了 ,在数组中去把它删除了
      collect.splice(index, 1);
      isCollect = false;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        image: '',
        duration: 1500,
        mask: true,
        success: (result) => {

        },
        fail: () => { },
        complete: () => { }
      });
    } else {
      // 存入到集合中 
      collect.push(this.GoodsInfo);
      isCollect = true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        image: '',
        duration: 1500,
        mask: true,
        success: (result) => {

        },
        fail: () => { },
        complete: () => { }
      });
    }

    wx.setStorageSync("collect", collect);
    // 修改data中的属性 isCollect 
    this.setData({
      isCollect
    })


  }
})