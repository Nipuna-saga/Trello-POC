import React, { Component } from "react";
import styled from "styled-components";
const Title = styled.h1`
  font-size: 50px;
  text-align: center;
  color: white;
`;

const Navbar = styled.div`
  width: 100%;
  background-color: black;
`;
class Board extends Component {
  state = {};
  render() {
    return (
      <div>
        <div>
          <Navbar>
            <Title>{this.props.user.name}'s Boards</Title>
          </Navbar>
          {this.props.userBoards.length > 0 ? (
            <div style={{ paddingLeft: "100px", paddingTop: "50px" }}>
              {this.props.userBoards.map(x => (
                <div key={x.id}>
                  <div>
                    <button
                      onClick={this.props.onClickBoard}
                      className="btn btn-outline-success"
                      id={x.id}
                    >
                      {x.title}
                    </button>
                    <button
                      className="btn btn-danger fa fa-trash"
                      id={x.id}
                      onClick={this.props.onClickBoardDelete}
                    />
                  </div>
                  <br />
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
        {this.props.isUserSelected && (
          <div
            className="input-group"
            style={{
              paddingLeft: "100px",
              paddingRight: "1000px"
            }}
          >
            <div className="input-group-prepend">
              <span className="input-group-text">
                Press enter to add new board
              </span>
            </div>
            <input
              type="text"
              id="board"
              placeholder="eg: Board-1"
              onKeyPress={this.props.onPressEnterNewBoardInput}
              value={this.props.newBoard}
              onChange={this.props.onChangeBoardInput}
              className="form-control"
            />
          </div>
        )}
      </div>
    );
  }
}

export default Board;
