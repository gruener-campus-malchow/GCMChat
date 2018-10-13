document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('login_button').addEventListener('click', login)
})

function checkLoginName(name){
	// erlaubt sind: 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
	var search = /[^0-9,a-z,A-Z]/g;
	return name.match(search);
}
var username;
var token;
var loggedin = false;
var chatlog;

function posten(){
	var chatmsg = document.getElementById("eingabetext").value;
	console.log(chatmsg);
	//chat-msg erstellen & senden
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'https://sn0wman.pythonanywhere.com/api', true);
	//xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.onload = function () {
		if(this.status === 200){
			var resp = this.responseText;
			console.log(resp);
		}
	};
	//{"username": null, "text": null}
	//xhr.send("username="+username+"&text="+chatmsg);
	//{"username": username, "text": chatmsg};

	var data = new FormData();
	data.append("username", username);
	data.append("text", chatmsg);
	xhr.send(data);
}
function loadPage(nr){
	var msges = "";

	for(var i in chatlog){
		var text = chatlog[i]["text"];
		var username = chatlog[i]["username"];
		msges += "<div class='chatborder'>";
		msges += "<text> Von: "+username+" <br><br>"+text+"</text><br>";
		msges += "</div>";
	}

	document.getElementById("chatverlauf").innerHTML = msges;
}
function reloadChat(){
	let xhr = new XMLHttpRequest;
	
	xhr.open('GET', 'https://sn0wman.pythonanywhere.com/api', true);
	xhr.onload = function(){
		if(this.status === 200){
			chatlog = JSON.parse(this.responseText).reverse();
			loadPage(1);
		}
	}
	xhr.send();

}
function login(){
	let xhr = new XMLHttpRequest;
	username = document.getElementById("username").value;
	var checkedusername = checkLoginName(username);
	if(checkedusername == null){
		if(username.length <= 32){
			if(username.length >= 3){
				xhr.open('GET', 'https://sn0wman.pythonanywhere.com/api?username=' + username, true);
				xhr.onload = function(){
					if(this.status === 200){
						var liste = [{"status": "accept","token": "y54xdc54bhlk","seite": getSeite()}]; //JSON.parse(this.responseText);
						chatlog = JSON.parse(this.responseText).reverse();
						
						for(var i in liste){
							for(var x in liste[i]){
								if(x == "status"){
									var status = liste[i][x];
									if(status == "accept"){
										loggedin = true;
									}
								}
								if(loggedin){
									if(x == "token"){
										token = liste[i][x];
									}
									if(x == "seite"){
										document.body.innerHTML = liste[i][x];
									}
								}
							}
						}
						loadPage(1);
					}
				}
				xhr.send();
			}else{
				document.getElementById("p1").innerHTML = "Der Name ist zu kurz!<br> Er muss mind. 3 Zeichen lang sein!";	
			}
		}else{
			document.getElementById("p1").innerHTML = "Der Name ist zu lang!<br> Bitte entferne " + (username.length-32) + " Zeichen!";
		}
	}else{
		document.getElementById("p1").innerHTML = "Der Name ist nicht legal.<br>'" + checkedusername + "'";
	}
}


function getSeite(){
	return '<div class="topheader"><strong class="centered"><a class="nolink bigtext centered" href="http://freesoccerhdx.tk/"> Menü </a></strong><strong><div class="lowertxt right"> Eingeloggt als: '+username+' </div></strong></div><br> <br><div class="eingabefenster centered"><textarea class="inputtxt" type="text" id="eingabetext" placeholder="Text..."></textarea><button id="postebutton" class="postebutton" onclick="posten()"> Posten </button></div><br><button class="postebutton" onclick="reloadChat()"> Chat Neuladen</button><div id="chatverlauf" class="chatverlauf"></div>';
}