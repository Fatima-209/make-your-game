<div align="center">

# 🐍 Snake Game

**A browser-based Snake game built with vanilla JavaScript, HTML, and DOM manipulation**

Smooth 60 FPS animation • Keyboard controls • Live scoreboard • Pause menu

![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![No Frameworks](https://img.shields.io/badge/Frameworks-None-success?style=flat-square)

</div>

---

## ✨ Overview

A classic Snake game rebuilt from scratch using **plain JavaScript** — no canvas, no game engine, no frameworks. Just DOM elements, `requestAnimationFrame`, and careful performance tuning to keep gameplay smooth at a stable **60 FPS**.

Guide the snake to collect food, rack up points, and avoid collisions — all while managing a limited number of lives.

## 🎮 Controls

| Key | Action |
|:---:|:-------|
| `↑` `↓` `←` `→` | Move the snake |
| `Space` | Pause / open pause menu |
| **Continue** button | Resume the game |
| **Restart** button | Start a new game |

> Holding a direction key keeps the snake moving smoothly in that direction.

## 🚀 Getting Started

No build tools or dependencies required — just open it in a browser.

```bash
git clone https://github.com/Fatima-209/make-your-game.git
cd make-your-game
```

Then open [`html/index.html`](html/index.html) directly in your browser, or serve it locally:

```bash
npx serve .
```

## 🧩 Features

- 🎯 Smooth gameplay at a stable **60 FPS**
- 🔁 Animation driven by **`requestAnimationFrame`**
- ⌨️ Keyboard-only controls with continuous input
- ⏸️ Pause menu with **Continue** and **Restart**
- 📊 Live scoreboard showing **timer**, **score**, and **remaining lives**
- 🪶 Lightweight rendering with minimal DOM layers
- 🛠️ Built entirely with **plain JavaScript** — no frameworks, no canvas

## ⚡ Performance

Smooth animation is achieved by:

- Rendering with **`requestAnimationFrame`** instead of `setInterval`
- Minimizing unnecessary DOM updates per frame
- Profiling FPS and repaint cost with **browser DevTools**

## 🗂️ Project Structure

```
make-your-game/
├── html/
│   └── index.html      # Game markup
├── css/
│   └── style.css        # Styling and layout
├── js/
│   └── snake.js          # Game logic and rendering
└── images/
    └── screenshot.png     # Preview image
```

## 🛠️ Built With

- **JavaScript** (Vanilla, ES6)
- **HTML5**
- **CSS3**
- **DOM Manipulation**

## 📚 Learning Outcomes

This project was built to strengthen understanding of:

- `requestAnimationFrame` and the JavaScript event loop
- FPS and animation performance tuning
- Direct DOM manipulation without frameworks
- Rendering optimization techniques
- Debugging and profiling with browser DevTools

---

<div align="center">

Made with 🐍 and vanilla JavaScript

</div>
