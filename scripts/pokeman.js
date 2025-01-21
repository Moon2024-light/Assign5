$(document).ready(function () {
  const pokemons = {
    grass: { name: "Venusaur", type: "Grass", img: "images/grass1.jpg", sound: "sounds/venusaur.mp3" },
    fire: { name: "Charizard", type: "Fire", img: "images/fire.jpg", sound: "sounds/charizard.mp3" },
    water: { name: "Vaporeon", type: "Water", img: "images/water.jpg", sound: "sounds/vaporeon.mp3" },
  };

  const types = ["grass", "fire", "water"];
  let wins = 0;
  let losses = 0;

  const backgroundMusic = $("#background-sound")[0];
  let hasPlayedBackgroundMusic = false;

  // Define the default image for unselected Pokémon
  const defaultImage = "images/pngimg.com - pokeball_PNG7.png";
  $("#player-img, #computer-img").attr("src", defaultImage);

  $("#start").on("click", function () {
    if (!hasPlayedBackgroundMusic) {
      backgroundMusic.play().catch(console.error);
      hasPlayedBackgroundMusic = true;
    }
  });

  function getRandomType() {
    return types[Math.floor(Math.random() * types.length)];
  }

  function determineWinner(playerType, computerType) {
    const rules = { grass: "water", fire: "grass", water: "fire" };
    if (playerType === computerType) return "draw";
    return rules[playerType] === computerType ? "win" : "lose";
  }

  $(".choice").on("click", function () {
    const playerChoice = $(this).data("type");
    const computerChoice = getRandomType();

    const player = pokemons[playerChoice];
    const computer = pokemons[computerChoice];

     // Update images and text for player and computer Pokémon
    $("#player-img").attr("src", player.img);
    $("#computer-img").attr("src", computer.img);
    $("#player-name").text(`${player.name} (${player.type})`);
    $("#computer-name").text(`${computer.name} (${computer.type})`);

    // Play player Pokémon's sound

    const playerAudio = new Audio(player.sound);
    playerAudio.play();

    // Determine the result and update the score
    const result = determineWinner(playerChoice, computerChoice);
    if (result === "win") wins++;
    if (result === "lose") losses++;

    $("#message").text(result === "draw" ? "It's a draw!" : result === "win" ? "You win!" : "You lose!");
    $("#score").text(`Wins: ${wins} | Losses: ${losses}`);
  });

  $("#replay").on("click", function () {
    $("#player-img").attr("src", defaultImage);
    $("#computer-img").attr("src", defaultImage);
    $("#message").text("Choose a Pokémon to start the battle!");
  });
});
