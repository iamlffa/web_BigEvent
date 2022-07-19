$(function(){
    // 当页面打开时就调用userinfo的函数
    getUserInfo()
})

// 获取用户基本信息
function getUserInfo(){
    $.ajax({
        methods: 'GET',
        url:'/my/userinfo',
    //    请求头信息
        // headers: {
        //     // 从本地存储里面拿到我之前存储的token
        //     Authorization:localStorage.getItem('token')
        // },
        success:function(res){
            // 判断：如果获取失败则弹出失败信息。没有失败则渲染用户信息
            if(res.status !== 0){
                return layui.layer.msg('获取用户信息失败！')
            }
            renderUser(res.data)
            console.log(res.data);
        }
    })
}

// 渲染用户信息
function renderUser(user){
    // 1.获取用户名称并渲染到页面上
    let name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 2.获取用户头像并渲染到页面上
    let userpic = user.user_pic
    $('.layui-nav-img').attr('src',userpic)
}
var layer = layui.layer;
// 点击按钮退出
$('.logout').on('click',function(){
    // 添加layui的confirm询问框
    layer.confirm('确定退出吗?', {icon: 3, title:'提示'}, function(index){
        //do something
        // 退出时清空存储在本地的token
        localStorage.removeItem('token')
        // 跳转到登录页面
        location.href = '/login.html'
        layer.close(index);
      });
})