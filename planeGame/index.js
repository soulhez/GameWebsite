window.onload = function(){
  let btns = document.getElementsByClassName("btn");
  let start = btns[0];
  let intro = btns[1];
  let exit = btns[2];

  // 开始游戏
  start.onclick = function(){
   document.body.setAttribute("data-stat","start");
      // 游戏开始
      
    mainGame();
  }

  // 游戏说明
  intro.onclick = function(){
    document.body.setAttribute("data-stat","intro");
  }
  document.getElementsByClassName("closeIntro")[0].onclick = function(){
    document.body.setAttribute("data-stat","index");
  };

  // 退出游戏
  exit.onclick = function(){
    window.close();
  }
}

// 游戏主函数
let Game = {
  canvas : document.getElementById("game"),
  ctx : canvas.getContext("2d"),
  init : function(){
  
  },
  start : function(){

  },
  end : function(){

  }
}
