$(function(){
	var $mask = $(".game-interface-mask"), //游戏界面蒙版
		$paly = $(".paly"),           //开始游戏界面
		$gameover = $(".gameover");   //游戏结束界面
		
	var $tab = $(".paly li"),         //开始游戏菜单选项
	    $start = $(".start"),         //开始游戏选项
		$restart = $(".restart"),     //重新开始游戏按钮
		$return = $(".return");       //返回主菜单按钮
		
	var $totaltime = $(".totaltime"), //总共用时
		$lastmark = $(".lastmark"),   //总的得分
		$usetime = $(".time"),        //当前游戏用时
		$mark = $(".mark");    		  //当前游戏得分
		
	var INTERVAL = 500;        //每次方块下落时间间隔
	var len = $tab.length;     //选择模式菜单长度
	
	var timer = null,          //方块自动下落定时器
		choosingTimer = null;  //开始界面选项图标闪动的定时器
	
	var gametime = 0,          //游戏用时
	    mark = 0;         	   //游戏分数
	
	var gamecount = 0;         //用于计算游戏时间
	var choosingIndex = 0;     //选中游戏模式索引
	
	//绑定键盘事件，分别是变形、下落、左移、右移和直接下落到底部
	var bindKeyEvent = function(){
		$(document).keydown(function(event){
			switch(event.which){
				case 38:   //top
					game.transformTop();
					break;
				case 40:   //down
					game.moveDown();
					break;
				case 37:   //left
					game.moveLeft();
					break;
				case 39:   //right
					game.moveRight();
					break;
				case 32:   //space
					game.directFall();
					break;
			}
		});
	}
	
	//方块自动下落
	function autoMove(){
		getGameTime();   //获取游戏时间
		game.moveDown(); //游戏下落
		
		//如果不能下落就执行方块固定、消行、生成下一个方块等操作
		if(!game.canDown()){
			setTimeout(goon,50); 
		}
	}
	
	//方块固定、继续游戏等
	function goon(){
		game.fixed();  //方块固定
		getMark(game.clearRow());  //消行并计分
		
		//游戏结束
		if(game.gameover()){
			stopGame();  //结束游戏
			
			//游戏结束界面显示
			$mask.fadeIn();  //显示结束界面
			$totaltime.html(gametime);  //显示结束用时
			$lastmark.html(mark);  //显示结束分数
			$gameover.removeClass("none"); //显示结束界面
			
			//返回按钮鼠标点击事件
			$return.click(function(){
				//清除游戏数据
				resetGame();
				//执行选择游戏模式
				choosenModel();
			});
			
			//重新开始按钮鼠标点击事件
			$restart.click(function(){
				//清除游戏数据
				resetGame();
				//重新开始游戏
				choosenAndStart();
			});
		}else{
			game.createNextSquare(); //随机生成下一个方块
		}
	}
	
	//游戏结束的数据清除操作
	function resetGame(){
		//将游戏结束界面隐藏并显示游戏开始主界面
		$gameover.addClass("none");
		$paly.removeClass("none");
		//清除游戏用时与分数
		gametime = 0;
		mark = 0;
		$usetime.html(gametime);
		$mark.html(mark);
		//重置游戏界面
		game.resetInit();
		//对返回按钮和重新开始按钮的鼠标事件进行解绑
		$return.unbind("click");
		$restart.unbind("click");
	}
	
	//停止游戏
	function stopGame(){
		clearInterval(timer); //清除自动下落定时器
		$(document).unbind("keydown"); //解除键盘绑定事件
	}
	
	//游戏用时
	function getGameTime(){
		gamecount ++;
		if(gamecount == 2){  //表示用时一秒
			gamecount = 0;
			gametime ++;
			$usetime.html(gametime); //显示时间到界面上
		}
	}
	
	//游戏分数
	function getMark(line){
		switch(line){
			case 0:
				mark += 0;break;
			case 1:
				mark += 10;break;
			case 2:
				mark += 30;break;
			case 3:
				mark += 60;break;
			case 4:
				mark += 100;break;
			default:
				break;
		}
		$mark.html(mark);
	}
	
	//开始游戏
	function startGame(){
		//初始化一个游戏对象
		game = new Game();
		//游戏界面初始化
		game.init();
		//绑定键盘事件
		bindKeyEvent();
		//设置和清除定时器
		clearInterval(timer);
		timer = setInterval(autoMove,INTERVAL);
	}

	//选择中游戏模式图标闪动
	function choosingModel($ele){
		choosingTimer = setInterval(function(){
			$ele.toggleClass("choosen"); //图标闪动
		},300)
		
	}
	
	//选择中游戏模式
	function clearCurModel(callback){
		var $this = $($tab[choosingIndex]);
		clearInterval(choosingTimer);
		$this.removeClass("choosen");
		if(callback){
			callback();
		}
		var $ele = $($tab[choosingIndex]);
		choosingModel($ele);	
	}
	
	//按下选择游戏模式
	function choosingDown(){
		choosingIndex++;
		if(choosingIndex == len){
			choosingIndex = 0;
		}
	}
	
	//按上选择游戏模式
	function choosingUp(){
		choosingIndex--;
		if(choosingIndex == -1){
			choosingIndex = len - 1;
		}
	}
	
	//选中游戏模式并开始游戏
	function choosenAndStart(){
		var len = $tab.length;
		var $this = $($tab[choosingIndex]);
		clearInterval(choosingTimer);
		$this.addClass("choosen");
		$mask.fadeOut();
		$paly.addClass("none");
		setTimeout(function(){	
			switch($this.attr("model")){
				case "start":
					$(document).unbind("keydown");
					startGame();break;
				case "single":
					break;
				case "double":
					break;
				default:
					break;
			}
		},1000);
	}
	
	//通过键盘选择游戏模式
	function choosenModel(){
		choosingModel($start);
		$(document).keydown(function(event){
			switch(event.which){
				case 38:   //top
					clearCurModel(choosingUp);
					break;
				case 40:   //down
					clearCurModel(choosingDown);
					break;
				case 13:   //enter
					choosenAndStart();
					break;
				default:
					break;
			}
		})
	}
	
	//选择游戏模式并开始游戏
	choosenModel();
	
})
