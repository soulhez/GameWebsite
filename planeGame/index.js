window.onload = function(){
  let btns = document.getElementsByClassName("btn");
  let start = btns[0];
  let intro = btns[1];
  let exit = btns[2];

  // 开始游戏
  start.onclick = function(){
   document.body.setAttribute("data-stat","start");
    // 游戏开始
    main();
  }

  // 游戏说明
  intro.onclick = function () {
    document.body.setAttribute("data-stat", "intro");
  }
  document.getElementsByClassName("closeIntro")[0].onclick = function () {
    document.body.setAttribute("data-stat", "index");
  };
  // 退出游戏
  exit.onclick = function () {
    window.close();
  }
}

// 游戏主函数
function main(){
  let ctx = init();
  enermy();

  function init(){
    let can = document.getElementById("game");
    let ctx = can.getContext("2d");
    return ctx;
  }

  function enermy(){
    let x = 20;
    let y = 30;
    x, y = x + 10, y + 20;
    ctx.fillStyle = "red";
    ctx.arc(x, y, 10, 0,Math.PI*2);
    ctx.fill();
    window.requestAnimationFrame(enermy);
  }
}