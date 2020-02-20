// 发送异步请求 可以优化 通过es6的promise来解决这个问题
// promise
// promise是一个对象，对象和函数的区别就是对象可以保存状态，函数不可以（闭包除外）
// 并未剥夺函数return的能力，因此无需层层传递callback，进行回调获取数据
// 代码风格，容易理解，便于维护
// 多个异步等待合并便于解决

export const request=(params)=>{
    return new Promise((resolve,reject)=>{
        var reqTask = wx.request({
            ...params,
            success:(result)=>{
                resolve(result);
            },
            fail:(err)=>{
                reject(err);
            }
        });
          
    });
}