class Ship{
    constructor(length){
        this.length = length;
        this.sunk = false;
        this.hits = 0;
    }
    hit(){
        this.hits++;
        this.isSunk();
    }

    isSunk(){
        if(this.hits === this.length){
            this.sunk = true;
        }
    }
}

class GameBoard{
    constructor(){
        this.board = this.createBoard(10, 10);
    }
    createBoard(row, col){
        let board = [];
        for(let i = 1; i <= row; i++){
            let row = [];
            for(let i = 1; i <= col; i++){
                let col = {
                    hasShip : false,
                    ship : 'none',
                    status : 'active',
                }
                row.push(col);
            }
            board.push(row);
        }
        return board
    }

    #randomNumber(num){
        return Math.floor(Math.random() * num);
    }

    #canPlaceShip(y, x, axis, length){
        for(let i = 0; i < length; i++){
            let xi = axis === 'x' ? x + i : x;
            let yi = axis === 'y' ? y + i : y;
            if(this.board[yi][xi].hasShip){return false};
            if(xi >= 10 || yi >= 10){return false};
        }
        return true;
    }

    placeRandomShip(length){
      let placed = false;
      while(!placed){
        let axis = this.#randomNumber(2) === 1 ? 'x' : 'y';
        let num1 = this.#randomNumber(11 - length);
        let num2 = this.#randomNumber(10);
        let x;
        let y;
        if(axis = 'x'){
            x = num1;
            y = num2;
        }
        else {
            y = num1;
            x = num2;
        }
        if(this.#canPlaceShip(y, x, axis, length)){
            placed = true;
            this.placeShip(y, x, axis, length, true);
        }
      }
    }
    placeShip(y, x, axis, length, random = false){
        if(random === false){
            if(!this.#canPlaceShip(y, x, axis, length)){
                return 'Cant place ship here';
            }
        }
        const ship = new Ship(length);
        for(let i = 0; i < length; i++){
            let xi = axis === 'x' ? x + i : x;
            let yi = axis === 'y' ? y + i : y;
            this.board[yi][xi].hasShip = true;
            this.board[yi][xi].ship = ship;
        }
    }
    hit(y, x){
        let position = this.board[y][x];
        if(position.status === 'active'){
            if(position.hasShip === true){
                position.ship.hit();
                position.status = 'hit';
            }
            else { position.status = 'miss' }
        }
    }
}

export {Ship, GameBoard}