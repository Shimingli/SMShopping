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

// promise形式的showModal 
// 传入content

export const showModal=({content})=>{

    return new Promise((resolve,reject)=>{
        wx.showModal({
            title: '提示',
            // content 外面传入
            content: content,
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
                resolve(result);
            //   if (result.confirm) {
            //     // // 严删除的index 后面是数量 这里是删除数组中的元素
            //     // cart.splice(index, 1);
            //     // //  注意这个this不是外卖对选哪个
            //     // this.setCart(cart);
            //   }
            },
            fail: (err) => {reject(err) },
            complete: () => { }
        });
    }

    )
}


export const shwoToast=({title})=>{

    return new Promise((resolve,reject)=>{
       wx.showToast({
           title: title,
           icon: 'none',
           image: '',
           duration: 1500,
           mask: false,
           success: (result) => {
            resolve(result)
           },
           fail: () => {
            reject(result)
           },
           complete: () => {}
       });
         
    }

    )
}

// 微信登陆 
export const login=()=>{

    return new Promise((resolve,reject)=>{
        wx.login({
            timeout:10000,
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{
                reject(err)
            },
            complete: ()=>{}
        });
       })
         

}