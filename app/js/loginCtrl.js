pokemonPlannerApp.controller('LoginCtrl', function ($scope, Pokemon, $firebaseObject, $location) {

	//log in user
	$scope.login = function() {
		firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password).then(function(user) {
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
				Pokemon.setUser(user);
				window.location = '#!/home';
				// Skapar en user i databasen som ännu inte har någon history:
				var refUser = firebase.database().ref().child("users/" + user.uid);
			    $scope.newUser = $firebaseObject(refUser);
			    $scope.newUser.email = user.email;
			    $scope.newUser.hasHistory = false;
			    $scope.newUser.$save();

				}).catch(function(error) {
					var errorMessage = error.message;
					console.log(error);
					alert(errorMessage);
				});
		}).catch(function(error) {
		  	// Handle Errors here.
		  	var errorCode = error.code;
		  	var errorMessage = error.message;
  			alert(errorMessage);
		  	// ...
		});
	};
});