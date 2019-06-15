import React, { Component } from "react";

class User extends Component {
  state = {};
  render() {
    return (
      <div>
        <div>
          {this.props.userList.map(x => (
            <div key={x.id}>
              <div>
                <p id={x.id} onClick={this.props.onClickUser}>
                  {x.name}
                </p>
                <button id={x.id} onClick={this.props.onClickUserDelete}>
                  X
                </button>
              </div>
            </div>
          ))}
        </div>
        <div>
          <input
            id="user"
            placeholder="add user"
            onKeyPress={this.props.onPressEnterNewUserInput}
            value={this.props.newUser}
            onChange={this.props.onChangeUserInput}
          />
        </div>
      </div>
    );
  }
}

export default User;
