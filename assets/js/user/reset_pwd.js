$(function(){
    // 自定义密码校验规则  所有密码必须在6-12位之间并且不能存在空格
    var form = layui.form
    form.verify({
        pass: [
            /^[\S]{6,12}$/,
            '密码必须6到12位,且不能出现空格'
          ],
        // 新密码不能和旧密码一样
        newPwd: function(value){
            if(value === $('[name=oldPwd]').val()){
                return '新密码不能和旧密码一致!'
            }
        },
        // 确认密码需和新密码一致
        confirmPwd: function(value){
            if(value !== $('[name=newPwd]').val()){
                return '请再次确认密码是否一致！'
            }
        }
    })
})

// 发送重置密码的请求  监听表单的提交事件
$('.layui-form').on('submit',function(e){
    e.preventDefault();
    $.ajax({
        method: 'POST',
        url: '/my/updatepwd',
        data: $(this).serialize(),
        success: function(res){
            if(res.status !== 0 ){
                return layer.msg('更新密码失败！')
            }else{
                layer.msg('更新密码成功！')
                // // 重置表单
                $('.layui-input').val('')
            }
            
            // // 重定向到登陆页面
            // location.href = '/login.html'
        }
    })
})
