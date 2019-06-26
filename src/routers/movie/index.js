export default{
    path:'/movie',
    component:()=>import('@/views/movie'),  //按需加载模式，@表示src目录
    children:[
        {
            path:'city',  //    不加/：相对路径，movie会和city拼接在一起 
            component:()=>import('@/components/city')    
        },
        {
            path:'hot',
            component:()=>import('@/components/hot')
        },
        {
            path:'coming',
            component:()=>import('@/components/coming')
        },
        {
            path:'search',
            component:()=>import('@/components/search')
        },
        {
            path:'/movie',
            redirect:'/movie/hot'
        }
    ]
}