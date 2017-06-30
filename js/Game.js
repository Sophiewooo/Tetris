(function(){
	//Game是核心类
	window.Game = Class.extend({
		init: function(paramsJSON){
			var self = this;
			//fps表示每秒多少帧，默认值60
			this.fps = paramsJSON.fps || 50;
			this.frameUtil = new FrameUtil();
			this.canvas = document.getElementById(paramsJSON.canvasId);
			this.ctx = this.canvas.getContext("2d");
			this.images = null;
			this.sr = new StaticResourcesUtil();
			this.sr.loadImages("setup.json",function(alreadyLoadNum, allNum, imagesObj){
				//回调函数中的this指向window
				self.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
				self.ctx.font = "20px 黑体";
				self.ctx.fillStyle = "white";
				self.ctx.fillText("正在加载 " + alreadyLoadNum + " / " + allNum, this.canvas.width / 2 - 70, this.canvas.height / 2 - 8);
				if(alreadyLoadNum == allNum){
					self.images = imagesObj;
					self.run();
				}
			});
		},
		run: function(){
			//setInterval中函数的this指向window
			var self = this;
			//创建角色
			this.map = new Map();
			this.activeBlock = new ActiveBlock();
			this.timer = setInterval(function(){
				self.mainloop();
			}, 1000 / self.fps);
		},
		//主循环，每帧执行
		//需要计算实际帧率，因为主循环复杂时，一帧的执行时间变长，帧率下降
		mainloop: function(){
			//清屏
			this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
			this.map.render();
			this.activeBlock.render();
			if(game.frameUtil.currentFrame % 25 == 0){
				this.activeBlock.goDown();
			}
			this.frameUtil.update();
		},
		stop: function(){
			clearInterval(this.timer);
		}
	});
})();
