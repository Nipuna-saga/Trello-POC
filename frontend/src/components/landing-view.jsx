import React, { Component } from "react";
import api from "./services/api";
import formatter from "./utilities/formatter";

import User from "./user-view";
import Board from "./board-view";

class Landing extends Component {
  state = {
    users: [],
    boards: [],
    currentUser: {},
    currentUserBoards: [],
    formData: { user: "", board: "" },
    userSelected: false
  };

  componentDidMount = () => {
    let { users, boards } = this.state;
    api
      .user()
      .getUsers()

      .then(data => {
        users = data;
        this.setState({ users });
      })
      .catch(error => {
        console.log(error, "User retireive error");
      });

    api
      .board()
      .getBoards()

      .then(data => {
        boards = data;
        this.setState({ boards });
      })
      .catch(error => {
        console.log(error, "Board retireive error");
      });
  };
  //trigger when  press enter key
  handleOnPressEnterInput = e => {
    let {
      users,
      formData,
      boards,
      currentUserBoards,
      currentUser
    } = this.state;
    if (e.which === 13 && formData[e.target.id] !== "") {
      if (e.target.id === "user") {
        api
          .user()
          .insertUser(formatter.encoder().User(formData[e.target.id]))

          .then(data => {
            users.push(formatter.decoder().User(data));
            this.setState({ users });
          })
          .catch(error => {
            console.log(error, "User insert error");
          });
      } else if (e.target.id === "board") {
        api
          .board()
          .insertBoard(
            formatter.encoder().Board(formData.board, currentUser.id)
          )

          .then(data => {
            const formattedData = formatter.decoder().Board(data);

            boards.push(formattedData);
            currentUserBoards.push(formattedData);
            this.setState({ boards, currentUserBoards });
          })
          .catch(error => {
            console.log(error, "User insert error");
          });
      }

      formData[e.target.id] = "";
      this.setState({ formData });
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
    const id = e.target.id;
    api
      .user()
      .deleteUser(
        formatter.encoder().UserDelete(users.find(x => x.id === parseInt(id)))
      )

      .then(data => {
        users = users.filter(x => x.id !== parseInt(id));
        this.setState({ users });
      })
      .catch(error => {
        console.log(error, "Delete error");
      });
  };
  //trigger when user click delete board button
  handleOnClickBoardDelete = e => {
    let { boards, currentUserBoards } = this.state;
    const id = e.target.id;
    api
      .board()
      .deleteBoard(
        formatter
          .encoder()
          .BoardCurrent(boards.find(x => x.id === parseInt(id)))
      )

      .then(data => {
        boards = boards.filter(x => x.id !== parseInt(id));
        currentUserBoards = currentUserBoards.filter(
          x => x.id !== parseInt(id)
        );
        this.setState({ boards, currentUserBoards });
      })
      .catch(error => {
        console.log(error, "Delete error");
      });
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
    console.log("Delete error2");
    let { boards, currentUser } = this.state;
    const currentBoard = boards.filter(x => x.id === parseInt(e.target.id))[0];
    let path = `board/` + currentBoard.id;
    this.props.history.push({
      pathname: path,
      state: { user: currentUser }
    });
  };

  render() {
    return (
      <div>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">Welcome to Trello POC</h1>
            <p className="lead">
              Please add users first, Then select user to add board. <br />{" "}
              Click on board to look forward.
            </p>
          </div>
        </div>
        <User
          userList={this.state.users}
          onPressEnterNewUserInput={this.handleOnPressEnterInput}
          onChangeUserInput={this.handleOnChangeInput}
          onClickUserDelete={this.handleOnClickUserDelete}
          onClickUser={this.handleOnClickUser}
          newUser={this.state.formData.user}
        />
        {this.state.userSelected && (
          <Board
            userBoards={this.state.currentUserBoards}
            isUserSelected={this.state.userSelected}
            user={this.state.currentUser}
            onPressEnterNewBoardInput={this.handleOnPressEnterInput}
            onChangeBoardInput={this.handleOnChangeInput}
            onClickBoardDelete={this.handleOnClickBoardDelete}
            newBoard={this.state.formData.board}
            onClickBoard={this.handleOnClickBoard}
          />
        )}
      </div>
    );
  }
}

export default Landing;
