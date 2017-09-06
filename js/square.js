
//方块
var square = function(){
	var squareI = [//I型方块
		[[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]],
		[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]]
	];
	var squareL = [//L型方块
		[[0,2,0,0],[0,2,0,0],[0,2,2,0],[0,0,0,0]],
		[[0,0,0,0],[0,0,2,0],[2,2,2,0],[0,0,0,0]],
		[[0,2,2,0],[0,0,2,0],[0,0,2,0],[0,0,0,0]],
		[[0,0,0,0],[0,2,2,2],[0,2,0,0],[0,0,0,0]],	
	];
	var squareJ = [//J型方块
		[[0,0,0,0],[3,3,3,0],[0,0,3,0],[0,0,0,0]],
		[[0,3,3,0],[0,3,0,0],[0,3,0,0],[0,0,0,0]],
		[[0,0,0,0],[0,3,0,0],[0,3,3,3],[0,0,0,0]],
		[[0,0,3,0],[0,0,3,0],[0,3,3,0],[0,0,0,0]]
	];
	var squareZ = [//z型方块
		[[0,0,0,0],[4,4,0,0],[0,4,4,0],[0,0,0,0]],
		[[0,0,4,0],[0,4,4,0],[0,4,0,0],[0,0,0,0]]
	];
	var squareS = [//S型方块
		[[0,0,0,0],[0,5,5,0],[5,5,0,0],[0,0,0,0]],
		[[0,5,0,0],[0,5,5,0],[0,0,5,0],[0,0,0,0]]
	];
	var squareO = [//O型方块
		[[0,0,0,0],[0,6,6,0],[0,6,6,0],[0,0,0,0]]
	];
	var squareT = [//T型方块
		[[0,0,0,0],[0,7,0,0],[7,7,7,0],[0,0,0,0]],
		[[0,0,7,0],[0,7,7,0],[0,0,7,0],[0,0,0,0]],
		[[0,0,0,0],[7,7,7,0],[0,7,0,0],[0,0,0,0]],
		[[0,7,0,0],[0,7,7,0],[0,7,0,0],[0,0,0,0]]
	];
	//存放各种方块数据
	var Square = [squareL,squareJ,squareT,squareI,squareZ,squareS,squareO];
	var curSquare = Square[getRandom(0,Square.length)];
	var index = getRandom(0,curSquare.length); //当前方块在方块数组中索引
	
	//存放当前方块数组，用于变形
	this.currentSquare = curSquare;
	//存放下落方块数据
	this.data = curSquare[index];
	//下落方块下标
	this.index = index;
	//方块原点
	this.origin = {
		x:-1,
		y:6
	};
}

//获取min到max之间的随机数
function getRandom(min,max){
	return Math.floor(Math.random()*max + min);
}

//判断是否可以变形
square.prototype.canTransform = function(checkData){
	var currentSquare = this.currentSquare;
	var index = this.index + 1;
	if(index > currentSquare.length - 1){
		index = 0;
	}
	return checkData(currentSquare[index],this.origin);	
}

//变形
square.prototype.transfrom = function(){
	var currentSquare = this.currentSquare;
	this.index ++;
	if(this.index > currentSquare.length - 1){
		this.index = 0;
	}
	return currentSquare[this.index];
}

//判断是否可以下落
square.prototype.canDown = function(checkData){
	var origin = {};
	origin.x = this.origin.x + 1;
	origin.y = this.origin.y;
	return checkData( this.data,origin);	
}

//下落
square.prototype.down = function(){
	this.origin.x ++;
}

//判断是否可以左移
square.prototype.canLeft = function(checkData){
	var origin = {};
	origin.x = this.origin.x;
	origin.y = this.origin.y - 1;
	return checkData( this.data,origin);	
}

//左移
square.prototype.left = function(){
	this.origin.y --;
}

//判断是否可以右移
square.prototype.canRight = function(checkData){
	var origin = {};
	origin.x = this.origin.x;
	origin.y = this.origin.y + 1;
	return checkData( this.data,origin);	
}

//右移
square.prototype.right = function(){
	this.origin.y ++;
}


