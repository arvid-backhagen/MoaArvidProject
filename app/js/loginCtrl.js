pokemonPlannerApp.controller('LoginCtrl', function ($scope,Pokemon, $firebaseObject, $location) {

	var authFlag = false;
	firebase.auth().onAuthStateChanged(function(user) {

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
		firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password).catch(function(error) {
  			// Handle Errors here.
  			var errorCode = error.code;
  			var errorMessage = error.message;
  			console.log("logIn");
  			alert(errorMessage);
  			// ...
		});
		console.log("inga problem att logga in");
	};

	//create new user
	$scope.signUp = function() {
		firebase.auth().createUserWithEmailAndPassword($scope.email, $scope.password).catch(function(error) {
		  	// Handle Errors here.
		  	var errorCode = error.code;
		  	var errorMessage = error.message;
		  	console.log("signUp");
  			alert(errorMessage);
		  	// ...
		});
		console.log("lyckades signa upp");
		alert("Signed up! Now you can press the login button");
	};
});