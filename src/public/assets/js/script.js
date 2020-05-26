$(function(){
    setInterval(() => {
        if(window.innerWidth>900){
            $('#centro').addClass('col-sm-7')
            $('#centro').removeClass('col-sm-12')
        }else{
            $('#centro').addClass('col-sm-12')
            $('#centro').removeClass('col-sm-7')
        }
    }, 100);
    $('#show-menu-lateral').click(function(){
        $('.menu-lateral-show-body').css('transform','translateX(1000px)')
    })
    $('#hide-menu-lateral').click(function(){
        $('.menu-lateral-show-body').css('transform','translateX(-100px)')
    })
    $('.mini-img').click(function(e){
        const url = e.target.getAttribute('src')
        $('#produto_origin').removeAttr('src')
        $('#produto_origin').attr('src',url)
    })
})