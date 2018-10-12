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


function posten(){
	var chatmsg = document.getElementById("eingabetext").value;
	console.log(chatmsg);
	//chat-msg erstellen
}
function login(){
	let xhr = new XMLHttpRequest;
	username = document.getElementById("username").value;
	var checkedusername = checkLoginName(username);
	if(checkedusername == null){
		xhr.open('GET', 'https://sn0wman.pythonanywhere.com/api?username=' + username, true);
		xhr.onload = function(){
			if(this.status === 200){
				var liste = [{"status": "accept","token": "y54xdc54bhlk","seite": getSeite()}]; //JSON.parse(this.responseText);
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
			}
		}
		xhr.send();
	}else{
		document.getElementById("p1").innerHTML = "Der name ist nicht legal.<br>'" + checkedusername + "'";
	}
}


function getSeite(){
	return '<div class="topheader"><!--hier steht "Menü"  *Der Nutzername*--><strong class="centered"><a class="nolink bigtext centered" href="http://freesoccerhdx.tk/"> Menü </a></strong><strong><div class="lowertxt right"> Eingeloggt als: Lunsher2000 </div></strong></div><br> <br><div class="eingabefenster centered"><textarea class="inputtxt" type="text" id="eingabetext" placeholder="Text..."></textarea><button id="postebutton" class="postebutton" onclick="posten()"> Posten </button></div><br><div class="chatverlauf"></div>';
}