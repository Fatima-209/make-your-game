# make-your-game
Built a browser-based Snake game using vanilla JavaScript and DOM, implementing smooth 60 FPS animation with requestAnimationFrame
# Snake Game (JavaScript)

## Overview
A browser-based implementation of the classic Snake game built using **vanilla JavaScript, HTML, and DOM manipulation**.  
The game focuses on **smooth animation, responsive keyboard controls, and performance optimization**, maintaining a stable **60 FPS** using `requestAnimationFrame`.

The player controls the snake to collect food, increase the score, and avoid collisions while managing limited lives.

---

## Features
- Smooth gameplay running at **60 FPS**
- Animation implemented with **requestAnimationFrame**
- **Keyboard-only controls** with continuous input
- **Pause menu** with:
  - Continue
  - Restart
- **Scoreboard** displaying:
  - Timer
  - Current score
  - Remaining lives
- Optimized rendering with **minimal DOM layers**
- Built with **plain JavaScript (no frameworks, no canvas)**

---

## Controls
| Key | Action |
|----|----|
| Arrow Keys | Move the snake |
| Pause | Open pause menu |
| Continue | Resume game |
| Restart | Restart game |

Holding a key continues the action for smooth movement.

---

## Performance
The game maintains smooth animation and avoids frame drops by:

- Using **requestAnimationFrame** for rendering
- Reducing unnecessary DOM updates
- Monitoring FPS and performance using **browser Developer Tools**

---

## Technologies Used
- JavaScript (Vanilla JS)
- HTML
- CSS
- DOM Manipulation

---

## Learning Outcomes
This project demonstrates understanding of:

- requestAnimationFrame
- JavaScript event loop
- FPS and animation performance
- DOM manipulation
- Rendering optimization
- Debugging using browser developer tools
