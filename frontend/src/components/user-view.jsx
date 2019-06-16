import React, { Component } from "react";
import styled from "styled-components";

const UserContainer = styled.div`
  padding-left: 100px;
  padding-top: 50px;
`;

class User extends Component {
  state = {};
  render() {
    return (
      <div>
        <UserContainer>
          {this.props.userList.map(x => (
            <div key={x.id}>
              <div>
                <button
                  className="btn btn-outline-primary"
                  id={x.id}
                  onClick={this.props.onClickUser}
                >
                  {x.name}
                </button>
                <button
                  className="btn btn-danger fa fa-trash"
                  id={x.id}
                  onClick={this.props.onClickUserDelete}
                />
              </div>
              <br />
            </div>
          ))}
        </UserContainer>
        <div
          className="input-group"
          style={{
            paddingLeft: "100px",
            paddingRight: "1000px"
          }}
        >
          <div className="input-group-prepend">
            <span className="input-group-text">
              Press enter to add new user
            </span>
          </div>
          <input
            type="text"
            id="user"
            placeholder="eg: Nipuna"
            onKeyPress={this.props.onPressEnterNewUserInput}
            value={this.props.newUser}
            onChange={this.props.onChangeUserInput}
            className="form-control"
          />
        </div>

        <br />
      </div>
    );
  }
}

export default User;
