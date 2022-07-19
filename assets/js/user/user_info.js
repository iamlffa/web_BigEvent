$(function(){
    // 表单的验证规则
    form.verify({
        nickname: function(value){
            if(value.length > 6 ){
                return '不能超过6个字符'
            }
        }
    })
})
var form = layui.form
initUserInfo()
// 初始化用户信息
function initUserInfo(){
    var timer = setTimeout(function(){
    $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res){
                if(res.status != 0){
                    return layer.msg('获取用户信息失败！')
                }
                // 快速为表单赋值 form.val('filter(class="layui-form" 所在元素属性 lay-filter="" 对应的值)', object);
                form.val('formUserInfo',res.data)
            }
        })
    },100) 
}

// 重置表单时不重置登陆名称
$('#reset').on('click',function(e){
    e.preventDefault()
    initUserInfo()
})
// 点击提交修改按钮更新用户的信息
$('.layui-form').on('submit',function(e){
    e.preventDefault();
    $.ajax({
        method: 'POST',
        url: '/my/userinfo',
        data: $(this).serialize(),
        success: function(res){
            if(res.status !== 0){
                return layer.msg('更新用户信息失败！')
            }
            layer.msg('更新信息成功！')
            console.log($('.layui-form').serialize());
            // 我们此时在iframe层的页面，需要调用父页面index中的渲染用户信息方法
            window.parent.getUserInfo()
        }
    })
})