(function(){
	var allType = {
        "I" : [["0010","0010","0010","0010"],
               ["0000","1111","0000","0000"]],
        "L" : [ ["0200","0200","0220","0000"],
                ["0000","2220","2000","0000"],
                ["2200","0200","0200","0000"],
                ["0020","2220","0000","0000"]],
        "J" : [["0300","0300","3300","0000"],
               ["3000","3330","0000","0000"],
               ["0330","0300","0300","0000"],
               ["0000","3330","0030","0000"]],
        "Z" : [["0000","4400","0440","0000"],
            ["0400","4400","4000","0000"]],
        "T" : [["0000","5550","0500","0000"],
            ["0500","5500","0500","0000"],
            ["0500","5550","0000","0000"],
            ["0500","0550","0500","0000"]],
        "O" : [["0660","0660","0000","0000"]],
        "S" : [["0770","7700","0000","0000"],
               ["7000","7700","0700","0000"]]
    };

	window.ActiveBlock = Class.extend({
		init: function(){
			this.row = 0;
			this.col = 5;
			var typeChar ="ILJZTOS";
			this.randomType = typeChar.substr(_.random(0, 6), 1);
			this.directionAmount = allType[this.randomType].length;
			this.randomDirection = _.random(0, this.directionAmount - 1);
			this.activeBlockMap = allType[this.randomType][this.randomDirection];
			this.activeBlock = new Array();
			for(var r = 0; r < 4; r++){
				this.activeBlock.push(new Array());
				for(var c = 0; c < 4; c++){
					this.activeBlock[r].push(null);
				}
			}
			this.bindListener();
			this.createActiveBlock();
		},
		createActiveBlock: function(){
			for(var r = 0; r < 4; r++){
				for(var c = 0; c < 4; c++){
					var color = this.activeBlockMap[r].substr(c, 1);
					color && (this.activeBlock[r][c] = new CellBlock(this.row + r, this.col + c, color));
				}
			}
		},
		goDown: function(){
			var slice = [];
			for(var r = this.row + 1; r < this.row + 5; r++){
				slice.push(game.map.existBlocksMap[r].substr(this.col + 3, 4));
			}
			if(checkTwoMaps(slice, this.activeBlockMap)){
				this.row ++;
				this.createActiveBlock();
				return true;
			}else{
				game.map.addActiveBlockIntoMap(this);
				game.activeBlock = new ActiveBlock();
				game.map.eliminateRows();
				return false;
			}
		},
		goBottom: function(){
			while(this.goDown()){}
		},
		goLeft: function(){
			var slice = [];
			for(var r = this.row; r < this.row + 4; r++){
				slice.push(game.map.existBlocksMap[r].substr(this.col + 3 - 1, 4));
			}
			if(checkTwoMaps(slice, this.activeBlockMap)){
				this.col --;
				this.createActiveBlock();
			}
		},
		goRight: function(){
			var slice = [];
			for(var r = this.row; r < this.row + 4; r++){
				slice.push(game.map.existBlocksMap[r].substr(this.col + 3 + 1, 4));
			}
			if(checkTwoMaps(slice, this.activeBlockMap)){
				this.col ++;
				this.createActiveBlock();
			}
		},
		changeDirection: function(){
			var testActiveBlockMap = allType[this.randomType][(this.randomDirection + 1) % this.directionAmount];
			var slice = [];
			for(var r = this.row; r < this.row + 4; r++){
				slice.push(game.map.existBlocksMap[r].substr(this.col + 3, 4));
			}
			if(checkTwoMaps(testActiveBlockMap, slice)){
				this.randomDirection ++;
				this.activeBlockMap = testActiveBlockMap;
				this.createActiveBlock();
			}
		},
		render: function(){
			for(var r = 0; r < 4; r++){
				for(var c = 0; c < 4; c++){
					this.activeBlock[r][c] && this.activeBlock[r][c].render();
				}
			}
		},
		update: function(){
			if(game.frameUtil.currentFrame % 25 == 0){
				this.row ++;
				this.createActiveBlock();
			}
		},
		bindListener: function(){
			var self = this;
			document.onkeydown = function(event){
				if(event.keyCode == 37){
                    self.goLeft();
                }else if(event.keyCode == 38){
                    self.changeDirection();
                }else if(event.keyCode == 39){
                    self.goRight();
                }else if(event.keyCode == 40){
                    self.goBottom();
                }
			}
			var startX;
			var startY;
			var flag;
			var lock = false;
			game.canvas.addEventListener("touchstart", function(event){
				event.preventDefault();
				startX = event.touches[0].pageX;
				startY = event.touches[0].pageY;
				flag = true;
			});
			game.canvas.addEventListener("touchmove", function(event){
				event.preventDefault();
				var dX = event.touches[0].pageX - startX;
				var dY = event.touches[0].pageY - startY;
				if(dX <= -30){
					self.goLeft();
					startX = event.touches[0].pageX;
					flag = false;
				}else if(dX >= 30){
					self.goRight();
					startX = event.touches[0].pageX;
					flag = false;
				}
				if(dY > 100 && !lock){
					self.goBottom();
					lock = true;
				}
			});
			game.canvas.addEventListener("touchend", function(event){
				event.preventDefault();
				if(flag){
					self.changeDirection();
				}
				flag = true;
			});
		}
	});
	function checkTwoMaps(A, B){
		for(var r = 0; r < 4; r++){
			for(var c = 0; c < 4; c++){
				var Achar = A[r].substr(c, 1);
				var Bchar = B[r].substr(c, 1);
				if(Achar != "0" && Bchar != "0"){
					return false;
				}
			}
		}
		return true;
	}
})();
