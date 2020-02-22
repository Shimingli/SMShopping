// 这里是对购物车添加地址的功能的代码 优化
// 因为好多代码都是公用的哦 
// resolve 成果的回调  reject 拒绝的回调
// Promise 形式的getSetting
export const getSetting=()=>{

    return new Promise((resolve,reject)=>{
        wx.getSetting({
            success: (result)=>{
                resolve(result)
            },
            // 可以手动给他返回错误
            fail: (err)=>{
                reject(err)
            },
            complete: ()=>{}
        });
    }

    )
}
// 

export const chooseAddress=()=>{

    return new Promise((resolve,reject)=>{
        wx.chooseAddress({
            success: (result)=>{
                resolve(result)
            },
            // 可以手动给他返回错误
            fail: (err)=>{
                reject(err)
            },
            complete: ()=>{}
        });
    }

    )
}

export const openSetting=()=>{

    return new Promise((resolve,reject)=>{
        wx.openSetting({
            success: (result)=>{
                resolve(result)
            },
            // 可以手动给他返回错误
            fail: (err)=>{
                reject(err)
            },
            complete: ()=>{}
        });
    }

    )
}

