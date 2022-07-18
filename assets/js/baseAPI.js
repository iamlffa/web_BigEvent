$(function(){
     // $.ajaxPrefilter预过滤请求用于拼接请求url
     $.ajaxPrefilter(function(options){
        options.url = 'http://www.liulongbin.top:3007' + options.url
        // 统一为需要token的接口设置请求头
        if(options.url.indexOf('/my/') !== -1){
            options.headers = {
                Authorization:localStorage.getItem('token')
            }
        }

        // 全局设置 complete 回调函数，不管请求成功还是失败都会执行此回调函数
        // compltet 回调函数返回的数据在 res.responseJSON中显示
        options.complete = function(res){
            // 权限控制让没有登陆的用户不能直接访问后台主页
            if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！' ){
                // 强制清除token  强制返回登陆页面
                localStorage.removeItem('token')
                location.href = '/login.html'
            }
        }
    })
})