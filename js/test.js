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
         		$("#PN-text").text("PSN 不正确").css('color','#fe4a4a');
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
/*提交数据*/
//$(document).click(function(){
//	var a = parseInt(Math.random()*99999+1);
//	var b = parseInt(Math.random()*999+1);
//	console.log(a+b);
//	$.ajax({
//	url: 'https://weixin-test-ziweigamepoch.c9users.io/api/accounts/',
//	method:'POST',
//	dataType: "json",
//	data:{"unionid":'user'+a+b},//false true
//	success: function(data){
//	console.log(data)
//	},					
//	error : function(err) {
//	console.log(err);
//	}
//	});
//})
function ran(len) {
　　len = len || 32;
　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
　　var maxPos = $chars.length;
　　var pwd = '';
　　for (i = 0; i < len; i++) {
　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd;
}
var Zn = ran(1);
var Zn1 = ran(2);
var Zn2 = ran(1);
var a = parseInt(Math.random()*99+1);
var c = parseInt(Math.random()*99+1);
var user ="user"+a+Zn+Zn2+c+Zn1;
//console.log(user);
$('.button').on('click', function() {
	nameC();
	postData();
});
function nameC(){
	var w = parseInt(Math.random()*99+1);
	var e = parseInt(Math.random()*99+1);
	$.ajax({
		url: 'https://weixin-test-ziweigamepoch.c9users.io/api/accounts/',
		method:'GET',
		dataType: "json",
		data:{},//false true
		success: function(data){
//			console.log(data)
			for(var i in data) { 
				if(data[i].unionid == user){
					user = user+w+e;
//					console.log(user);
				}
			}
			
		},					
		error : function(err) {
			console.log(err);
		}
		});
}
function postData(url, data) {	
	var cdkk = $('#cdkey').val();		
	$.ajax({
		type: "POST",//方法类型
		dataType: "json",//预期服务器返回的数据类型
		url: "http://weixin-test-ziweigamepoch.c9users.io/api/codes/check",//url
		data: {
		"codeType":"0",
		"codeString":$('#cdkey').val()
		},
		success: function (result) {			
			if(result.isUsed == false){
//				alert('兑换成功');
				var codeIdd = [];
				$.ajax({ //获取值为1的conde
				    type: "GET",
				    dataType: "json",
				    url: "http://weixin-test-ziweigamepoch.c9users.io/api/codes",//?isused=false
				    data: {},
				    success: function (result) {
//					console.log(result);
				        $(".form").css('display','none');
				        $('.title-no').css('display','block');
				        for(var i in result) { //
				            if(result[i].codeType==1&&result[i].isUsed==false){ 
//				            	console.log(result[i])
				            		 codeIdd.push( result[i]);				               
				            }
				        }
				        $('.title-no').html("<p>"+codeIdd[0].codeString+"</p>");
						$('.bth').css('display','none');
						$('.ann-title').css('display','block'); 
//				        console.log(codeId[0]);
						var codeIdo = "https://weixin-test-ziweigamepoch.c9users.io/api/codes/"+codeIdd[0]._id+"?_method=PATCH";
//						console.log(codeIdo)
						$.ajax({
							url: codeIdo,
							method:'POST',
							data:{"isUsed":true},//false true
							success: function(data){
//								console.log(data)
							},					
							error : function(err) {
								console.log(err);
							}
						});
						$.ajax({
							url: 'https://weixin-test-ziweigamepoch.c9users.io/api/accounts/',
							method:'POST',
							dataType: "json",
							data:{
								"unionid":user,
								"code0":cdkk,
								"code1":codeIdd[0].codeString,
							},//false true
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