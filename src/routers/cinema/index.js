export default{
    path:'/cinema',
    component:()=>import('@/views/cinema'),
    children:[
        {
            path:'cinemalist',  //    不加/：相对路径，cinema会和city拼接在一起 
            component:()=>import('@/components/cinemalist')    
        },
        {
            path:'brand',
            component:()=>import('@/components/brand')
        },
        {
            path:'feature',
            component:()=>import('@/components/feature')
        },
        {
            path:'/cinema',
            redirect:'/cinema/cinemalist'
        }
    ]
}