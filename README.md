# SMShopping
小程序第三方的框架：
1、腾讯 wepy 类似vue  
2、美团 mpvue 类似vue
3、京东 taro 类似react 
4、滴滴  chameleon 变蛇龙
5、uni-app 类似vue

* 接口文档 ：https://www.showdoc.cc/128719739414963?page_id=2513235043485226

* 远程字体文本 ：http://at.alicdn.com/t/font_1199223_3th2jwrfikp.css  

* 阿里巴巴字体库 ：https://www.iconfont.cn/  使用github登陆


* 可能在某些久的小程序 可能出现问题哦 这个引入的时候估计要等待一下，关闭模拟器试下 真的啃爹哦
* 小程序支持es7的async语法。号称是解决回调的最终的解决方法
1、https://github.com/facebook/regenerator  

https://github.com/facebook/regenerator/blob/master/packages/regenerator-runtime/runtime.js


2、copy上面链接的代码 放到runtime.js 文件中

3、在每一个需要使用async语法的页面js文件中，都引入（不能全局引用）
`import regeneratorRuntime from "../../lib/runtime/runtime"; `



