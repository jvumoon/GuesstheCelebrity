const celebrities = [
  { name: "Doechii", image: "images/doechii.jpg", hint: "Florida-born and genre-fluid, she declared herself “That Girl” and made TDE even bolder." },
  //  Bron foto: https://www.elle.com/beauty/hair/a63658022/doechii-cornrows-hairstylist-beauty-interview-2025-grammys/ 
  { name: "Asake", image: "images/Asake.jpg", hint: "This Nigerian star blends Fuji, amapiano, and afrobeats." },
  // Bron foto: https://www.meeteverydaypeople.com.ng/2024/03/meet-asake-meteoric-rise-of-nigerian.html
  { name: "Beyonce", image: "images/beyonce.jpg", hint: "She started in a girl group, became music royalty." },
  // Bron foto: https://nl.pinterest.com/pin/1829656093822152/
  { name: "Ayra Starr", image: "images/ayrastarr.jpg", hint: "She went global in 2022 when her hit song 'Rush' blew up." },
  // Bron foto:https://nl.pinterest.com/pin/15129348743583857/
  { name: "Childish Gambino", image: "images/childishgambino.jpg", hint: "This multi-talented artist once dropped bars and Emmy-winning scripts under two different names." },
  // Bron foto: https://lagoblublog.blogspot.com/2018/05/donald-glover-indossa-bottega-veneta.html
  { name: "Denzel Curry", image: "images/denzelcurry.jpg", hint: "He was part of the Raider Klan collective and broke out with his track Ultimate." },
  // Bron foto: https://nl.pinterest.com/pin/356488126774709981/
  { name: "Future", image: "images/future.jpg", hint: "Known for popularizing melodic trap and the phrase “Dirty Sprite." },
  // Bron foto: https://nl.pinterest.com/pin/140806231246057/
  { name: "Glorilla", image: "images/glorilla.jpg", hint: "Memphis-born, she took over the summer with a chant for freedom and female friendships." },
  // Bron foto:https://nl.pinterest.com/pin/829999406364073550/
  { name: "JT", image: "images/JT.jpg", hint: "One half of a duo known for Miami swagger and “Act Up” energy." },
  // Bron foto: https://nl.pinterest.com/pin/183029172350711027/
  { name: "Kaytranada", image: "images/kaytranada.jpg", hint: "Beatmaker from Montreal whose grooves blend house, hip-hop, and Haitian rhythm." },
  // Bron foto: https://nl.pinterest.com/pin/227572587413188240/
  { name: "Latto", image: "images/latto.jpg", hint: "She spun childhood TV competition wins into chart-topping confidence and big energy." },
  // Bron foto: https://nl.pinterest.com/pin/65513369575331554/
  { name: "Liluzivert", image: "images/liluzivert.jpg", hint: "Pierced the rap scene with outer-space vibes, a diamond in the forehead." },
  // Bron foto: https://nl.pinterest.com/pin/714313190935088467/
  { name: "Little Simz", image: "images/littlesimz.jpg", hint: "A British rapper and actress, praised for her lyricism and featured in the Netflix series Top Boy." },
  // Bron foto: https://nl.pinterest.com/pin/7459155628488700/
  { name: "Megan Thee Stallion", image: "images/megants.jpg", hint: "Tall, Texan, and trademarked the summer of 2019." },
  // Bron foto: https://nl.pinterest.com/pin/6755468185605269/
  { name: "Playboy Carti", image: "images/playboycarti.jpg", hint: "Known for adlibs and an elusive style." },
  // Bron foto: https://nl.pinterest.com/pin/211174977273729/
  { name: "Rema", image: "images/rema.jpg", hint: "This Benin-born trailblazer brought “Afrorave” to the world, landed on the Black Panther soundtrack, and sold out stadiums before his 25th birthday." },
  // Bron foto: https://nl.pinterest.com/pin/381117187237192224/
  { name: "Sexyy Red", image: "images/sexyyred.jpg", hint: "St. Louis rapper who went viral with a colorful hit about where she’s from." },
  // Bron foto: https://nl.pinterest.com/pin/21462535720645252/
  { name: "SZA", image: "images/sza.jpg", hint: "Her album SOS broke records and she’s known for her ethereal sound and honest lyrics." },
  // Bron foto: https://nl.pinterest.com/pin/100416266686419762/
  { name: "Tems", image: "images/tems.jpg", hint: "Lagos-born, self-made, and known for her soulful sound and quiet power." },
  // Bron foto: https://nataal.com/tems
  { name: "The Weeknd", image: "images/theweeknd.jpg", hint: "Toronto voice who turned SoundCloud drops into stadium tours." }
  // Bron foto: https://nl.pinterest.com/pin/492649948910598/
];

let selectedCelebrities = [0, 10];
let current = 0;
let score = 0;
let attempts = 0;
let turnsLeft = 10;
let playerName = "";
const leaderboard = [];

const correctAudio = new Audio("sounds/correct_buzzer.mp3");
const wrongAudio = new Audio("sounds/incorrect.mp3");
const hintVoice = new SpeechSynthesisUtterance("Don't worry, I will give you a hint.");

function startGame() {
  playerName = document.getElementById("player-name").value.trim();
  if (!playerName) {
    alert("Vul je naam in om te starten.");
    return;
  }
  document.getElementById("display-name").textContent = playerName;
  document.getElementById("game-section").classList.remove("hidden");
  document.getElementById("player-name").disabled = true;
  current = 0;
  updateCelebrity();
}

function hideStartImage() {
  playerName = document.getElementById("player-name").value.trim();
  if (!playerName) {
    alert("Vul je naam in om te starten.");
    return;
  }
  document.getElementById("startImage").style.display = "none";
  document.getElementById("nameEntry").style.display = "none";
}


function updateCelebrity() {
  const celeb = celebrities[current];
  const image = document.getElementById("celebrity-img");
  image.src = celeb.image;
  image.style.clipPath = "";
  image.classList.remove("partial");
  void image.offsetWidth;
  image.classList.add("partial");

  document.getElementById("guess-input").value = "";
  document.getElementById("result").textContent = "";
  document.getElementById("hint").textContent = "";
  document.getElementById("turns").textContent = turnsLeft;
  document.getElementById("score").textContent = score;
  attempts = 0;
  document.getElementById("game-over").style.display = "none";
}

function checkGuess() {
  if (turnsLeft <= 0) return;

  const input = document.getElementById("guess-input").value.toLowerCase();
  const result = document.getElementById("result");
  const hintText = document.getElementById("hint");
  const correctName = celebrities[current].name;

  attempts++;

  if (input.toLowerCase() === correctName.toLowerCase()) {
    score += (attempts === 1) ? 5 : 2;
    result.textContent = "Correct!";
    result.className = "correct";
    turnsLeft--;
    showFullImage();
    correctAudio.play();
  } else {
    if (attempts === 1) {
      result.textContent = "Wrong! Hint:";
      result.className = "wrong";
      hintText.textContent = celebrities[current].hint;
      wrongAudio.play();
      speechSynthesis.speak(hintVoice);
    } else {
      result.textContent = `Wrong again. The correct answer was: ${correctName}.`;
      result.className = "wrong";
      turnsLeft--;
    }
  }

  document.getElementById("turns").textContent = turnsLeft;
  document.getElementById("score").textContent = score;

  if (turnsLeft <= 0) {
    document.getElementById("game-over").style.display = "block";
    saveToLeaderboard(playerName, score);
    showLeaderboardModal();
    setTimeout(resetGameState, 10000);
  }
}

function nextCelebrity() {
  if (turnsLeft <= 0) return;
  current = (current + 1) % celebrities.length;
  updateCelebrity();
}

function restartGame() {
  resetGameState();
  updateCelebrity();
}

function resetGameState() {
  current = 0;
  score = 0;
  attempts = 0;
  turnsLeft = 5;
  playerName = "";

  const image = document.getElementById("celebrity-img");
  if (image) {
    image.classList.remove("partial");
    void image.offsetWidth;
    image.classList.add("partial");
  }

  document.getElementById("player-name").value = "";
  document.getElementById("player-name").disabled = false;
  document.getElementById("game-section").classList.add("hidden");
  document.getElementById("display-name").textContent = "";
  document.getElementById("score").textContent = "0";
  document.getElementById("turns").textContent = "5";
  document.getElementById("guess-input").value = "";
  document.getElementById("result").textContent = "";
  document.getElementById("hint").textContent = "";
  document.getElementById("game-over").style.display = "none";
}

function showFullImage() {
  const image = document.getElementById("celebrity-img");
  if (image) {
    image.classList.remove("partial");
    image.style.clipPath = "none";
  }
}

function saveToLeaderboard(name, score) {
  leaderboard.push({ name, score, date: new Date().toLocaleString() });
  leaderboard.sort((a, b) => b.score - a.score);
  if (leaderboard.length > 10) leaderboard.length = 10;
}

function showLeaderboardModal() {
  let modal = document.getElementById("leaderboard-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "leaderboard-modal";
    modal.className = "modal";
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-button" onclick="document.getElementById('leaderboard-modal').remove()">×</span>
        <h2>Top 10 Scores</h2>
        <ul>${leaderboard.map(entry => `<li>${entry.name} - ${entry.score} punten (${entry.date})</li>`).join('')}</ul>
        <button onclick="downloadLeaderboard()">Download Scorelijst</button>
      </div>
    `;
    document.body.appendChild(modal);
  }
}

function downloadLeaderboard() {
  let content = "Top 10 Scores:\n";
  leaderboard.forEach(entry => {
    content += `${entry.name} - ${entry.score} punten (${entry.date})\n`;
  });
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "leaderboard.txt";
  link.click();
}

