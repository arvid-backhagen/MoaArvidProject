pokemonPlannerApp.controller('HistoryCtrl', function ($scope,Pokemon,$firebaseObject) {

	//hämta variabler från firebase
	$scope.playerNum;
	$scope.email;
	$scope.pokemon;
	$scope.opponentPokemon;
	$scope.healthLeft;
	$scope.hasHistory;

	$scope.checkWinner = function() {
	//Kolla vilken pokemon som vann
		if ($scope.pokemon == "winner" && $scope.opponentPokemon == "loser") {
			return true;
		}
		else {
			return false;
		}
	}


});