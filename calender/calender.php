<?php
if($_POST["type"]=="read"){
	// 读取数据并返回
	$fileName = "calender/".$_POST["fileName"].".json";
	if(file_exists($fileName)){
		if(filesize($fileName)>0){	//文件长度
			$fileHandle = fopen($fileName,"r");
			$fileContent = fread($fileHandle, filesize($fileName));
			fclose($fileHandle);
			echo $fileContent;
		}
	}
	else
		echo "{}";//文件不符合,返回空json串
}
else{
	// 进行JSON存储
	$fileName = "calender/".$_POST["fileName"].".json";
	$fileHandle = fopen($fileName,"w");
	fwrite($fileHandle, $_POST["content"]);
	fclose($fileHandle);
}

?>