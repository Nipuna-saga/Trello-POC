import React, { Component } from "react";

class Board extends Component {
  state = {};
  render() {
    return (
      <div>
        <div>
          <div>Board</div>
          {this.props.userBoards.length > 0 ? (
            <div>
              {this.props.userBoards.map(x => (
                <div key={x.id} onClick={this.props.onClickBoard}>
                  <div>
                    <p id={x.id}>{x.title}</p>
                    <button id={x.id} onClick={this.props.onClickBoardDelete}>
                      X
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
        {this.props.isUserSelected && (
          <div>
            <input
              id="board"
              placeholder="add board"
              onKeyPress={this.props.onPressEnterNewBoardInput}
              value={this.props.newBoard}
              onChange={this.props.onChangeBoardInput}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Board;
