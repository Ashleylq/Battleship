import { Ship, GameBoard } from ".";

test('Registers a hit', () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.hits).toBe(1);
})

test('Sinks when hits match length', () => {
    const ship = new Ship(3);
    ship.hit();
    ship.hit();
    ship.hit()
    expect(ship.sunk).toBe(true);
})

test('Cannot place two ships in one place', () => {
    let gameBoard = new GameBoard();
    gameBoard.placeShip(3, 3, 'x', 4);
    expect(gameBoard.placeShip(3, 3, 'x', 4)).toBe('Cant place ship here');
})

test('Hits a ship when inputted with coordinates', () => {
    let gameBoard = new GameBoard();
    gameBoard.placeShip(3, 3, 'x', 4);
    gameBoard.hit(3, 5);
    expect(gameBoard.board[3][5].status).toBe('hit');
})

test('Can sink and ship', () => {
    let gameBoard = new GameBoard();
    gameBoard.placeShip(3, 3, 'x', 3);
    gameBoard.hit(3, 3);
    gameBoard.hit(3, 4);
    gameBoard.hit(3, 5);
    expect(gameBoard[3][3].status).toBe('sunk');
})