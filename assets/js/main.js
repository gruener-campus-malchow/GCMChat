document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('login_button').addEventListener('click', login)
})



function login(){
	let xhr = new XMLHttpRequest;

	xhr.open('GET', 'https://sn0wman.pythonanywhere.com/api', true);
	xhr.onload = function(){
		if(this.status === 200){
			var liste = JSON.parse(this.responseText);
			for(var i in liste){
				console.log(liste[i]);
				document.getElementById("p1").innerHTML += liste[i] + "<br>";
			}
        }
	}
    xhr.send();
}