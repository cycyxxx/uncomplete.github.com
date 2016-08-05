
var GameLayer = cc.Layer.extend({
	elist:[],
	last:null,
    ctor:function () {

        this._super();
        var size = cc.winSize;
        cc.spriteFrameCache.addSpriteFrames(res.tieba1_plist);

        var bb = new cc.Sprite(res.bb_png);
        bb.setPosition(size.width/2,100);
        this.addChild(bb,100);

        this.bg1 = new cc.Sprite(res.bg_png);
        this.bg1.setPosition(size.width/2,size.height/2);
        this.addChild(this.bg1);
        this.bg2 = new cc.Sprite(res.bg_png);
        this.bg2.setPosition(size.width/2,size.height/2+800);
        this.addChild(this.bg2);
        // this.map = new cc.Layer();
        // this.addChild(this.map);
        // this.map.addChild(this.bg1);
        // this.map.addChild(this.bg2);

        this.createEnemy()
        
        cc.eventManager.addListener(cc.EventListener.create({
        	event:cc.EventListener.TOUCH_ONE_BY_ONE,
        	onTouchBegan:function(touch,event){
        		var self = event.getCurrentTarget();
        		self.scheduleUpdate();
        		return true;
            },
            onTouchMoved:function(touch,event){

            },
            onTouchEnded:function(touch,event){
                var self = event.getCurrentTarget();
        		self.unscheduleUpdate();
        		
            }
        }),this);

        this.schedule(this.check,0.1);

        return true;
    },

    createEnemy:function(){
    	for(var i=0;i<8;i++){
        var eb = Ball.createRandomType(280+i*140);
        this.addChild(eb);
        this.elist.push(eb);
        }
        this.last=this.elist[7];
    },

    update:function(dt){
    	this. updateMap(dt);
    	// this.bg1.setPositionY(this.bg1.getPositionY()-260*dt);
    	// this.bg2.setPositionY(this.bg2.getPositionY()-260*dt);
    	// if(this.bg1.getPositionY()<=-cc.winSize.height/2){
    	// 	this.bg1.setPositionY(cc.winSize.height+cc.winSize.height/2);
    	// }else{
    	// 	this.bg1.setPositionY(this.bg1.getPositionY()-260*dt);
    	// }
    	// if(this.bg2.getPositionY()<=-cc.winSize.height/2){
    	// 	this.bg2.setPositionY(cc.winSize.height+cc.winSize.height/2);
    	// }else{
    	// 	this.bg2.setPositionY(this.bg2.getPositionY()-260*dt);
    	// }    
    	this.updateEball(dt);
    },

    updateMap:function(dt){
    	var map_y1 = this.bg1.y-dt*260;
        var map_y2 = this.bg2.y-dt*260;
        if(map_y1<-cc.winSize.height/2)
        {
            this.bg1.y = cc.winSize.height+map_y1+cc.winSize.height;
        }else{
            this.bg1.y = map_y1;
        }
        if(map_y2<-cc.winSize.height/2)
        {
            this.bg2.y = cc.winSize.height+map_y2+cc.winSize.height;
        }else{
            this.bg2.y = map_y2;
        }
    // 	//var mapy = this.map.y-dt*260;
    //     if(this.map.getPositionY()<=-cc.winSize.height){
    //     	this.map.setPositionY(0);}
    //     // }else{
    //     // 	this.map.setPositionY()=this.map.getPositionY();
    //     // }
    },

    updateEball:function(dt){
    	for(var i=0;i<this.elist.length-1;i++){
            if(this.elist[i].aitype==1)
            {
                this.elist[i].y = this.elist[i].y - dt*260;
                this.elist[i].midy = this.elist[i].y;
            }else{
                this.elist[i].midy = this.elist[i].midy - dt*260;
            }
            if(this.elist[i].y<=-this.elist[i].height/2){
            	//this.elist[i].setVisible(true);
                this.elist[i].init_ball(this.last.midy + 140);
                this.last = this.elist[i]; 
                //this.elist[i].init_ball(960);
            }
        }
    },

    check:function(dt){
    	for(var i=0;i<this.elist.length;i++){
    		if(this.elist[i].getPositionX()>=200&&this.elist[i].getPositionY()>=60&&this.elist[i].getPositionX()<=280&&this.elist[i].getPositionY()<=140){
    			if(this.elist[i].type==1){
    				cc.log("wudi");
    			}else{
    				cc.log("shibai");
    			}
    		}
    	}
    }
});


var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new  GameLayer();
        this.addChild(layer);
    }
});


var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        
       var size = cc.winSize;

       var background = new cc.Sprite(res.startscene_png);
       background.setPosition(size.width/2,size.height/2);
       this.addChild(background);
       
       var button = new ccui.Button(res.startbutton_png);
       button.setPosition(size.width/2,200);
       this.addChild(button);
       button.addTouchEventListener(this.touchEvent, this);
       
        return true;
    },
    touchEvent: function(sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_MOVED:
                break;
            case ccui.Widget.TOUCH_ENDED:
            	cc.director.runScene(new GameScene);
                break;
            case ccui.Widget.TOUCH_CANCELED:
                break;
            default:
                break;
            }
       	}

});
var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});