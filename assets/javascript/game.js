$(document).ready(function() {
    var character;
    var charContainer;
    var characterChoices = ["rick0", "rick1", "rick2", "rick3"];
    var chartacterAttributes = {
            rick0 : {
                name : "Rick 0",
                health : 120,
                attackPower : 8,
                counterAttackPower : 8
            },
            rick1 : {
                name : "Rick 1",
                health : 100,
                attackPower : 5,
                counterAttackPower : 5
            },
            rick2 : {
                name : "Rick 2",
                health : 150,
                attackPower : 20,
                counterAttackPower : 20
            },
            rick3 : {
                name : "Rick 3",
                health : 180,
                attackPower : 25,
                counterAttackPower : 25
            }
        };

    // for (var i = 0; i < characterChoices.length; i++) {
    //     charContainer = $("div");
    //     charContainer.addClass();
    //     $("#characters").append(charContainer);
    // };
    for (var i = 0; i < characterChoices.length; i++) {
        // charContainer = $("div")
        // charContainer.addClass("character-div");
        // charContainer.attr("id", characterChoices[i]);
        // charContainer.attr("data-health", chartacterAttributes[characterChoices[i]].health);
        // charContainer.attr("data-attackPower", chartacterAttributes[characterChoices[i]].attackPower);
        // charContainer.attr("data-counterAttackPower", chartacterAttributes[characterChoices[i]].counterAttackPower);
        // $("#characters").append(charContainer);
        character = $("<img>");
        character.addClass("character-image");
        character.attr("src", "./assets/images/rick.jpg");
        character.attr("id", characterChoices[i]);
        character.attr("data-health", chartacterAttributes[characterChoices[i]].health);
        character.attr("data-attackPower", chartacterAttributes[characterChoices[i]].attackPower);
        character.attr("data-counterAttackPower", chartacterAttributes[characterChoices[i]].counterAttackPower);
        character.text(chartacterAttributes[characterChoices[i]].name);
        $("#characters").append(character);
    //     //$("#characters").append(chartacterAttributes[characterChoices[i]].name);
    //     //$("#characters").append(chartacterAttributes[characterChoices[i]].health);
    }
});