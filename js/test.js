	$("#cdkey").bind('input propertychange',function(){
         	var user = $("#cdkey").val(); 
         	var Chinese = /^[\w\?%&=\-_]+$/;
         	if(user.length == ""){
         		$("#cdkey-text").text("兑换码不正确").css('color','#fe4a4a');
         		return false;
         	}else if(!Chinese.test(user)){
         		$("#cdkey-text").html("含有特殊字符").css('color','#fe4a4a');
         	}else{
         		$("#cdkey-text").html("输入正确").css('color','green');
				return false;
         	}
        })
	$("#PN").bind('input propertychange',function(){
         	var user = $("#PN").val();
         	var Chinese = /^[\w\?%&=\-_]+$/;
         	if(user.length == ""){
         		$("#PN-text").text("PSN不正确").css('color','#fe4a4a');
         		return false;
         	}else if(!Chinese.test(user)){
         		$("#PN-text").html("含有特殊字符").css('color','#fe4a4a');
         	}else{
         		$("#PN-text").html("输入正确").css('color','green');
				return false;
         	}
        })	
function isChinese(cdk){   
		var pattern =/^[\w\?%&=\-_]+$/;   
		return pattern.test(cdk);   
	}  
function formbth() {
	var str = '';
	$(".bth").attr("disabled",true);
	$('.bth').css({'background-color':'#ccc'});
	if($.trim($('#cdkey').val()).length == 0) {
			str += '不能为空\n';
			
	}else if(isChinese(($('#cdkey').val())) == false){
			str += '含特殊字符\n';
	}
	
	if($.trim($('#PN').val()).length == 0) {
			str += '不能为空\n';
	}else if(isChinese(($('#PN').val())) == false){
			str += '含特殊字符\n';
	}
	if(str != '') {
		  return false;
	} else {
		$(".bth").attr("disabled",false);
		$('.bth').css({'background-color':'#ce281b'});
	}
}
$('#PN').bind('input propertychange', function() {
	formbth();
});
$('#cdkey').bind('input propertychange', function() {
	formbth();
});
function formValidate(){
		postData();
	}
$('.button').on('click', function() {
	formValidate();
});
/*提交数据*/ 
function postData(url, data) {
	$.ajax({
		type: "POST",//方法类型
		dataType: "json",//预期服务器返回的数据类型
		url: "http://weixin-test-ziweigamepoch.c9users.io/api/codes/check",//url
		data: {
		"codeType":"2",
		"codeString":$('#cdkey').val()
		},
		success: function (result) {			
			if(result.isUsed == false){
				alert('兑换成功');
				var codeIdd = [];
				$.ajax({ //获取四个conde
				    type: "GET",
				    dataType: "json",
				    url: "http://weixin-test-ziweigamepoch.c9users.io/api/codes",//?isused=false
				    data: {},
				    success: function (result) {
//					console.log(result);
				        $(".form").css('display','none');
				        $('.title-no').css('display','block');
				        for(var i in result) { //&&result[i].isUsed==false
				            if(result[i].codeType==1){ 
//				            	console.log(result[i])
				            		 codeIdd.push( result[i]);				               
				            }
				        }
				        $('.title-no').html("<p>"+codeIdd[0].codeString+"</p>");
						$('.bth').css({'background-color':'#ccc'});
//				        console.log(codeId[0]);
						var codeIdo = "https://weixin-test-ziweigamepoch.c9users.io/api/codes/"+codeIdd[0]._id+"?_method=PATCH";
						console.log(codeIdo)
						$.ajax({
							url: codeIdo,
							method:'POST',
							data:{"isUsed":true},//false true
							success: function(data){
								console.log(data)
							},					
							error : function(err) {
								console.log(err);
							}
						});
				    },
				});
//				此处修改code参数
				var codeId = "https://weixin-test-ziweigamepoch.c9users.io/api/codes/"+result._id+"?_method=PATCH";
//				console.log(codeId)
				$.ajax({
					url: codeId,
					method:'POST',
					data:{"isUsed":true},//false true
					success: function(data){
//						console.log(data)
					},					
					error : function(err) {
//						console.log(err);
					}
				});
			}
		},
		error : function(err) {
			alert(err.responseText);
				}
		});
}