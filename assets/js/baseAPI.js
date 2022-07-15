$(function(){
    alert(1)
    // $.ajaxPrefilter预过滤请求用于拼接请求url
    $.ajaxPrefilter(function(options){
        console.log(options.url);
    })
})