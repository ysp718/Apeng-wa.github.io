(function(window){
    function Player($music){
        return new Player.prototype.init($music)
    }
    Player.prototype={
        constructor:Player,
        musicList:[],
        init: function($music){
            this.$music=$music;
            this.music=$music.get(0);
        },
        currentlist:-1,
        //播放下一首编号
        playNext:function(){
            var index=this.currentlist+1;
            if(index>this.musicList.length-1)
            {
                index=0;
            };
            return index;  
        },
        //播放上一首编号
        playPre:function(){
            var index=this.currentlist-1;
            if(index<0){
                index=this.musicList.length-1;
            };
            return index;
        },
        //删除歌曲后修改musicList的数据
        changemusic:function(index){
            this.musicList.splice(index,1);
           // console.log(this.musicList);
           //判断删除的是否为播放之前的音乐
           if(index<this.currentlist){
               this.currentlist-=1;
           }
        },
        playmusic: function(index,music){
            //判断是否为同一首歌
            //console.log(music);
            if(this.currentlist==index)
            {   //如果暂停就播放，播放就暂停
                if(this.music.paused){
                    this.music.play();
                    //console.log(this.music.pause);
                }else{
                    this.music.pause();
                }
            }else{
                //不是同一首歌
                this.$music.attr('src',music.link_url);
                this.music.play();
                this.currentlist=index;
                // console.log(this.currentlist);
            }
            
        },
        //获取播放时间
        musicTimeUpdate:function(callback){
            $this=this;
            this.$music.on('timeupdate',function(){
                var musicDuration=$this.music.duration;
                var getMusicCurrentTime=$this.music.currentTime;
                var showTimeNow=$this.showTime(musicDuration,getMusicCurrentTime);
                callback(musicDuration,getMusicCurrentTime,showTimeNow);
            })
        },
        //跳转播放时间
        musicJump:function(value){
            this.music.currentTime=this.music.duration*value;
            //console.log(this.music.currentTime);
        },
        //处理歌曲时间
        showTime:function(all,now){
            var all_m=parseInt(all/60);
            var all_s=parseInt(all%60);
            if(all_m<10){
                all_m="0"+all_m;
            };
            if(all_s<10){
                all_s="0"+all_s;		
            };
            var all_deal=all_m+"/"+all_s;
            var now_deal=now_m+"/"+now_s;
            var now_m=parseInt(now/60);
            var now_s=parseInt(now%60);
            if(now_m<10){
                now_m="0"+now_m;
            };
            if(now_s<10){
                now_s="0"+now_s;		
            };
            return now_m+':'+now_s+' / '+all_m+':'+all_s;
        },
        //处理播放音量
        musicUpDown:function(value){
            // if(value>1||value<0) return;
            this.music.volume=value;
        }

		

    }
    Player.prototype.init.prototype=Player.prototype;
    window.Player=Player;
})(window)