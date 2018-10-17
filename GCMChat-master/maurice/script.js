var username = "abc";

function posten(){
	var chatmsg = document.getElementById("chat-input").value;
	if((chatmsg+"").replace(/[\r\n]/g, '').replace(" ","").length > 0){
		//chat-msg erstellen & senden
		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'https://sn0wman.pythonanywhere.com/api', true);
		xhr.onload = function () {
			if(this.status === 200){
				var resp = this.responseText;
				console.log(resp);
				reloadChat();
			}
		};
		//{"username": null, "text": null}
		//xhr.send("username="+username+"&text="+chatmsg);
		//{"username": username, "text": chatmsg};

		var data = new FormData();
		data.append("username", username);
		data.append("text", chatmsg);
		xhr.send(data);
		document.getElementById("chat-input").value = "";
		
	}else{
		document.getElementById("chat-input").value = "";
		document.getElementById("chat-input").placeholder = "Um Spam zu vermeiden, musst du mehr als 5 sinnvolle Zeichen verwenden!";
		setInterval(function(){ 
			document.getElementById("chat-input").placeholder = "Text...";
		}, 1000*5);
	}
}
