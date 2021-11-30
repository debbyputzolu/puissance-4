class Puissance4 {
    /*
      initialization
     */
    constructor(element_id, rows=6, columns=7) {
      // Number of rows and columns
      this.rows = rows;
      this.columns = columns;
       // two-dimensional array contains the state of game:
      // 0: empty box, 1: box's player 1, 2: box's player 2
      this.grid = Array(this.rows);
        //route of lines
      for (let i = 0; i < this.rows; i++) {
        this.grid[i] = Array(this.columns).fill(0);
      }
      // next player number (int, 1 or 2)
      this.lap = 1;

      // number of strokes played (int)
      this.strokes = 0;

      // indicates the winner (int: null-> game in progress, 0-> draw , 1-> player 1 win, 2-> player 2 win) 
      this.winner = null;
  
      // target element where the display is made
      this.element = document.querySelector(element_id);
      // add eventListener to manage the click
      this.element.addEventListener('click', (event) => this.handleClick(event));
      
      // display
      this.displayGrid();
    }
    
    /* Game grid display */
    displayGrid() {
        // creation of the 'table' element
      let table = document.createElement('table');
      //the game counts from bottom to top
      // walk the lines
      for (let i = this.rows - 1; i >= 0; i--) {
          // creation element 'tr' and add line in grid
        let tr = table.appendChild(document.createElement('tr'));
        // walk the columns
        for (let j = 0; j < this.columns; j++) {
            // creation element 'td' and add column in grid
          let td = tr.appendChild(document.createElement('td'));

          let colour = this.grid[i][j];
          
          if (colour)
            td.className = 'player' + colour;
          td.dataset.column = j;
        }
      }
      // empty display
      this.element.innerHTML = '';
      // add table in html
      this.element.appendChild(table);
    }
    
    /* allows you to color the box */
    colorBox(row, column, player) {
      // color the box
      this.grid[row][column] = player;
      // count the lap
      this.trokes++;
    }
  
    /* add a pawm in a column */
    play(column) {
      // find the first free cell of the column
      let row;
      for (let i = 0; i < this.rows; i++) {
        if (this.grid[i][column] == 0) {
          row = i;
          break;
        }
      }
      if (row === undefined) {
        return null;
      } else {
        // take the turn
        this.colorBox(row, column, this.lap);
        
        // return lines that the in played
        return row;
      }
      }
    
    handleClick(event) {
      // check if the game is still in progress
      if (this.winner !== null) {
            if (window.confirm("Game over!\nDo you want to replay?")) {
                this.reset();
          this.diplayGrid();
              }
              return;
      }
  
        let column = event.target.dataset.column;
        if (column !== undefined) {
        // warning, variables in datasets are ALWAYS strings. It is better to convert it to integer with parseInt
        column = parseInt(column);
           let row = this.play(parseInt(column));
        
        if (row === null) {
          window.alert("Column is full");
        } else {
          // ckeck if there is a winner or if game over
          if (this.checkWin(row, column, this.lap)) {
            this.winner = this.lap;
          } else if (this.strokes >= this.rows * this.columns) {
            this.winner = 0;
          }
          // skip the turn : 3 - 2 = 1, 3 - 1 = 2
          this.lap = 3 - this.lap;
  
          // update display
          this.displayGrid()
          
          //when displaying display a message if the game is over
          switch (this.winner) {
            case 0: 
              window.alert("Null game!!"); 
              break;
            case 1:
              window.alert("Player 1 wins"); 
              break;
            case 2:
              window.alert("Player 2 wins"); 
              break;
          }
        }
      }
    }
  
    /* 
     check if there is a winner
     
     return :
       true  : if the game is won by the player
       false : if the game continues
   */
      checkWin(row, column, player) {
          // check horizontal
      let count = 0;
      for (let j = 0; j < this.cols; j++) {
        count = (this.grid[row][j] == player) ? count+1 : 0;
        if (count >= 4) return true;
      }
          // check vertical
      count = 0;
      for (let i = 0; i < this.rows; i++) {
        count = (this.grid[i][column] == player) ? count+1 : 0;
          if (count >= 4) return true;
      }
          // check diagonal
      count = 0;
      let shift = row - column;
      for (let i = Math.max(shift, 0); i < Math.min(this.rows, this.columns + shift); i++) {
        count = (this.grid[i][i - shift] == player) ? count+1 : 0;
          if (count >= 4) return true;
      }
          // check anti-diagonal
      count = 0;
      shift = row + column;
      for (let i = Math.max(shift - this.cols + 1, 0); i < Math.min(this.rows, shift + 1); i++) {
        console.log(i,shift-i,shift)
        count = (this.grid[i][shift - i] == player) ? count+1 : 0;
        if (count >= 4) return true;
      }
      
      return false;
      }
  
    // reset the grid 
    reset() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.grid[i][j] = 0;
        }
      }
          this.stroke = 0;
      this.winner = null;
      }
  }
  
  // initialization of grid.
  let p4 = new Puissance4('#grid');