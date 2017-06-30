(function(){
	window.Map = Class.extend({
		init: function(){
			this.existBlocksMap =[
				"***000000000000",
				"***000000000000",
				"***000000000000",
				"***000000000000",
				"***000000000000",
				"***000000000000",
				"***000000000000",
				"***000000000000",
				"***000000000000",
				"***000000000000",
				"***000000000000",
				"***000000000000",
				"***000000000000",
				"***000000000000",
				"***000000000000",
				"***000000000000",
				"***000000000000",
				"***000000000000",
				"***000000000000",
				"***000000000000",
				"***000000000000",
				"***000000000000",
				"***000000000000",
				"***000000000000",
				"***************",
				"***************",
				"***************",
			];
			this.existBlocks = new Array();
			for(var r = 0; r < 24; r++){
				this.existBlocks.push(new Array());
				for(var c = 0; c < 12; c++){
					this.existBlocks[r].push(null);
				}
			}
			this.createBlocksByMap();
		},
		createBlocksByMap: function(){
			for(var r = 0; r < 24; r++){
				for(var c = 0; c < 12; c++){
					var color = parseInt(this.existBlocksMap[r].substr(c + 3, 1));
					//错误写法,因为当要消除时，color是0，不会执行后面的语句，不能变为null
//					color && (this.existBlocks[r][c] = new CellBlock(r,c,color));
					this.existBlocks[r][c] = color ? new CellBlock(r,c,color) : null;
				}
			}
		},
		addActiveBlockIntoMap: function(ab){
			for(var r = 0; r < 4; r++){
				for(var c = 0; c < 4; c++){
					var abChar = ab.activeBlockMap[r].substr(c, 1);
					if(abChar != "0"){
						this.existBlocksMap[ab.row + r] = this.existBlocksMap[ab.row + r].slice(0, ab.col + c + 3) + abChar + this.existBlocksMap[ab.row + r].slice(ab.col + c + 4);
					}
				}
			}
			this.createBlocksByMap();
		},
		render: function(){
			for(var r = 0; r < 24; r++){
				for(var c = 0; c < 12; c++){
					this.existBlocks[r][c] && this.existBlocks[r][c].render();
				}
			}
		},
		eliminateRows: function(){
			var fullRowNumber = [];
			for(var row = 23; row > 0; row--){
				if(this.existBlocksMap[row].indexOf("0") == -1){
					fullRowNumber.push(row);
				}
			}
			for(var i = fullRowNumber.length - 1; i >= 0; i--){
				for(var j = fullRowNumber[i]; j > 0; j--){
					this.existBlocksMap[j] = this.existBlocksMap[j - 1];
				}
			}
			this.createBlocksByMap();
		}
	});
})();
