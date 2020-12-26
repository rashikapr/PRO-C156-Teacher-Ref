AFRAME.registerComponent("game-play", {
  schema: {
    elementId: { type: "string", default: "#ring1" },
    isGameOver: { type: "boolean", default: false }
  },
  init: function() {
    const duration = 60 * 2;
    const timerEl = document.querySelector("#timer");
    this.startTimer(duration, timerEl);
  },
  update: function() {
    this.isCollided(this.data.elementId);
  },
  startTimer: function(duration, timerEl) {
    var timer = duration,
      minutes,
      seconds;
    setInterval(() => {
      if (timer > 0) {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timerEl.setAttribute("text", {
          value: minutes + ":" + seconds
        });
        timer--;
      } else {
        this.gameOver();
      }
    }, 1000);
  },
  isCollided: function(elemntId) {
    const element = document.querySelector(elemntId);
    element.addEventListener("collide", e => {
      if (elemntId.includes("#ring")) {
        element.setAttribute("visible", false);
        this.playPowerUpSound();
        this.updateScore();
        this.updateTargets();
      } else {
        this.gameOver();
      }
    });
  },
  updateScore: function() {
    const element = document.querySelector("#score");
    let currentScore = parseInt(element.getAttribute("text").value);
    currentScore += 50;
    element.setAttribute("text", {
      value: currentScore
    });
  },
  updateTargets: function() {
    const element = document.querySelector("#targets");
    let currentTargets = parseInt(element.getAttribute("text").value);
    currentTargets -= 1;
    element.setAttribute("text", {
      value: currentTargets
    });
  },
  playPowerUpSound: function() {
    var entity = document.querySelector("#powerup_sound");
    entity.components.sound.playSound();
  },
  playCrashSound: function() {
    var entity = document.querySelector("#crash_sound");
    entity.components.sound.playSound();
  },
  gameOver: function() {
    this.playCrashSound();
    const planeEl = document.querySelector("#plane_model");
    planeEl.setAttribute("game-play", {
      isGameOver: true
    });
  }
});
