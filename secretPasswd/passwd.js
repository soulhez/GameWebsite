let passwdData;	//密码文本
// 密码验证
$("#text").on("input",function(){
	handleVal();
});
// 焦点获取
$(".activeF").on("click",function(){
	$("#text").focus();
});
// 搜索密码
$("#display>input").on("input", function(){
	handleReturn(passwdData);
});
// 展开显示密码
$("#display>ul").on("click" ,function(e){
	let li = e.target;
	if(li.tagName=="UL")
		return ;
	$("#display>ul>li").attr("class","notOpen");
	$("#display>ul").attr("class","");
	$(li).attr("class","open");
})
function handleVal(){
	let code = $("#text").val();
	let spans = $("#container>div>span");
	code = code.split("");
	if(code.length>7){
		alert("输入错误,重新输入!");
		location.reload();
	}
	for(i in code){
		spans[i].innerHTML=code[i];
	}
	if(code.length==7){
		$.ajax({
			type : "POST",
			url : "passwd.php",
			data : {
				"passwd" : code.join("")
			}
		}).success(function(data){
			if(data=="输入错误,重新输入!"){
					alert("输入错误,重新输入!");
					location.reload();
			}
			else{
				$("#display").attr("class","activeF");
				$("#container").attr("class","close");
				passwdData = data;
			}
		});
	}
}

function handleReturn(returnData){
	let data = returnData.split("\n");
	for(let i in data)
		data[i] = data[i].split(" ");
	let keywords = $("#display>input").val(),result = "";
	for(let i in data){
		if(data[i][0].indexOf(keywords)!="-1")
			result+=`<li class="notOpen">${data[i][0]}<br>${data[i][1]}</li>`;
	}
	if(keywords!="")
		$("#display>ul").html(result);
	else
		$("#display>ul").html("");
}