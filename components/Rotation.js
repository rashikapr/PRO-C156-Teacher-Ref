//Terrain Rotation
AFRAME.registerComponent("terrain-rotation-reader", {
  schema: {
    speedOfRoation: { type: "number", default: 0 },
  },
  init: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        if (this.data.speedOfRoation < 0.1) {
          this.data.speedOfRoation += 0.01;
        }
      }
      if (e.key === "ArrowLeft") {
        if (this.data.speedOfRoation > -0.1) {
          this.data.speedOfRoation -= 0.01;
        }
      }
    });
  },
  tick: function () {
    var mapRotation = this.el.getAttribute("rotation");

    mapRotation.y += this.data.speedOfRoation;

    this.el.setAttribute("rotation", {
      x: mapRotation.x,
      y: mapRotation.y,
      z: mapRotation.z,
    });
  },
});

//Plane rotation component
AFRAME.registerComponent("plane-rotation-reader", {
  schema: {
    speedOfRoation: { type: "number", default: 0 },
  },
  init: function () {
    console.log("Welcome to Virtual Flight !!!");
  },

  update: function () {
    // Key Down Event
    window.addEventListener("keydown", (e) => {
      var planeRotation = this.el.getAttribute("rotation");
      var body = this.el.body;
      
      if (e.key === "ArrowRight") {
        if (planeRotation.x >= -35 && planeRotation.x <= 30) {
          body.angularVelocity.set(0, 0, -0.2);
        } else {
          body.angularVelocity.set(0, 0, 0);
        }
      }
      if (e.key === "ArrowLeft") {
        if (planeRotation.x <= 35 && planeRotation.x >= -30) {
          body.angularVelocity.set(0, 0, 0.2);
        } else {
          body.angularVelocity.set(0, 0, 0);
        }
      }
      if (e.key === "ArrowUp") {
        if (planeRotation.z >= -35 && planeRotation.z <= 30) {
          body.angularVelocity.set(0.2, 0, 0);
        } else {
          body.angularVelocity.set(0, 0, 0);
        }
      }
      if (e.key === "ArrowDown") {
        if (planeRotation.z <= 35 && planeRotation.z >= -30) {
          body.angularVelocity.set(-0.2, 0, 0);
        } else {
          body.angularVelocity.set(0, 0, 0);
        }
      }
    });

    // Key Up Event
    window.addEventListener("keyup", (e) => {
      const body = this.el.body;
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        body.angularVelocity.set(0, 0, 0);
      }
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        body.angularVelocity.set(0, 0, 0);
      }
    });
  },
  tick: function () {
    //update the position and velocity in the tick function to avoid the plane falling down because of gravity
    var body = this.el.body;
    if (body !== undefined) {
      // Set velocity to 0.1 to float in the air
      body.velocity.set(0.1, 0.1, 0.1);

      // Initial position of plane
      const initPosition = body.initPosition;
      body.position.set(initPosition.x, initPosition.y, initPosition.z);
    }

    //GAME OVER
    var isGameOver = this.el.getAttribute("game-play").isGameOver;
    if (isGameOver) {
      this.el.body.velocity.set(-1, -1, -1);
      const element = document.querySelector("#game_over_text");
      element.setAttribute("visible", true);
      return;
    }
  }
});
