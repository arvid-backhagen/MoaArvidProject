pokemonPlannerApp.controller('LoginCtrl', function ($scope, Pokemon, $firebaseObject, $location) {


	//log in user
	$scope.login = function() {
		firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password).then(function(user) {
			console.log("inga problem att logga in");
			Pokemon.setUser(user);
			window.location = '#!/home';

			}).catch(function(error) {
				var errorMessage = error.message;
				console.log(error);
				alert(errorMessage);
			});
	}

	//create new user
	$scope.signUp = function() {
		firebase.auth().createUserWithEmailAndPassword($scope.email, $scope.password).then(function(user) {
			firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password).then(function(user) {
				console.log("loggat in efter signup");
				Pokemon.setUser(user);
				window.location = '#!/home';

				}).catch(function(error) {
					var errorMessage = error.message;
					console.log(error);
					alert(errorMessage);
				});
		}).catch(function(error) {
		  	// Handle Errors here.
		  	var errorCode = error.code;
		  	var errorMessage = error.message;
		  	console.log("signUp");
  			alert(errorMessage);
		  	// ...
		});
	};
});