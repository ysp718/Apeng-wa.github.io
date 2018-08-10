(function(window){
    function Progress($progressBar,$progressPass,$progressDot){
        return new Progress.prototype.init($progressBar,$progressPass,$progressDot)
    }
    Progress.prototype={
        constructor:Progress,
        init: function($progressBar,$progressPass,$progressDot){
            this.progressBar=$progressBar;
            this.progressPass=$progressPass;
            this.progressDot=$progressDot;    
        },
        //监听进度条鼠标点击
        progressClick:function(callback){
            var $this=this;//下面获取进度条jq事件需要前面的this
            this.progressBar.click(function(e){
                var normalLeft=$(this).offset().left;
                var nowLeft=e.pageX;
                var seedbar=nowLeft-normalLeft;
                // if(seedbar>0 && seedbar<($(this).width()-10)){
                     //设置进度条宽度
                $this.progressPass.css('width', seedbar);
                //计算点击位置相对于滚动条比例
                var value=seedbar/($(this).width());
                console.log(value);
                callback(value);
                // }
               
            })
        },
        //监听进度条鼠标移动
        progressMove:function(callback){
            var $this=this;
            this.progressBar.mousedown(function(){
                var normalLeft=$(this).offset().left;
                $(document).mousemove(function(e){
                    var nowLeft=e.pageX;
                    var seedbar=nowLeft-normalLeft;
                    //设置进度条宽度
                    // if(seedbar>0 && seedbar<($(this).width()-10)){
                        //设置进度条宽度
                       $this.progressPass.css('width', seedbar);
                    // }
                });
                $(document).mouseup(function(e){
                    $(document).off("mousemove");
                    //计算点击位置相对于滚动条比例
                    var nowLeft=e.pageX;
                    var seedbar=nowLeft-normalLeft;
                    // if(seedbar>0&&seedbar<($(this).width()-10)){
                     //设置进度条宽度
                    $this.progressPass.css('width', seedbar);
                    //计算点击位置相对于滚动条比例
                    var value=(nowLeft-normalLeft)/($(this).width()-10);
                    //console.log($(this).width()-10);
                    callback(value);
                // }
            }
                )
            })
        },
        
        setProgress:function(value){
            if(value<0||value>(this.progressBar.width()-10)) return;
            this.progressPass.css('width',value+"px");
        }


    }
    Progress.prototype.init.prototype=Progress.prototype;
    window.Progress=Progress;
})(window)