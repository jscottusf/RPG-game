$(document).ready(function() {
    let rickSound = document.createElement("audio");
    rickSound.setAttribute("src", "assets/sounds/wubba.wav");
    let birdmanSound = document.createElement("audio");
    birdmanSound.setAttribute("src", "assets/sounds/birdman.wav");
    let evilMortySound = document.createElement("audio");
    evilMortySound.setAttribute("src", "assets/sounds/oh_man.wav");
    let bethSound = document.createElement("audio");
    bethSound.setAttribute("src", "assets/sounds/myman.wav");
    let startSound = document.createElement("audio");
    startSound.setAttribute("src", "assets/sounds/showme.wav");
    let winSound = document.createElement("audio");
    winSound.setAttribute("src", "assets/sounds/like.wav");
    let killSound = document.createElement("audio");
    killSound.setAttribute("src", "assets/sounds/goodjob.wav");
    let attackSound = document.createElement("audio");
    attackSound.setAttribute("src", "assets/sounds/shot.wav");
    let player;
    let enemies = [];
    let enemy;
    let turnCounter = 1;
    let killCount = 0;
    const characters = {
        "Birdman": {
            name: "Birdman",
            health: 120,
            attackPower: 8,
            counterAttackPower: 15,
            imageUrl: "./assets/images/birdman.jpg",
            sound: birdmanSound
        },
        "Rick Sanchez": {
            name: "Rick Sanchez",
            health: 100,
            attackPower: 14,
            counterAttackPower: 5,
            imageUrl: "./assets/images/rick.jpg",
            sound: rickSound
        },
        "Mytholog Beth": {
            name: "Mytholog Beth",
            health: 150,
            attackPower: 8,
            counterAttackPower: 20,
            imageUrl: "./assets/images/bethclone.jpg",
            sound: bethSound
        },
        "Evil Morty" : {
            name: "Evil Morty",
            health: 180,
            attackPower: 7,
            counterAttackPower: 25,
            imageUrl: "./assets/images/evilmorty.jpg",
            sound: evilMortySound
        }
    };

    //audioElement.play(); //audioElement.pause();
    
    

    // This block of code builds the character card, and renders it to the page.
    function renderCharacter(character, renderArea) {
        var charDiv = $("<div class='character' data-name='" + character.name + "'>");
        var charName = $("<div class='character-name'>").text(character.name);
        var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
        var charHealth = $("<div class='character-health'>").text(character.health);
        charDiv.append(charName).append(charImage).append(charHealth);
        $(renderArea).append(charDiv);
      };
    
    // this function will load all the characters into the character section to be selected
    // Loop through the characters object and call the renderCharacter function on each character to render their card.
    function initializeGame() {
    for (var key in characters) {
        renderCharacter(characters[key], "#characters");
    }
    };

    function setPlayer(char, location) {
        $(location).empty();
        renderCharacter(char, location);
    };

    function setEnemies(enemyArr) {
        for (var i = 0; i < enemyArr.length; i++) {
          renderCharacter(enemyArr[i], "#enemyCharacters");
        }
      };

    function setMessage(message) {
        let gameMessageSet = $("#results");
        let newMessage = $("<div>").text(message);
        gameMessageSet.append(newMessage);
    };

    function restartGame(resultMessage) {
        // When the 'Restart' button is clicked, reload the page.
        let restart = $("<button class='btn btn-primary btn-lg restart' value='restart'>Restart Game</button>").click(function() {
          location.reload();
        });
    
        // Build div that will display the victory/defeat message.
        let gameState = $("<div>").text(resultMessage);
    
        // Render the restart button and victory/defeat message to the page.
        $(".game-container").append(gameState);
        $(".game-container").append(restart);
      };

    function clearResults() {
        let results = $("#results");
        results.text("");
    };

    initializeGame();
    //startSound.play();

    $("#characters").on("click", ".character", function() {
        //saving characters name
        let name = $(this).attr("data-name");
        //if no player chosen, add player on click
        if (!player) {
            player = characters[name];
        }
        //place the rest into the enemies array
        for (var key in characters) {
            if (key !== name) {
                enemies.push(characters[key]);
            }
        }
        //hide character selction after click
        //render player into player div
        $("#characters").hide();
        setPlayer(player, "#playerCharacter");
        setEnemies(enemies);
        player.sound.play();
    });

    $("#enemyCharacters").on("click", ".character", function() {
        let name = $(this).attr("data-name");
        //if no defender, clicked becomes the defender, remove from enemy div
        if ($("#enemy").children().length === 0){
            enemy = characters[name];
            setPlayer(enemy, "#enemy");
            $(this).remove();
            clearResults();  
            enemy.sound.play();
        }
        
    });

    $("#attack").on("click", function() {
        if($("#enemy").children().length !== 0) {
            attackSound.play();
            let attackMessage = "You attacked " + enemy.name + "for " + enemy.attackPower * turnCounter + " damage.";
            let counterAttackMessage = enemy.name + " attacked you for " + enemy.counterAttackPower + " damage";
            clearResults();
            enemy.health -= player.attackPower * turnCounter;
            if (enemy.health > 0) {
                setPlayer(enemy, "#enemy");
                setMessage(attackMessage);
                setMessage(counterAttackMessage);
                player.health -= enemy.counterAttackPower;
                setPlayer(player, "#playerCharacter")
                if (player.health <= 0) {
                    clearResults();
                    restartGame("You have been defeated. GAME OVER.");
                    $("#attack").off("click");
                }
            }
            else {
                killSound.play();
                $("#enemy").empty();
                let gameStateMessage = "You have defeated " + enemy.name + ", you can choose to fight another enemy."
                setMessage(gameStateMessage);
                killCount++
                if (killCount >= enemies.length) {
                    winSound.play();
                    killSound.pause();
                    clearResults();
                    $("attack").off("click");
                    restartGame("You Won!!!! GAME OVER!!!");
                }
            }
            turnCounter++;
        }
        else {
            clearResults();
            setMessage("No enemy here");
        }
    });

    // var character;
    // var charContainer;
    // var characterChoices = ["rick0", "rick1", "rick2", "rick3"];
  
    //This was my first attempt to loop through everything using a character array with a character object
    // for (var i = 0; i < characterChoices.length; i++) {
        // charContainer = $("div")
        // charContainer.addClass("character-div");
        // charContainer.attr("id", characterChoices[i]);
        // charContainer.attr("data-health", chartacterAttributes[characterChoices[i]].health);
        // charContainer.attr("data-attackPower", chartacterAttributes[characterChoices[i]].attackPower);
        // charContainer.attr("data-counterAttackPower", chartacterAttributes[characterChoices[i]].counterAttackPower);
        // $("#characters").append(charContainer);
        // character = $("<img>");
        // character.addClass("character-image");
        // character.attr("src", "./assets/images/rick.jpg");
        // character.attr("id", characterChoices[i]);
        // character.attr("data-health", chartacterAttributes[characterChoices[i]].health);
        // character.attr("data-attackPower", chartacterAttributes[characterChoices[i]].attackPower);
        // character.attr("data-counterAttackPower", chartacterAttributes[characterChoices[i]].counterAttackPower);
        // character.text(chartacterAttributes[characterChoices[i]].name);
        // $("#characters").append(character);
    //     $("#characters").append(chartacterAttributes[characterChoices[i]].name);
    //     $("#characters").append(chartacterAttributes[characterChoices[i]].health);
    //}
});