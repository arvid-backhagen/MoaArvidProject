pokemonPlannerApp.controller('LoginCtrl', function ($scope,Pokemon, $firebaseObject, $location) {

	var userDatabase = firebase.auth();

	var authFlag = false;
	userDatabase.onAuthStateChanged(function(user) {

		if(authFlag == false){
			authFlag = true;
		}
		else{
			if(user != null) {
				console.log("if(user) gick igenom")
				Pokemon.setUser(user);
				$location.path( "/home" );
			}
			else {
				console.log("not logged in");
			}
		}
	});
	//log in user
	$scope.login = function() {
		var email = $("#user").val();
		var pass = $("#passw").val();

		if (email != "" && pass != "") {
			var promise = userDatabase.signInWithEmailAndPassword(email, pass)
			promise.catch(e => alert(e.message));
		}

		else {
			alert("Must enter email and password");
		}
		

	};

	//create new user
	$scope.signUp = function() {
		var email = $("#user").val();
		var pass = $("#passw").val();

		if (email != "" && pass != "") {
			alert("Signed up, now you can log in!");
		}

		var promise = userDatabase.createUserWithEmailAndPassword(email, pass);
		promise.catch(e => alert(e.message));

		
	};

	


	

});