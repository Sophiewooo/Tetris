(function(){
	window.CellBlock = Class.extend({
		init: function(row,col,color){
			this.w = 20;
			this.h = 20;
			//合法值0~23
			this.r = row;
			//合法值0~11
			this.c = col;
			//合法值1~7
			this.color = color;
		},
		render: function(){
			game.ctx.drawImage(game.images.cellBlock, (this.color - 1) * this.w, 0, this.w, this.h, this.c * this.w, this.r * this.h, this.w, this.h);
		}
	});
})();
