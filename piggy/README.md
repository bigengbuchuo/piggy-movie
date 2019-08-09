小猪电影项目总结
---
### 项目预览
<div display:inline-block>
	<img src="https://github.com/bigengbuchuo/piggy-movie/blob/master/piggy/public/zipPic/00%20(1).png" width="280">正在热映+城市定位
	<img src="https://github.com/bigengbuchuo/piggy-movie/blob/master/piggy/public/zipPic/01%20(1).png" width="280">loading
	<img src="https://github.com/bigengbuchuo/piggy-movie/blob/master/piggy/public/zipPic/02%20(1).png" width="280">即将上映
</div>
<div display:inline>
    <img src="https://github.com/bigengbuchuo/piggy-movie/blob/master/piggy/public/zipPic/09%20(1).png" width="280">影片详情
    <img src="https://github.com/bigengbuchuo/piggy-movie/blob/master/piggy/public/zipPic/03%20(1).png" width="280">影院信息
    <img src="https://github.com/bigengbuchuo/piggy-movie/blob/master/piggy/public/zipPic/04%20(1).png" width="280">登录
</div>
<div display:inline>
    <img src="https://github.com/bigengbuchuo/piggy-movie/blob/master/piggy/public/zipPic/05%20(1).png" width="280">注册
    <img src="https://github.com/bigengbuchuo/piggy-movie/blob/master/piggy/public/zipPic/06%20(1).png" width="280">修改密码
    <img src="https://github.com/bigengbuchuo/piggy-movie/blob/master/piggy/public/zipPic/07%20(1).png" width="280">个人中心
</div>
<div align=center>
<img src="https://github.com/bigengbuchuo/piggy-movie/blob/master/piggy/public/zipPic/08%20(1).png" width="400">管理员页面
</div>

### 项目简介
一款基于Vue-cli实现的移动端电影信息查询系统

### 所用技术
- html、css、js、es6
- vue、vue-router、vuex、vue-cli3
- 采用express搭的Node后台
- mangodb数据库
- axios

用到的模块和插件：
- loading ：避免网速太差白屏的尴尬
- nginx ：用于反向代理
- better-scroll ：
使滑动更加流畅的插件、实现tap（只有点击会触发而滑动不会触发）、 下拉刷新
- mongoose模块 ：可以快速操作momdoodb数据库，进行增删改查的操作
- nodemail模块 ：注册时邮箱发送验证码
- trek-captcha模块 :防止批量登录登录时设置图形验证码
- crypto模块 ：密码加密
- multer模块 ：使用express的中间件multer上传头像
- url模块 :处理上传头像的文件名
- element-ui组件库 ：用于管理端组件和css库

### 功能简介
- 电影
    - 城市列表 [接口](http://39.97.33.178/api/cityList)
        - 城市定位 [接口](http://39.97.33.178/api/getLocation)
        - 点击不同城市展示不同的影片（正在热映、即将上映）、影院信息
    - 正在热映
        - 所有影片信息，每个影片的详情信息  [接口](http://39.97.33.178/api/movieOnInfoList?cityId=10)
    - 即将上映
        - 影片详情信息 [接口](http://39.97.33.178/api/movieComingList?cityId=10)
    - 搜索影片[接口](http://39.97.33.178/api/searchList?cityId=10&kw=a)
- 影院
    - 根据城市展示相应的影院信息 [接口](http://39.97.33.178/api/cinemaList?cityId=10)
- 我的
    - 注册登录
    - 退出登录
    - 修改头像
    - 修改密码
    - 判断登陆态
    - 后台判断身份，给管理员提供管理端入口
        - 冻结账号
        - 删除账号

### 组件划分
src/components
- betterScroll 
- button
- cinemalist
- city
- coming
- findPassword
- header
- hot
- js
- loading
- login
- search

src/views
- admin
- cinema
- mine
- movie



### 项目中遇到的问题和需要注意的细节
#### 前端部分
1.key值
key:key值是vue的dom算法标记，如果没有key会警告，key值表示每个是唯一的，用它做优化，作为一个判断依据，如果数组很长（几万），渲染列表的时候，带key值比不带要快。
```js
<div class="city-index">
        <ul>
            <li v-for="(item,index) in cityListed" :key="item.index" v-on:touchstart="hunt(index)">{{item.index}}</li>
        </ul>
</div>
```

2.生命周期选择
- 搜索部分
不能用mounted生命周期来处理数据的获取，因为不是一开始就搜索到的，而是输入框输入之后才获取到数据，是异步的。
```js
<input type="text" v-model="message">
```
同时，axios不支持异步获取数据，就用watch监听message字段。
- 电影部分
电影信息需要尽可能地实时更新，所以用activated生命周期。
mounted生命周期在有缓存时不触发，只有第一次请求的时候会触发一次。
activated生命周期每次切换组件都会调用钩子函数。

搜索部分补充：
关于搜索框进行输入，从network的xhr里面可以看到每输入一个字母都会请求一次，我们需要的是输入结束之后再进行一次请求。
限制多次请求：axios.CancelToken终止多次请求。


3.事件选择
1).三种点击事件
- touchstart 
	- 点击和滑动都会触发 
- tap 
    - 只有点击会触发（需要我们自己去模拟）
- click 
    - 作用同tap，但是在手机WEB端，click会有 200~300 ms延迟。所以使用tap反应更快，体验更好。

2).几种插件
- 可以实现tap功能的插件： 
	- zepto 
	- vue-touch 
	- better-scroll
- 使滑动更加流畅的插件 ：
	- isscroll 
	- swiper  
	- better-scroll 

所以我们使用better-scroll。



4.前置守卫（路由守卫/导航守卫）：[前置守卫](https://blog.csdn.net/Reagan_/article/details/98877273)



5.详情页滑动动画
vue有自带的transition
```js
<transition>
    <router-view></router-view>
</transition>
```
但是这样会跟有的手机‘向右滑动关闭页面’这个系统功能冲突，所以我们用css3写一个动画，保证不触发手机的滑屏关闭的同时滑动到详情页。
```js
//详情页
.slide-detail{
    animation: .3s slideMove;
}
@keyframes slideMove{
    0%{ transform: translateX(100%);}
    100%{ transform: translateX(0);}
}
```



6.在components/js里封装了一个msgBox组件，用作每次操作成功返回给用户以提示。
因为需要控制提示框的出现和消失，所以必须在js文件里才可以插入和删除，所以需要把组件(.vue)和(.js)结合在一起。
```js
import messageBox from './messageBox';
Vue.extend(messageBox);
//extend方法：把messageBox组件提取出来，并且返回一个类，这个类跟组件结合在一起
var vm = new MyComponent({……})
document.body.appendChild( vm.$el); 
```



7.添加loading的显示时机
我将loading封装成一个组件，在全局注册
在data里创建一个needLoading字段，初始值为true
当请求数据成功、本地存储存有值的时候，设为false
每次请求判断needLoading的值。
```js
<div class="city-list">
    <loading v-if="needLoading" />
    <betterScroll v-else>
</div>
```



#### 后台部分

- 防止批量登录登录时设置图形验证码
trek-captcha模块
```js
cnpm i -S trek-captcha
```
untils/base.js
```js
//引入
const captcha = require('trek-captcha');

//定义
var createVerify=(req,res)=>{
    return captcha().then((info)=>{
        req.session.verifyImg=info.token  //验证码具体的值
        return info.buffer  //二进制值，与token对应
    }).catch(()=>{
        return false;
    });
}

//暴露
module.exports = {
    setCrypto,
    createVerify
};
```
controlers/user.js
写接口
```js
//引入
var {setCrypto,verifyImg} = require('../untils/base.js');

//使用
var verifyImg = async(req,res,next)=>{
    try{
        var result=await createVerify(req,res);
        if(result){
            res.send(result);
        }
    }catch(err){
        console.log(err);
    }
}

//暴露接口
```
routers/users.js
```js
router.get('/verifyImg',usersController.verifyImg);
```
在前端使用：
```js
<div>
    <input type="text" placeholder="请输入您的验证码" v-model="verifyImg"><img class="loginVerify" src="/api2/users/verifyImg">
</div>
```
src直接跨域请求verifyImg接口，直接渲染到img
在验证码图上绑定changeVerify
```js
changeVerify(ev){
    ev.target.src='/spi2/users/verifyImg?'+Math.random();
}
//ev表示事件触发时鼠标所在的元素
//event.target：返回事件触发时鼠标所在的对象
```
注意因为前端有缓存，所以src一定要有变化，才会重新发起请求。
这里变化的写法是用？分隔开，后面表示参数。


判断验证码是否正确：**加粗样式**
请求时存到session
base.js存
```js
var createVerify=(req,res)=>{
    return captcha().then((info)=>{
        req.session.verifyImg=info.token  //验证码具体的值
        return info.buffer  //二进制值，与token对应的验证码图片
    }).catch(()=>{
        return false;
    });
}
```
登录时比较
```js
if(verifyImg !== req.session.verifyImg){ //base里面存的
    res.send({
        msg:'验证码输入不正确',
        status:-3
    });
    return;
}
```


- [发送验证码](https://blog.csdn.net/Reagan_/article/details/98883503)

- [压缩头像](https://blog.csdn.net/Reagan_/article/details/98759816)
