function Game(){
	//界面渲染
	//游戏界面数据
	var gameData = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	];
	
	//保存下落方块数据
	var nextDivs = [];
	//保存游戏数据
	var gameDivs = [];
	
	//游戏渲染界面函数
	var initDiv = function(ele,objData,objDiv){
		var $gameInterface = ele;
		for(var i = 0; i < objData.length; i++){
			//存放每一行的数据
			var Div = [];
			for(var j = 0; j < objData[0].length; j++){
				var $div = $("<div></div>");
				$div.css({left:j*20 + "px",top:i*20 + "px"});
				$gameInterface.append($div);
				Div.push($div);
			}
			objDiv.push(Div);
		}
	}
	
	//游戏界面更新函数
	var refreshDiv = function(objData,objDiv){
		for(var i = 0; i < objData.length; i++){
			for(var j = 0; j < objData[0].length; j++){
				switch(objData[i][j]){
					case -1:
						objDiv[i][j].attr("class","gray pane-border pane");break;
					case 0:
						objDiv[i][j].attr("class","pane");break;
					case 1:
						objDiv[i][j].attr("class","red pane-border pane");break;
					case 2:
						objDiv[i][j].attr("class","yellow pane-border pane");break;
					case 3:
						objDiv[i][j].attr("class","green pane-border pane");break;
					case 4:
						objDiv[i][j].attr("class","blue pane-border pane");break;
					case 5:
						objDiv[i][j].attr("class","pink pane-border pane");break;
					case 6:
						objDiv[i][j].attr("class","orange pane-border pane");break;
					case 7:
						objDiv[i][j].attr("class","pupple pane-border pane");break;
					default:
						break;
				}			
			}
		}
	}
	
	//判断点是否合法
	function check(pos,x,y){
		if(pos.x + x < 0){  //上边界是否超出
			return false;
		}else if(pos.x + x >= gameData.length){ //下边界是否超出
			return false;
		}else if(pos.y + y < 0){ //左边界是否超出
			return false;
		}else if(pos.y + y >= gameData[0].length){ //右边界是否超出
			return false;
		}else if(gameData[pos.x + x][pos.y + y] == -1){ //当前位置是否被固定
			return false;
		}else{
			return true;
		}
	}
	
	//判断数据是否合法
	function checkData(data,origin){
		for(var i = 0; i < data.length; i++){
			for(var j = 0; j < data[0].length; j++){
				if(data[i][j] != 0){
					if(!check(origin,i,j)){
						return false;
					}
				}
			}
		}
		return true;
	}
	
	//清除数据
	function clearDate(){
		var data = cur.data,
			origin = cur.origin;
		for(var i = 0; i < data.length; i++){
			for(var j = 0; j < data[0].length; j++){
				if(check(origin,i,j)){
					gameData[origin.x + i][origin.y + j] = 0;
				}
			}
		}
	}
	
	//设置数据
	function setDate(){
		var data = cur.data,
			origin = cur.origin;
		for(var i = 0; i < data.length; i++){
			for(var j = 0; j < data[0].length; j++){
				if(check(origin,i,j)){
					gameData[origin.x + i][origin.y + j] = data[i][j];
				}
			}
		}
	}
	
	//是否可以下移
	function canDown(){
		if(cur.canDown(checkData)){
			return true;
		}
		return false;
	}
	
	//下移
	function moveDown(){
		if(cur.canDown(checkData)){
			clearDate();
			cur.down();
			setDate();
			refreshDiv(gameData,gameDivs);
			return true;
		}else{
			return false;
		}
	}
	
	//变形
	function transformTop(){
		if(cur.canTransform(checkData)){
			clearDate();
			cur.data = cur.transfrom();
			setDate();
			refreshDiv(gameData,gameDivs);
		}
	}
	
	//左移
	function moveLeft(){
		if(cur.canLeft(checkData)){
			clearDate();
			cur.left();
			setDate();
			refreshDiv(gameData,gameDivs);
		}
	}
	
	//右移
	function moveRight(){
		if(cur.canRight(checkData)){
			clearDate();
			cur.right();
			setDate();
			refreshDiv(gameData,gameDivs);
		}
	}
	
	//空格键控制直接落到底部
	function directFall(){
		var timer = setInterval(function(){
			if(cur.canDown(checkData)){
				clearDate();
				cur.down();
				setDate();
				refreshDiv(gameData,gameDivs);
			}else{
				clearInterval(timer);
			}
		},0)
	}
	
	//固定下落到底部方块
	function fixed(){
		var data = cur.data,
			origin = cur.origin;
		for(var i = 0; i < data.length; i++){
			for(var j = 0; j < data[0].length; j++){
				if(check(origin,i,j)){
					if(gameData[origin.x + i][origin.y + j] != 0){
						gameData[origin.x + i][origin.y + j] = -1;
					}
				}
			}
		}
		refreshDiv(gameData,gameDivs);
	}
	
	//消行
	function clearRow(){
		var clearLineCount = 0;//消除行数
		for(var i = gameData.length - 1; i >= 0; i--){
			var clear = true;
			for(var j = 0; j < gameData[0].length; j++){
				if(gameData[i][j] != -1){
					clear = false;  
				}
			}
		    //第i行可以消除
			if(clear){
				clearLineCount ++;
				for(var m = i; m >= 0; m--){
					for(var n = 0; n < gameData[0].length; n++){
						if(m == 0){
							gameData[m][n] = 0;
						}else{
							gameData[m][n] = gameData[m-1][n];
						}
					}
				}
				i++;
			}
		}
		return clearLineCount;  //返回消除的行数
	}
	
	//游戏结束
	function gameover(){
		var gameover = false;
		for(var i = 0; i < cur.data[0].length; i++){
			if(gameData[1][i + next.origin.y] == -1){
				gameover = true;  //当第二行下落位置的方块被固定时游戏结束
			}
		}
		return gameover;
	}
	
	//生成下一个方块
	function createNextSquare(){
		cur = next;
		next = new square();
		setDate(cur);
		refreshDiv(gameData,gameDivs);
		refreshDiv(next.data,nextDivs);
	}
	
	//界面重置
	function resetInit(){
		//移除游戏界面中div
		$game.children().remove();
		$next.children().remove();
	}
	
	//初始化界面
	var init = function(){
		$game = $("#game-interface");  //游戏界面 
		$next = $(".displaysqur");     //下一个下落方块界面
		
		//随机生成一个方块
		cur = new square();  //当前方块
		next = new square(); //下一方块
		
		//游戏界面渲染
		initDiv($game,gameData,gameDivs);
		initDiv($next,next.data,nextDivs);
		
		//设置当前方块数据
		setDate(cur);
		
		//刷新当前游戏界面
		refreshDiv(gameData,gameDivs);
		refreshDiv(next.data,nextDivs);
	}
    
    //导出API
	this.init = init;
	this.moveDown = moveDown;
	this.moveLeft = moveLeft;
	this.moveRight = moveRight;
	this.transformTop = transformTop;
	this.fixed = fixed;
	this.createNextSquare = createNextSquare;
	this.clearRow = clearRow;
	this.gameover = gameover;
	this.directFall = directFall;
	this.canDown = canDown;
	this.resetInit = resetInit;
};
