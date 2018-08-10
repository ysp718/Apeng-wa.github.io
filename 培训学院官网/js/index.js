$(function(){
    
    
    $(window).on("resize",function
    (){
        let $items=$(".carousel-inner .item"); 
        let $clientX=$(window).width();
        //console.log($clientX);
        $items.each(function(index,ele){
            if($clientX>=800){
                {
                    let url=$(ele).data("lg");
                    let src="url("+url+")";
                    $(ele).css("backgroundImage",src);
                    $(ele).empty();
                }
            }else{
                    let url=$(ele).data("mx");
                    let src="url("+url+")";
                    $(ele).css("backgroundImage",src);
                    let img='<img src="'+url+'">';
                    $(ele).empty().append(img);
            }
        })
    }
    )   

    $(window).trigger("resize");
    //导航滚动
    let $navItems=$('#header .navbar-nav li');
    $navItems.eq(2).on("click",function(){
        $('html,body').animate({scrollTop:$('#hot').offset().top},1000)
    });
    $navItems.eq(1).on("click",function(){
        $('html,body').animate({scrollTop:$('#online').offset().top},1000)
    });
    $navItems.eq(5).on("click",function(){
        $('html,body').animate({scrollTop:$('#footer').offset().top},1000)
    });
    //初始化提示标签
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })
})