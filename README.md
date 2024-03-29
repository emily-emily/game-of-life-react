# Game of Life
A project based on Conway's Game of Life.

Demo: https://emily-emily.github.io/game-of-life-react/

Made using:
* React
* Semantic UI React

## Features
- Left-click or drag to draw living (coloured) cells
- Right-click or drag to erase living cells
- Play through automatically using the play/pause button, or step through at your own pace to see how the structures evolve
- Easily place pre-defined structures on the grid
- Adjust the play speed and cell colors
- Reset and randomly seed the grid

## Actions
| Key              | Action |
| ---------------- | ------ |
| Left-click/drag  | Draw living cell |
| Right-click/drag | Erase living cell |
| esc              | Cancel structure placement |
| f                | Flip structure horizontally |
| shift-f          | Flip structure vertically |
| a/left-arrow     | Rotate structure counter-clockwise |
| d/right-arrow    | Rotate structure clockwise |

## Next Steps
- Use Redux to reduce code passing data between components
- Use a graphics library
- Optimize certain items to reduce lag
- Write API and create database to fetch pre-defined structures, possibly pull from an existing database (eg. https://www.conwaylife.com/wiki/Main_Page)
- Re-design for a fresh look!
