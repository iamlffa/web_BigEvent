$(function(){
    // 点击去注册的a链接
    $('#link-reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击去登录的a链接
    $('#link-login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 配置表单输入框的验证规则
    // 从layui 中获取form对象
    let form = layui.form
    // 通过form.verify()函数自定义校验规则
    form.verify({
        // 自定义一个密码的校验规则
        pwd:[
        /^[\S]{6,12}$/
        ,'密码必须6到12位,且不能出现空格'],
        
        // 校验两次密码是否一致的规则：拿到第一次输入密码的值和value进行比较
        repwd: function(value){
            let pwd = $('.reg-box [name=password]').val()
            if(pwd !== value){
                return '两次密码不一致！'
            }
        }
    })
    // layui的消息提示
    let layer = layui.layer
    // 监听注册表单的提交行为，调用ajax发起注册请求
    $('#reg-form').on('submit',function(e){
        e.preventDefault();
        let data = {username: $('#reg-form [name=username]').val(),
                    password: $('#reg-form [name=password]').val()}
        $.post('/api/reguser',data, 
        function(res){
            if(res.status != 0){
                return layer.msg(res.message);
            }else {
                layer.msg(res.message);
                $('#link-login').click()
            }
        })
    })

    // 监听登录表单的提交行为，调用ajax发起登录请求，然后跳转到首页
    $('#login-form').on('submit',function(e){
        e.preventDefault();
        let data = {username: $('#login-form [name=username]').val(),
                    password: $('#login-form [name=password]').val()}
       $.post('/api/login',data,
       function(res){
        if(res.status != 0){
            return layer.msg(res.message);
        }else {
            layer.msg('登陆成功！');
            // 登陆成功，将token存储到本地存储中
            localStorage.setItem('token',res.token)
            // 登陆成功 跳转到后台主页
            location.href = '/index.html'
        }
       })
    })
})