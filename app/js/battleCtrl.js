// Search controller that we use whenever we have a search inputs
// and search results
pokemonPlannerApp.controller('BattleCtrl', function ($scope,Pokemon,$firebaseObject) {
    // TODO in Lab 5: you will need to implement a method that searchers for dishes
    // including the case while the search is still running.
    
    var refMyPokemon = firebase.database().ref().child("players/" + Pokemon.getPlayer().toString() + "/chosenPokemon");
    $firebaseObject(refMyPokemon).$loaded().then(function() {
        $scope.myPokemon = $firebaseObject(refMyPokemon);
    });

    $scope.otherPlayer = Pokemon.getPlayer() == 1 ? 2:1;
    var refOpponentPokemon = firebase.database().ref().child("players/" + $scope.otherPlayer + "/chosenPokemon");
    $firebaseObject(refOpponentPokemon).$loaded().then(function() {
        $scope.opponentPokemon = $firebaseObject(refOpponentPokemon);
    });

    var refVictor = firebase.database().ref().child("settings/victor");
    $scope.victor = $firebaseObject(refVictor);

    var refTurn = firebase.database().ref().child("settings/turn");
    $scope.turn = $firebaseObject(refTurn);

    var refStatus = firebase.database().ref().child("settings/status");
    $scope.status = $firebaseObject(refStatus);


    $scope.playAttack = function() {
        var audio = new Audio('../audio/sound-reset.m4a');
        audio.play();
    };

    $scope.playGameOver = function() {
        var audio = new Audio('../audio/sound-gameover.m4a');
        audio.play();
    };

    $scope.playConfirm = function() {
        var audio = new Audio('../audio/sound-confirm.m4a');
        audio.play();
    };

    $scope.playTheme = function() {
        var audio = new Audio('../audio/sound-confirm.m4a');
        audio.play();
    };

    $scope.playerAttacks = function(move) {
        var dmg = Pokemon.getRandomInt(6-move.length/2,6+move.length/2);
        $scope.opponentPokemon.pokemon.hp -= dmg;
        $scope.status.desc = $scope.myPokemon.pokemon.name + " caused " + dmg + " damage on " + $scope.opponentPokemon.pokemon.name + "!";
        $scope.turn.player = $scope.otherPlayer;
        if ($scope.opponentPokemon.pokemon.hp <= 0) {
            $scope.opponentPokemon.pokemon.hp = 0;
            $scope.victor.player = Pokemon.getPlayer();
            $scope.victor.$save();
        }
        $scope.opponentPokemon.$save();
        $scope.status.$save();
        $scope.turn.$save();
    }

    $scope.checkTurn = function() {
        return $scope.turn.player != Pokemon.getPlayer();
    }

    $scope.printTurn = function() {
        if ($scope.turn.player != Pokemon.getPlayer()) {
            return "Opponent's";
        } else {
            return "Your";
        }
    }

    $scope.reset = function(abandonded) {
        if (abandonded == true) {
            alert("You abandoned the game :(");
            $scope.victor.player = $scope.otherPlayer;
            $scope.victor.$save();
        }
        $scope.turn.player = false;
        refOpponentPokemon.remove();
        refMyPokemon.remove();
        refStatus.remove();
        $scope.turn.$save();
    }

    $scope.getAttackDmg = function(dmg) {
        return ((6-dmg.length/2) + " - " + (6+dmg.length/2) + " dmg");
    }

    $scope.checkLoser = function(winner) {
        if (winner != 1 && winner != 2)
            return null;
        if ($scope.otherPlayer != winner)
            return $scope.otherPlayer;
        else
            return Pokemon.getPlayer();
    }

    $scope.checkFaintedPokemon = function(winner) {
        if (winner != 1 && winner != 2)
            return null;
        if ($scope.otherPlayer != winner)
            return $scope.opponentPokemon.pokemon.name;
        else
            return $scope.myPokemon.pokemon.name;
    }

    $scope.checkStatus = function() {
        if ($scope.opponentPokemon.pokemon != null)
            return ($scope.opponentPokemon.pokemon.hp);
        else
            return ("Waiting for player " + $scope.otherPlayer + "...");
    }


    function writeMatchHistory(playerNum, email, pokemon, opponentPokemon, healthLeft) {
        firebase.database().ref('users/' + userId ).set({
            as_player: playerNum,
            email: email,
            pokemon_used: pokemon,
            opponentPokemon: opponentPokemon,
            healthLeft: healthLeft
        });
    }

});