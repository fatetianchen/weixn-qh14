$.ajax({
		type: "GET",
		url: "https://weixin-test-ziweigamepoch.c9users.io/api/accounts/",
		dataType:'json', 
		data: {}, //请求的附加参数，用json对象
		success: function(data){
			console.log(data[0].unionid)
			$('.name').text(data[0].unionid)
			},
		});