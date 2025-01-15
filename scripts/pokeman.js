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

    $("#player-img").attr("src", player.img);
    $("#computer-img").attr("src", computer.img);

    const playerAudio = new Audio(player.sound);
    playerAudio.play();

    const result = determineWinner(playerChoice, computerChoice);
    if (result === "win") wins++;
    if (result === "lose") losses++;

    $("#message").text(result === "draw" ? "It's a draw!" : result === "win" ? "You win!" : "You lose!");
    $("#score").text(`Wins: ${wins} | Losses: ${losses}`);
  });

  $("#replay").on("click", function () {
    $("#player-img, #computer-img").attr("src", "");
    $("#message").text("Choose a Pokémon to start the battle!");
    $("#score").text(`Wins: ${wins} | Losses: ${losses}`);
  });
});
