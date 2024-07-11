export const connectingLines = {
  fullScreen: {
    enable: true,
    zIndex: -10,
  },
  background: {
    color: {
      value: "#fff",
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
    },
    modes: {
      repulse: {
        distance: 100,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#000",
    },
    links: {
      color: "#222",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: false,
      speed: 2,
      straight: false,
    },
    number: {
      density: {
        enable: true,
      },
      value: 50,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
};

export const confetti = {

    "fullScreen": {
      "zIndex": 10
    },
    "emitters": {
      "position": {
        "x": 50,
        "y": 100
      },
      "rate": {
        "quantity": 5,
        "delay": 0.15
      }
    },
    "particles": {
      "color": {
        "value": [
          "#1E00FF",
          "#FF0061",
          "#E1FF00",
          "#00FF9E",
          "#00B4FF",
          "#F900FF",
          "#FF9000",
          "#FF00B4",
          "#FF0000",
        ]
      },
      "move": {
        "decay": 0.05,
        "direction": "top",
        "enable": true,
        "gravity": {
          "enable": true
        },
        "outModes": {
          "top": "none",
          "default": "destroy"
        },
        "speed": {
          "min": 50,
          "max": 100
        }
      },
      "number": {
        "value": 0
      },
      "opacity": {
        "value": 1
      },
      "rotate": {
        "value": {
          "min": 0,
          "max": 360
        },
        "direction": "random",
        "animation": {
          "enable": true,
          "speed": 30
        }
      },
      "tilt": {
        "direction": "random",
        "enable": true,
        "value": {
          "min": 0,
          "max": 360
        },
        "animation": {
          "enable": true,
          "speed": 30
        }
      },
      "size": {
        "value": 5,
        "animation": {
          "enable": true,
          "startValue": "min",
          "count": 1,
          "speed": 16,
          "sync": true
        }
      },
      "roll": {
        "darken": {
          "enable": true,
          "value": 25
        },
        "enlighten": {
          "enable": true,
          "value": 25
        },
        "enable": true,
        "speed": {
          "min": 5,
          "max": 15
        }
      },
      "wobble": {
        "distance": 30,
        "enable": true,
        "speed": {
          "min": -7,
          "max": 7
        }
      },
      "shape": {
        "type": [
          "circle",
          "square",
          "triangle"
        ],
        "options": {}
      }
    },
    "responsive": [
      {
        "maxWidth": 1024,
        "options": {
          "particles": {
            "move": {
              "speed": {
                "min": 33,
                "max": 66
              }
            }
          }
        }
      }
    ]
  }