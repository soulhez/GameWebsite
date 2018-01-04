let currentDate = dateH(new Date());
let saveDate;
let splitSymbol="^*^";
let jsonObj={};


function dateH(date){
	let year = date.getFullYear();	// 年份
	let month = date.getMonth()+1;	// 真实月份
	let day = date.getDate();				// 日期
	return [year,month,day];
}

// 绘制日历
function handleDate(){	
	let runNian = false;	// 判断闰年
	if(currentDate[0]%4==0 && currentDate[0]%100!=0 || currentDate[0]%400==0){
		runNian = true;
	}
	// 匹配月份
	if(currentDate[1].toString().search(/\b4|6|9|(11)\b/)!='-1')
		$("#calender li:nth-child(31)").hide();
	else if(currentDate[1]==2){
		if(runNian)
			$("#calender li:nth-child(30),#calender li:nth-child(31)").hide();
		else
			$("#calender li:nth-child(29),#calender li:nth-child(30),#calender li:nth-child(31)").hide();
	}
	handleJSON(currentDate[0], "read");

}
// 打开dialog并进行添加准备
function readyToAdd(s){	
	$("dialog,.cover").hide();	
	let e = s.target;
	if(e.innerHTML.match(/列|表|模|式|日|历/))
		return;
	let year = currentDate[0];
	let month = currentDate[1].toString();
	let day = e.innerHTML;
	month.length>1?month:month=0+month;
	day.length>1?day=day:day=0+day;

	saveDate = `${year}-${month}-${day}`;
	let content = localStorage.getItem(saveDate);

	if(content!=null){
		content = content.split(splitSymbol).join("</li><li>");
		content = `<li>${content}</li>`;
		$("#dialog > ul").html(content);
	}
	else
		$("#dialog > ul").html("无");

	$("#dialog > span:nth-child(1)").html(saveDate);
	$("#dialog, .cover").show();	
}
// 添加新事件
function addNew(){
	let content1 = localStorage.getItem(saveDate);
	let content2 = $("input[type=text]").val();
	if(content2==""){
		alert("添加时内容不能为空.");
		return;
	}
	let maincontent;	// 最终储存的信息
	if(content1!=null){
		maincontent=`${content1}^*^${content2}`;
		localStorage.setItem(saveDate,maincontent);
	}
	else{
		maincontent = `${content2}`;
		localStorage.setItem(saveDate,maincontent);
	}
	// 同步数据
	if($(".container > span").hasClass("active"))
		$(".container > span").removeClass("active").addClass("ing");

	handleJSON(currentDate[0] , "write");

	$("input[type=text]").val(null);
	$("#dialog, .cover").hide();
}

// 处理json 进行传输
function handleJSON(year, init){
	if(arguments[1]=="read"){
		// 从服务器提取数据,验证同步
		$.ajax({
			type : "POST",
			data : {
				"type" : "read",
				"fileName" : arguments[0]
			},
			url : "calender.php"
		}).error(function(){
			$(e).removeClass("active");
		}).success(function(data){
			let content = JSON.parse(data);
			if(content){
				jsonObj = content;
				// 将内容绑定到 localStorage 上
				for( let i in jsonObj)
					localStorage.setItem(i,jsonObj[i]);
			}
		});
	}
	else{
		let finalContent={};
		for(i in localStorage)
			finalContent[i]=localStorage[i]
		// 添加新的事件
		$.ajax({
				type: "POST",
				data: {
					"type" : "write",
					"content" : JSON.stringify(finalContent),
					"fileName" : arguments[0]
				},	
				url: "calender.php"
			}).success(function(data){
				$(".container > span").addClass("active").removeClass("ing");
			}).error(function(data){
				console.log("write Error.")
			});
	}
}




// dialog,背景遮罩 打开关闭
function dialogOC(){
	if($("#dialog, .cover").is(":hidden"))
		$("#dialog, .cover").show();
	else
		$("#dialog, .cover").hide();
}
// 切换两种模式
function changeType(){
	if(localStorage.length<1){
			alert("没有记录过事件,点击日期进行添加");
			return;
	}
	if($("button").data("type")=="calender"){
		$("#calender").css("display","none");
		$("#lists").css("display","flex");
		let content,endcontent="";

		for(i in localStorage){
			content = localStorage[i].split(splitSymbol).join("</span><span>X</span></li><li><span>");
			endcontent+=`<div><p>${i}</p><ul><li><span>${content}</span><span>X</span></li></ul></div>`;
		}
		$("#lists").html(endcontent);
		$("button").data("type","lists");
	}
	else{
		$("#lists").css("display","none");
		$("#calender").css("display","flex");
		$("button").data("type","calender");

	}
}
// 同步数据
function synKey(e){
	e = e.target;
	if($(e).hasClass("active"))
		$(e).removeClass("active");
	else
		$(e).addClass("active");
}

// 列表内容放大展示
