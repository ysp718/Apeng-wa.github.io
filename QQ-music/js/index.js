$(function(){
	//设置滚动条
	$('body').delegate('.nano','mouseenter',function(){
		$(".nano").nanoScroller();
	});
	//歌词事件
	var lyric;
	//获取音乐事件
	var $music=$('audio');
	//console.log($music.get(0).id);
	//加载播放事件
	var player=new Player($music);
	//获取滚动条的事件
	var $progressBar=$('.progress-bar');
	var $progressPass=$('.progress-pass');
	var $progressDot=$('.progress-dot');
	//加载滚动条事件
	var progress=new Progress($progressBar,$progressPass,$progressDot);
	progress.progressClick(function(value){
		player.musicJump(value);
	});
	progress.progressMove(function(value){
		player.musicJump(value);
	});
	//获取声音滚动条的事件
	var $voiceBar=$('.voice-bar');
	var $voicePass=$('.voice-pass');
	var $voiceDot=$('.voice-dot');
	//加载声音滚动条事件
	var voiceProgress=new Progress($voiceBar,$voicePass,$voiceDot);
	voiceProgress.progressClick(function(value){
		player.musicUpDown(value);
	});
	voiceProgress.progressMove(function(value){
		player.musicUpDown(value);
	});

	//监听歌曲鼠标移入
	$('#comment_leftMain').delegate('.music-list','mouseenter',function(){
		//显示控制面板
		$(this).find('.control-list').stop().fadeIn(100);
		//隐藏歌曲时长
		$(this).find('.music-time>span').stop().fadeOut(100);
		//显示删除
		$(this).find('.music-time>a').stop().fadeIn(100);
	});
	$('#comment_leftMain').delegate('.music-list','mouseleave',function(){
		//隐藏控制面板
		$(this).find('.control-list').stop().fadeOut(100);
		//隐藏删除
		$(this).find('.music-time>a').stop().fadeOut(100);
		//显示歌曲时长
		$(this).find('.music-time>span').stop().fadeIn(100);
	});
	//切换选中
	$('#comment_leftMain').delegate('.music-checked','click',function(){
		$(this).toggleClass('music-checked-true');
	})

	//工具栏点击播放
	$('#comment_leftMain').delegate('.list-play','click',function(){
		var $musicList=$(this).parents('.music-list');
		// console.log($musicList.get(0).index);
		// console.log($musicList.get(0).music);
		// player.playmusic($musicList.get(0).index,$musicList.get(0).music);
		$(this).toggleClass('list-play2');
		$(this).parents('.music-list').siblings().find('.list-play').removeClass('list-play2');
		if($(this).attr('class').indexOf('list-play2')!=-1){
			$('.music-play').addClass('music-pause');
		}else{
			$('.music-play').removeClass('music-pause');
		};
		//切换播放状态序号与波浪
		$musicList.find('.music-num').toggleClass('music-wave');
		//其他播放列表关闭波浪
		$musicList.siblings().find('.music-wave').removeClass('music-wave');
		//文字图标切换高亮
		$musicList.css('opacity','1');
		$musicList.siblings().css('opacity','0.5');
		//播放音乐
		player.playmusic($musicList.get(0).index,$musicList.get(0).music);
		//切换播放背景 样式
		initmusicInit($musicList.get(0).music);
		initmusicLyc($musicList.get(0).music);
	});
		//底部播放按钮
		$('.music-play').click(function(){
			//没有播放过音乐
			if(player.currentlist==-1){
				$('.music-list').eq(0).find('.list-play').trigger('click');
				//console.log($('.music-list').eq(1).get(0));
			}else{
				//已经播放过音乐
			 	$('.music-list').eq(player.currentlist).find('.list-play').trigger('click');
			}	
		});
		//底部下一首歌曲按钮
			$('.music-next').click(function(){
				$('.music-list').eq(player.playNext()).find('.list-play').trigger('click');

			})
		//底部上一首歌曲按钮
		$('.music-pre').click(function(){
			$('.music-list').eq(player.playPre()).find('.list-play').trigger('click');

		})
		//静音切换
		$('.music-coin').click(function(){
			$('.music-coin').toggleClass('music-coin1');
			//判断是否为静音
			if($(this).attr('class').indexOf('music-coin1')!=-1){
				player.musicUpDown(0);//打开静音
			}else{//关闭静音
				player.musicUpDown(1);
			}
		})
		//删除歌曲(监听事件)
		$('#comment_leftMain').delegate('.music-del','click',function(){
			var $item=$(this).parents('.music-list');
			//判断删除的歌曲是否为当前播放歌曲
			if($item.get(0).index==player.currentlist)
			{
				$('.music-next').trigger('click');
				console.log($item.get(0).index==player.currentlist);
			}
			$item.remove();
			player.changemusic($item.get(0).index);
			
			//重新排序
			$('.music-list').each(function(index,ele){
				ele.index=index;
				$(ele).find('.music-num').text(index+1);
			})
		})
		//获取播放时间
		player.musicTimeUpdate(function(musicDuration,getMusicCurrentTime,showTimeNow){
			//显示播放时间
			$('.progress-time').text(showTimeNow);
			//设置进度条
			var progressLong=parseInt((getMusicCurrentTime/musicDuration)*($progressBar.width()-10));
			progress.setProgress(progressLong);
			//实现歌词的同步
			var index=lyric.currentLrc(getMusicCurrentTime);
			$('#music_lyric p').eq(index).addClass('cur');
			$('#music_lyric p').eq(index).siblings().removeClass('cur');
			if(index<=2) return;
			$('#music_lyric').css(
				{
					marginTop:((-index+2)*30),
				}
			)

			
		})
		// player.$music.on('timeupdate',function(){
		// 	// showTime(player.getMusicDuration(),player.getMusicCurrentTime());
		// 	// // showTime(player.getMusicDuration(),player.getMusicCurrentTime());
		// 	var musicDuration=player.getMusicDuration();
		// 	var getMusicCurrentTime=player.getMusicCurrentTime();
		// 	var showTimeNow=showTime(musicDuration,getMusicCurrentTime);
		// 	$('.progress-time').text(showTimeNow);
		// })

		//获取列表
	setMusicList();
	function setMusicList(){
		$.ajax({
			url: "./source/musiclist.json",
			dataType: "json",
			success:function(data){
				//console.log(data);
				player.musicList=data;
				var list_ul=$('#comment_leftMain ul');
				$.each(data,function(index,ele){
					var item=creatItem(index,ele);
					list_ul.append(item);
					//console.log(1);
				})
			//初始化歌曲信息
			initmusicInit(data[0]);
			//初始化歌词
			initmusicLyc(data[0]);
			},
			error:function(e){
				console.log(e);
			},
		});
	};
	//初始化歌曲信息
	function initmusicInit(data){
		$('.music-right-name a').text(data.name);
		$('.music-right-singer a').text(data.singer);
		$('.music-right-album a').text(data.album);
		$('.progress-song').text(data.name+' / '+data.singer);
		$('.progress-time').text('00:00'+' / '+data.time);
		$('.music-image').attr('src',data.cover);
		$('#mask_bg').css('background',"url("+data.cover+")");
	}
	//初始化歌词信息
	function initmusicLyc(data){
		lyric=new Lyric(data.link_lrc);
		lyric.loadLyric(function(){
			//清空歌词
			$('#music_lyric').html('');
			$.each(lyric.lrc,function(index,ele){
				var $items=$('<p>'+ele+'</p>');
				$('#music_lyric').append($items);
			})
		});
	}
	function creatItem(index,ele){
		var item=$("<li class='music-list'>"+
							"<div class='music-checked'><i></i></div>"+
							"<div class='music-num'>"+(index+1)+"</div>"+
							"<div class='music-name'>"+ele.name+
							"<ul class='control-list'>"+
									"<li><a href='javascript:;' title='播放' class='list-play'></a></li>"+
									"<li><a href='javascript:;' title='添加'></a></li>"+
									"<li><a href='javascript:;' title='下载'></a></li>"+
									"<li><a href='javascript:;' title='分享'></a></li>"+
							"</ul>"+"</div>"+
							"<div class='music-singer'>"+ele.singer+"</div>"+
							"<div class='music-time'>"+
							"<span>"+ele.time+"</span>"+
							"<a href='javascript:;' title='删除' class='music-del'></a>"+
							"</div></li>");
		item.get(0).index=index;
		item.get(0).music=ele;
		return item;
	}
	// //处理歌曲时间
	// function showTime(all,now){
	// 	var all_m=parseInt(all/60);
	// 	var all_s=parseInt(all%60);
	// 	if(all_m<10){
	// 		all_m="0"+all_m;
	// 	};
	// 	if(all_s<10){
	// 		all_s="0"+all_s;		
	// 	};
	// 	var all_deal=all_m+"/"+all_s;
	// 	var now_deal=now_m+"/"+now_s;
	// 	var now_m=parseInt(now/60);
	// 	var now_s=parseInt(now%60);
	// 	if(now_m<10){
	// 		now_m="0"+now_m;
	// 	};
	// 	if(now_s<10){
	// 		now_s="0"+now_s;		
	// 	};
	// 	return now_m+':'+now_s+'/'+all_m+':'+all_s;
	// }


})