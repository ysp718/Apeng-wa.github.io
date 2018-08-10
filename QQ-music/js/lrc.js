(function(window){
    function Lyric(path){
        return new Lyric.prototype.init(path);
    }
    Lyric.prototype={
        constructor:Lyric,
        time:[],
        lrc:[],
        index:-1,
        init:function(path){
            this.path=path;
        },
        loadLyric:function(callback){
            var $this=this;
            $.ajax({
                url:$this.path,
                dataType:"text",
                success:function(data){
                    //console.log(data);
                    $this.parseLrc(data);
                    callback();
                },
                error:function(e){
                    console.log(e);
                }
            });
        },
        parseLrc:function(data){
            //清空上首歌的数据
            this.time=[];
            this.lrc=[];
            var $this=this;
            var array=data.split('\n');
            //console.log(array);
            //正则表达式
            var timeReg=/\[(\d*:\d*\.\d*)\]/;
            // 遍历出每一条歌词
            $.each(array,function(index,ele){
                //console.log(ele);
                //取出歌词
                var eachLrc=ele.split(']');//去除空歌词
                if(eachLrc[1].length==1) return true;
                $this.lrc.push(eachLrc[1]);

                var res=timeReg.exec(ele);
                if(res==null) return true;
                //console.log(res,typeof(res));
                var timeStr=res[1];//00:00.01
                res1=res[1].split(':');
                //取出时间并转换形式为000;
                var res_min=parseInt(res1[0])*60;
                var res_sec=parseFloat(res1[1]);
                var res_time=Number((res_min+res_sec).toFixed(2));
                $this.time.push(res_time);
                
                
            });
           // console.log($this.time);
           // console.log($this.lrc);
        },
        currentLrc:function(currentTime){
            
            //console.log(currentTime);
            if(currentTime>=this.time[0]){
                this.index++;
                this.time.shift();
            };
            return this.index;
        }
       
    }
    Lyric.prototype.init.prototype=Lyric.prototype;
    window.Lyric=Lyric;
})(window)