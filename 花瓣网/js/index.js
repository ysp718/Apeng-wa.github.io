(function(window){
		// 选项卡切换 float_top 
		tab();
		//创建元素
		creat();
		//延时加载
		setTimeout(function () {
		waterFull("dom_main", "dom-box");
    }, 200);
		//滚动加载
		window.onscroll=function(){
			if(checkWillLoadImage())
			{
				creat();
        		waterFull("dom_main", "dom-box");
    		};
			     // 判断是否吸顶
				 var scrollTop =scroll().top;
				 if(scrollTop >=150){
					 $('float_top').style.display = "block";
					 $('right_float').children[0].style.display = "block";
				 }else{
					 $('float_top').style.display = "none";
					 $('right_float').children[0].style.display = "none";
				 }
		}
		//监听登陆按钮点击
		$('login').onclick=function(){
			$('bg').style.display="block";
		};
		//关闭登陆框
		$('close_btn').onclick=function(){
			$('bg').style.display="none";
		}
	})(window);
function tab(){
	// 获取选项卡元素
	var tab_nav_lis=$("tab_nav").children[0].children;
	// 获取主体内容
	var content_dom=$("content").children;
	// 记录选中Tab卡
	var tab_num=0;
	// 遍历选项卡点击事件
	for(var i=0;i<tab_nav_lis.length;i++){
		(function(i){
			tab_nav_lis[i].onmousedown=function(){
				// 清除样式
				tab_nav_lis[tab_num].className="";
				// 隐藏未选中主体内容
				content_dom[tab_num].style.display="none";
				//设置选中选项样式
				tab_nav_lis[i].className="current";
				// 显示选中主体内容
				content_dom[i].style.display="block";	
				//赋值选项卡序号
				tab_num=i;			
			}
		})(i)
	}
}
	// 动态创建元素
function creat(){
	var json=[
        {txt: '当我们正在为生活疲于奔命的时候，生活已经离我们而去。——约翰·列侬', pic: 'img/0.jpg'},
        {txt: '活在世上，不必什么都知道，只知道最好的就够了。——王小波', pic: 'img/1.jpg'},
        {txt: '世界上任何书籍都不能带给你好运，但是它们能让你悄悄变成你自己。——黑塞', pic: 'img/2.jpg'},
        {txt: '很多人不需要再见，只是路过而已。——《彼岸花》', pic: 'img/3.jpg'},
        {txt: '人生最困难的三件事：保守秘密，忘掉所受的创伤，充分利用余暇。——吉罗', pic: 'img/4.jpg'},
        {txt: '有些人是离开后，才会发觉那个人是最喜欢的。——《东邪西毒》', pic: 'img/5.jpg'},
        {txt: '我总是在日暮时分,书影与书影之间,宁静的悲哀里,最想念你。——亦舒', pic: 'img/6.jpg'},
        {txt: '再长的路，一步步地能走完，再短的路，不迈开双脚也无法到达。', pic: 'img/7.jpg'},
        {txt: '哪里会有人喜欢孤独，不过是不喜欢失望。——村上春树', pic: 'img/8.jpg'},
        {txt: '人时已尽，人世很长，我在中间，应当休息。——顾城', pic: 'img/9.jpg'},
        {txt: '信任的深浅，不在于会不会对你笑，而在于愿不愿意在你面前哭。', pic: 'img/10.jpg'},
        {txt: '有一种旅行，不为跋涉千里的向往，只为漫无目的的闲逛，不为人山人海的名胜，只为怡然自乐的街景...', pic: 'img/11.jpg'},
        {txt: '人都会孤独，但唯独他，可以越过这尘世的热闹，一眼明白这世间所有的繁华不过是他身边的过眼云烟。', pic: 'img/12.jpg'},
        {txt: '不乱于心，不困于情。不畏将来，不念过往。如此，安好。', pic: 'img/13.jpg'},
        {txt: '每一个人都需要这样一个朋友：当以为自己再也笑不出来的时候，他能让你开怀大笑！', pic: 'img/14.jpg'},
        {txt: '咖啡苦与甜，不在于怎么搅拌，而在于是否放糖；一段伤痛，不在于怎么忘记，而在于是否有勇气重新开始。', pic: 'img/15.jpg'},
        {txt: '其实我不是一定要等你，只是等上了，就等不了别人了。——《朝露若颜》', pic: 'img/16.jpg'},
        {txt: '一切都是瞬间，一切都会过去，一切过去了的都会变成亲切的怀念。——普希金', pic: 'img/17.jpg'},
        {txt: '多少人曾爱慕你年轻时的容颜，可知谁愿承受岁月无情的变迁', pic: 'img/18.jpg'},
        {txt: '不在任何东西面前失去自我，哪怕是教条，哪怕是别人的目光，哪怕是爱情。——《成为简·奥斯汀》', pic: 'img/19.jpg'},
        {txt: '你如果认识从前的我，也许你会原谅现在的我。——张爱玲', pic: 'img/20.jpg'},
        {txt: '简约不是少，而是没有多余。足够也不是多，而是刚好你在。', pic: 'img/21.jpg'},
        {txt: '若只是喜欢 何必夸张成爱。——林夕', pic: 'img/22.jpg'},
        {txt: '梦里出现的人，醒来时就该去见她，生活就是这么简单。——《新桥恋人》', pic: 'img/23.jpg'},
        {txt: '与众不同的你是幸运的，何必让自己变得与别人一样。', pic: 'img/24.jpg'},
        {txt: '阳光温热，岁月静好，你还不来，我怎敢老。', pic: 'img/25.jpg'},
        {txt: '一个人知道自己为什么而活，就能忍受任何生活。——尼采', pic: 'img/26.jpg'},
        {txt: '我们已经出发了太久，以至于我们忘了为什么要出发。——纪伯伦', pic: 'img/27.jpg'},
        {txt: '水来，我在水中等你；火来，我在灰烬中等你。——《你是我的独家记忆》', pic: 'img/28.jpg'},
        {txt: '天下就没有偶然，那不过是化了妆的，戴了面具的必然。——钱钟书', pic: 'img/29.jpg'}
    		],str="",str_p,txt,pic,dom,collect;
    for(var i=0;i<30;i++){
		str = $("dom_main").innerHTML;
    	txt=json[i].txt;
    	pic=json[i].pic;
    // 	str="<div class='dom-main'>"+
		str_p="<div class='dom-box'>"+
			"<div class='dom-box-img'>"+"<img src="+pic+"></div><p>"+txt+"</p>"+
			"<a href='' class='collect'><span >采集</span></a>"+
			"<a href='' class='heart'><div></div></a></div>"
		str+=str_p; 
		$("dom_main").innerHTML=str;	
    }

		dom=$("dom_main").getElementsByClassName("dom-box");
		collect=$("dom_main").getElementsByClassName("collect");
		//绑定采集，喜欢事件
		for(var j=0;j<dom.length;j++)
		{
			dom[j].onmouseover=function(){
				// console.log(this.childNodes[2]);
				this.childNodes[2].style.display="block";
				this.childNodes[3].style.display="block";
			}
			dom[j].onmouseout=function(){
				// console.log(this.childNodes[3]);
				this.childNodes[2].style.display="none";
				this.childNodes[3].style.display="none";
			}
		}
}
