pokemonPlannerApp.controller('LoginCtrl', function ($scope,Pokemon, $firebaseObject, $location) {

	var userDatabase = firebase.auth();

	//log in user
	$scope.login = function() {
		var email = $("#user").val();
		var pass = $("#passw").val();

		if (email != "" && pass != "") {
			var promise = userDatabase.signInWithEmailAndPassword(email, pass)
			var user = userDatabase.currentUser;
			console.log("current user: " + user)
			promise.catch(e => alert(e.message));
			
			userDatabase.onAuthStateChanged(function(firebaseUser) {
			
				if(firebaseUser == user) {
					$location.path( "/home" );
				}
				else {
					console.log("not logged in");
				}

			});

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