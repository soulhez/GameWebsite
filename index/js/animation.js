//左右滑动 => ||| | => || ||
function slideMove(node){
	node.style.display="flex";
	var div = node.children;
	for(var i=0; i<div.length; i++){
		div[i].className="newsModClose";
		//点击 小格子变大
		div[i].onclick=function(){
			for(var j=0; j<div.length; j++){
				div[j].className="newsModClose";
			}
			this.className="newsModActive";
		}
	}
}

function initAll(){
	
}