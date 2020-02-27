// 发送异步请求 可以优化 通过es6的promise来解决这个问题
// promise
// promise是一个对象，对象和函数的区别就是对象可以保存状态，函数不可以（闭包除外）
// 并未剥夺函数return的能力，因此无需层层传递callback，进行回调获取数据
// 代码风格，容易理解，便于维护
// 多个异步等待合并便于解决

// 同时发送异步代码的次数 
let ajaxTimes=0;
// 自己判断是否需要加上请求头 
export const request = (params) => {
    
    // 判断url中是否带有 /my/ 是否带上header 和token
    // 能够冲外面传递header的其他的信息，而不是写实了的 
    let header={...params.header};
    // 判断是否需要带上请求头，特殊的url
    if(params.url.includes("/my/")){
        // 拼接header 带上token
        header["Authorzation"]=wx.getStorageSync("token"); 
    }


    // 每次请求的时候加上1
    ajaxTimes++;
    // 显示加载中的图标 
    //  当页面中有好多的url没有先后顺序的请求的话，如何实现呢 
    wx.showLoading({
        title: " 加载中",
        // 模板，挡住了 不能进行其他的操作
        mask: true
    });


    //    定义公共的url   
    // const baseUrl = "https://api.zbztb.cn/api/public/v1";

    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";


    return new Promise((resolve, reject) => {
        var reqTask = wx.request({
            ...params,
            // 上面定义的header 
            header,
            url: baseUrl + params.url,
            success: (result) => {
                // result等于成功返回的值 注意这里可以统一配置 
                resolve(result.data.message);
            },
            fail: (err) => {
                reject(err);
            },
            complete: () => {

                ajaxTimes--;
               if(ajaxTimes==0){
                wx.hideLoading();
               }
      
                // // 多久关闭 
                // setTimeout(function () {
           
                // }, 5000)
            }
        });

    });
}