$(function(){
      // cropper 设置
      // 1.1 获取裁剪区域的 DOM 元素
      var $image = $('#image')
      // 1.2 配置选项
      const options = {
        // 纵横比 裁剪框的比例
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
      }
    
      // 1.3 创建裁剪区域
      $image.cropper(options)
      
      //  点击上传按钮时自动点击 input file 的输入框
      $('#btnChooseImage').click(function(){
          $('#file').click()
      })

      // 1.为文件选择框添加change事件 e.target.files就是我们上传的文件
      $('#file').change(function(e){
        // 2.获取用户选择的文件
        let files = e.target.files[0]
        if(files.length <= 0 ){
          return layer.msg('请选择图片！')
        }else {
          // 3.将选择的图片转换成URL地址 替换掉裁剪区的图片
          var imgURL = URL.createObjectURL(files)
          // 销毁裁剪区的图片 设置image的属性地址 重新创建裁剪区域
          $image.cropper('destroy').attr('src',imgURL).cropper(options)
        }

        // 点击确定按钮 发起请求 更新头像
        $('#btnUpload').on('click',function(){
          // 1.拿到用户裁剪后的头像
          let dataURL = $image.cropper('getCroppedCanvas',{
            // 创建一个 100 * 100 的画布
            width: 100,
            height: 100,
          }).toDataURL('image/png')  /* 将画布上的内容转换成base64位的字符串*/

          // 2.调用接口发起请求
          $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
              avatar: dataURL
            },
            success: function(res){
              if(res.status !== 0) {
                layer.msg('更新头像失败！')
              }else {
                layer.msg('更新头像成功！')
                // 重新渲染页面 更新头像
                window.parent.getUserInfo()
              }
            }
          })
        })
      })
})