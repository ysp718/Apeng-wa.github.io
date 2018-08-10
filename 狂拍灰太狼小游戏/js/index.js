$(function (){
	//监听规则点击
	$('#rules').click(function(){
		$('#rule').stop().fadeIn(100);
	})
	//监听规则关闭
	$('#rule>a').click(function(){
		$('#rule').stop().fadeOut(100);
	})
	//监听游戏开始
	$('#start').click(function(){
		$('#start').stop().fadeOut(100);
		//重置分数
		$('#scores').text(0);
		progressHandler();
		wolfMove();
	})
	//监听重新开始
	$('#reStart').click(function(){
		$('#over').stop().fadeOut(100);
		//重置分数
		$('#scores').text(0);
		progressHandler();
		wolfMove()
	})
	//进度条处理
	function progressHandler(){
	//设置定时器
		$("#bar").width(180);
	var timer=setInterval(function(){
		//定时减小进度条的宽度
		$('#bar').width($('#bar').width()-3);
		if($('#bar').width()<=0){
			//清空定时器
			clearInterval(timer);
			stopWolfMove();
			$('#over').stop().fadeIn(100);
		}
	},1000)

	}
	//定义图片切换定时器
	var wolfTimer;
	//定义两个数组保存所有灰太狼和小灰灰的图片
		var wolf_1=['./img/h0.png','./img/h1.png','./img/h2.png','./img/h3.png','./img/h4.png','./img/h5.png','./img/h6.png','./img/h7.png','./img/h8.png','./img/h9.png'];
        var wolf_2=['./img/x0.png','./img/x1.png','./img/x2.png','./img/x3.png','./img/x4.png','./img/x5.png','./img/x6.png','./img/x7.png','./img/x8.png','./img/x9.png'];
        //定义一个数组保存所有可能出现的位置
        var arrPos = [
            {left:"100px",top:"115px"},
            {left:"20px",top:"160px"},
            {left:"190px",top:"142px"},
            {left:"105px",top:"193px"},
            {left:"19px",top:"221px"},
            {left:"202px",top:"212px"},
            {left:"120px",top:"275px"},
            {left:"30px",top:"295px"},
            {left:"209px",top:"297px"}
     	];
	function wolfMove(){

     	//创建一个图片
     	var images=$("<img src='' class='images'>");
     	//获得随机位置
     	var pos=Math.round(Math.random()*8);
     	//设置图片的位置
     	images.css({
     		position:"absolute",
     		top:arrPos[pos].top,
     		left:arrPos[pos].left,
     	});
     	//获取随机图片数组类型
     	var wolfType=Math.round(Math.random())==0?wolf_1:wolf_2;
     	//设置定时器是图片切换
     	window.imgSta=0;
     	window.imgEnd=5;
     	wolfTimer=setInterval(function(){
     		//设置随机图片数组类型
     		images.attr("src",wolfType[imgSta]);
     		imgSta++;
     		
     		if(imgSta>imgEnd){
     			clearInterval(wolfTimer);
     			images.remove();
     			wolfMove();
     		}
     	},200);
     	//把图片加到界面上
     		$('#gameBox').append(images);
     		playRule(images);
	}
	//停止游戏
	function stopWolfMove(){
		$('.images').remove();
		clearInterval(wolfTimer);
	}
	function playRule(images){
		//设置拍打时的动作图片
		images.one('click',function(){
			window.imgSta=5;
			window.imgEnd=9;
			//判断击打的图片
			var flag=images.attr("src").indexOf("h")>0;
			if(flag==true){
				//击打到灰太狼加10分
				$('#scores').text(parseInt($('#scores').text())+10);
			}else{
				//击打到小灰灰减10分
				$('#scores').text(parseInt($('#scores').text())-10);
			}
		})
	}
})