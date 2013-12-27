var waitAnimateFlag = true,
    waitIcon,
    waitIconGlow,
    waitIconCircle;
function WaitIconClass(){
    
    WaitIconClass.prototype.Init = function(){
        
        this.position();

        this.hide();

    }

    WaitIconClass.prototype.playAnimate = function(){
        if(!waitIconGlow) return ;
        if(waitAnimateFlag){
            waitAnimateFlag = false;
            waitIconGlow.animate({
                opacity: 0
            },300,function(){
                waitIconGlow.animate({
                    opacity: 0.3
                },300,function(){
                    waitAnimateFlag = true;
                });
            })
        }
    }

    WaitIconClass.prototype.hide = function(){
        waitIcon.hide();
        waitIconGlow.hide();
        waitIconCircle.hide();
        this.createRightIcon();
    }

    WaitIconClass.prototype.show = function(){
        waitIcon.show();
        waitIconGlow.show();
        waitIconCircle.show();
    }

    WaitIconClass.prototype.createRightIcon = function(){
        repheal.image("img/overlay-ok.png", (20+this.x), (125+this.y), 12, 12);
    }

    WaitIconClass.prototype.position = function(_x,_y){
        this.x = _x;
        this.y = _y;
        waitIconGlow && waitIconGlow.remove();
        waitIconCircle &&waitIconCircle.remove();
        waitIcon && waitIcon.remove();
        
        waitIconCircle = repheal.circle((28+_x), (133+_y), 4).attr({
          'arrow-end':'block-wide-long',
          stroke: "#009B0A",
          opacity: 0
        });
        waitIconGlow = waitIconCircle.glow({
          'color': '#E9CC7B',
          opacity: 0.6,
          'width': '1'
        });
        waitIcon = repheal.image("img/gif002.gif", (20+_x), (125+_y), 16, 16);

        waitAnimateFlag = true;
    }

}