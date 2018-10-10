document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('login_button').addEventListener('click', login)
})

function checkLoginName(name){
	// erlaubt sind: 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
	var search = /[^0-9,a-z,A-Z]/g;
	return name.match(search);
}
var username;

function login(){
	let xhr = new XMLHttpRequest;
	username = document.getElementById("username").value;
	var checkedusername = checkLoginName(username);
	if(checkedusername == null){
		xhr.open('GET', 'https://sn0wman.pythonanywhere.com/api?username=' + username, true);
		xhr.onload = function(){
			if(this.status === 200){
				var liste = [{"status": "accept"}]; //JSON.parse(this.responseText);
				for(var i in liste){
					console.log(liste[i])
					for(var x in liste[i]){
						if(x == "status"){ //sollte unterschiedliche sachen ergeben; zB falsches PW, Username exestiert nicht, sonstiges
							var status = liste[i][x];
							document.body.innerHTML = status; 
							// evlt. die Chat-Seite in Js einbringen und hier laden, so bleibt der token erhalten 
							
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