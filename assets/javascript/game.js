$(document).ready(function() {
    var player;
    var enemies = [];
    var enemy;
    var turnCounter = 1;
    var killCount = 0;
    var characters = {
        "Birdman": {
            name: "Birdman",
            health: 120,
            attackPower: 8,
            counterAttackPower: 15,
            imageUrl: "./assets/images/birdman.jpg"
        },
        "Rick Sanchez": {
            name: "Rick Sanchez",
            health: 100,
            attackPower: 14,
            counterAttackPower: 5,
            imageUrl: "./assets/images/rick.jpg"
        },
        "Mytholog Beth": {
            name: "Mytholog Beth",
            health: 150,
            attackPower: 8,
            counterAttackPower: 20,
            imageUrl: "./assets/images/bethclone.jpg"
        },
        "Evil Morty" : {
            name: "Evil Morty",
            health: 180,
            attackPower: 7,
            counterAttackPower: 25,
            imageUrl: "./assets/images/evilmorty.jpg"
        }
    };

    initializeGame();

    $("#characters").on("click", ".character", function() {
        //saving characters name
        var name = $(this).attr("data-name");
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
    });

    $("#enemyCharacters").on("click", ".character", function() {
        var name = $(this).attr("data-name");
        if ($("#enemy").children().length === 0); //if no enemy
        enemy = characters[name];
        setPlayer(enemy, "#enemy");
        $(this).remove();
        clearResults();
    });

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

    function clearResults() {
        var results = $("#results");
        results.text("");
    };
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