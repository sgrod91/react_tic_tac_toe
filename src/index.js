import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class TicTacToe extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPlayer: 'O',
      board: [null, null, null, null, null, null, null, null, null],
      xWins: 0,
      oWins: 0,
      draws: 0
    };
  }
  markSquare(idx) {
    if (this.state.board[idx] === null) {
      this.state.board[idx] = this.state.currentPlayer;
      let newCurrentPlayer;
      if (this.state.currentPlayer === 'O') {
        newCurrentPlayer = 'X';
      } else { // assuming it's X
        newCurrentPlayer = 'O';
      }
      // or you could
      // newCurrentPlayer = this.state.currentPlayer === 'O' ? 'X': 'O';

      let winner = this.getWinner();
      let xWins = this.state.xWins;
      let oWins = this.state.oWins;
      if (winner) {

      }
      if (winner === 'O') {
        oWins++;
      }
      if (winner === 'X') {
        xWins++;
      }
      if (winner) {
        this.state.board = [null, null, null, null, null, null, null, null, null];
      }
      this.setState({
        board: this.state.board,
        currentPlayer: newCurrentPlayer,
        oWins: oWins,
        xWins: xWins
      });
      // alternate setState syntax that can work
      // with asynchronicity
      // this.setState((prevState) => {
      //   return {
      //     oWins: prevState.oWins + 1
      //   }
      // });
      // don't read the state back out after a setState
    }
  }
  isWin(a, b, c) {
    let board = this.state.board;
    if (board[a] === board[b] && board[b] === board[c] && board[b] === this.state.currentPlayer) {
      return true;
    } else {
      return false;
    }
  }
  getWinner() {
    let board = this.state.board;
    if (this.isWin(0, 1, 2) ||
      this.isWin(3, 4, 5) ||
      this.isWin(6, 7, 8) ||
      this.isWin(0, 3, 6) ||
      this.isWin(1, 4, 7) ||
      this.isWin(2, 5, 8) ||
      this.isWin(0, 4, 8) ||
      this.isWin(2, 4, 6)
    ) {
      return this.state.currentPlayer;
    }
  }
  otherPlayer() {
    return this.state.currentPlayer === 'O' ? 'X': 'O';
  }
  render() {
    // check winner or draw
    let winner = this.getWinner();
    let message = null;
    if (winner) {
      message = `The winner is ${winner}!`;
    }
    // Don't call setState in render

    return (
      <div className="tictactoe">
        <div>O: {this.state.oWins} -
        X: {this.state.xWins}</div>
        <div>{message}</div>
        {this.state.board.map((piece, idx) =>
          <button key={idx}
            onClick={() => this.markSquare(idx)}>{piece}</button>
        )}
      </div>
    );
  }
}

ReactDOM.render(
  <TicTacToe />,
  document.getElementById('root')
);
