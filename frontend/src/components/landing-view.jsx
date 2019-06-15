import React, { Component } from "react";

import User from "./user-view";
import Board from "./board-view";

class Landing extends Component {
  state = {
    users: [{ id: 1, name: "nipuna" }, { id: 2, name: "janitha" }],
    boards: [
      {
        id: 3,
        title: "board3",
        list_order: [],
        board_owner_id: 2
      },
      {
        id: 4,
        title: "board5",
        list_order: [],
        board_owner_id: 2
      },
      {
        id: 1,
        title: "board1",
        list_order: [1, 2],
        board_owner_id: 1
      },
      {
        id: 2,
        title: "board2",
        list_order: [3, 4],
        board_owner_id: 1
      }
    ],
    currentUser: {},
    currentUserBoards: [],
    formData: { user: "", board: "" },
    userSelected: false
  };
  //trigger when  press enter key
  handleOnPressEnterInput = e => {
    let { users, formData, boards, currentUserBoards } = this.state;
    if (e.which === 13 && formData[e.target.id] !== "") {
      if (e.target.id === "user") {
        users.push({ id: users.length + 1, name: formData.user });
      } else if (e.target.id === "board") {
        const newBoard = {
          id: boards.length + 1,
          title: formData.board,
          user: 1,
          list_order: []
        };
        boards.push(newBoard);
        currentUserBoards.push(newBoard);
      }

      formData[e.target.id] = "";
      this.setState({ users, formData, boards, currentUserBoards });
    }
  };

  //trigger when change in  input
  handleOnChangeInput = e => {
    let { formData } = this.state;
    formData[e.target.id] = e.target.value;
    this.setState({ formData });
  };

  //trigger when user click delete button
  handleOnClickUserDelete = e => {
    let { users } = this.state;
    users = this.state.users.filter(x => x.id !== parseInt(e.target.id));
    this.setState({ users });
  };

  //trigger when  click on user entry
  handleOnClickUser = e => {
    let {
      currentUser,
      currentUserBoards,
      boards,
      users,
      userSelected
    } = this.state;
    currentUser = users.filter(x => x.id === parseInt(e.target.id))[0];

    userSelected = true;
    currentUserBoards = boards.filter(
      x => x.board_owner_id === parseInt(e.target.id)
    );

    this.setState({ currentUser, currentUserBoards, userSelected });
  };

  handleOnClickBoard = e => {
    let { boards, currentUser } = this.state;
    const currentBoard = boards.filter(x => x.id === parseInt(e.target.id))[0];
    let path = `board/`;
    this.props.history.push({
      pathname: path,
      state: { user: currentUser, board: currentBoard }
    });
  };

  render() {
    return (
      <div>
        <h1>Welcome</h1>
        <User
          userList={this.state.users}
          onPressEnterNewUserInput={this.handleOnPressEnterInput}
          onChangeUserInput={this.handleOnChangeInput}
          onClickUserDelete={this.handleOnClickUserDelete}
          onClickUser={this.handleOnClickUser}
          newUser={this.state.formData.user}
        />
        <Board
          userBoards={this.state.currentUserBoards}
          isUserSelected={this.state.userSelected}
          onPressEnterNewBoardInput={this.handleOnPressEnterInput}
          onChangeBoardInput={this.handleOnChangeInput}
          newBoard={this.state.formData.board}
          onClickBoard={this.handleOnClickBoard}
        />
      </div>
    );
  }
}

export default Landing;
