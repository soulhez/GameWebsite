<?php  
if(MD5($_POST["passwd"])==MD5("1C5q0L8")){
	$fileName = "passwd";
	if(file_exists($fileName)){
		$fileHandle = fopen($fileName, "r");
		$fileContent = fread($fileHandle, filesize($fileName));
		echo $fileContent;
	}
	else
		echo "未储存过密码";
}
else
	echo "输入错误,重新输入!";
?>
