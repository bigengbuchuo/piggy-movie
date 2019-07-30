export default{
    path:'/mine',
    component:()=>import('@/views/mine'),  //按需加载模式，@表示src目录
    children:[
        {
            path:'person',
            component:()=>import('@/views/mine/person.vue')
        },
        {
            path:'login',
            component:()=>import('@/components/login')
        },
        {
            path:'register',
            component:()=>import('@/components/register')
        },
        {
            path:'findPassword',
            component:()=>import('@/components/findPassword')
        },
        {
            path:'/mine',
            redirect:'person'
        }
    ]
}

