window.onload=function(){
	function C(name) {
		return typeof name ==="string"?document.getElementsByClassName(name):null;
	}
	var lis=C("leftTop")[0].children[0].children;
	for(var i=0;i<lis.length;i++)
	{	
	(function(i){
		lis[i].onclick=function(){
			C("leftTop")[0].children[0].style.background=
			"url(img/tab.jpg) no-repeat 0px "+-i*56+"px";
			}})(i);
			
		}
	var btn=C("leftBottom_text")[4].children[3];
	btn.onmousedown=function(){
		btn.style.background="url(img/glb_v2.png) no-repeat -288px -360px";
	}
	btn.onmouseup=function(){
		btn.style.background="url(img/glb_v2.png) no-repeat -144px -360px";
	}
	}