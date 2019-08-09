module.exports = {
    // publicPath:'./piggy',   //把本地的静态资源改成piggy下的
    devServer:{
           proxy:{  //反向代理字段
            '/api2':{    //注意：本地代理最好写在上面
                target:'http://localhost:3000', 
                changeOrigin:true,  //允许跨域，如果这不写，调用接口接口时会有跨域错误说缺少请求头）
                secure:false
            },
            '/api':{
                target:'http://39.97.33.178',  //反向代理的目标数
                changeOrigin:true
            }
        }
    }
}