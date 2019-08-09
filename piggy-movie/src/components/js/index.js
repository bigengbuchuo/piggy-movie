import Vue from 'vue';
import messageBox from './messageBox';

export var msgBox=(function(){  //闭包
    return function( opts ){//配置参数
        var defaults={ //默认值
            title:'',
            content:'',
            cancel:'',
            ok:'',
            handleCancel:null,
            handleOk:null
        };
        var MyComponent = Vue.extend(messageBox);//extend方法：把messageBox提取出来，并且返回一个类，这个类跟组件结合在一起
        for(var attr in opts ){
            defaults[attr]=opts[attr];
        }

        var vm = new MyComponent({
            el:document.createElement('div'),  //创建一个template的容器
            data:{
                title:defaults.title,
                content:defaults.content,
                cancel:defaults.cancel,
                ok:defaults.ok
            },
            methods:{
                handleCancel(){
                    // console.log(123);
                    defaults.handleCancel && defaults.handleCancel.call(this)  //在方法存在的情况下，让该方法的this指向vm并且调用
                    document.body.removeChild( vm.$el);
                },
                handleOk(){
                    defaults.handleOk && defaults.handleOk.call(this)
                    document.body.removeChild( vm.$el);
                }
            }
        }) 

        document.body.appendChild( vm.$el);
    };
})();