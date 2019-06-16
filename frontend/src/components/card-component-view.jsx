import React, { Component } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import Moment from "react-moment";

const Container = styled.div`
  border: 1px solid blue;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
  height: 150px;
`;

class Task extends Component {
  state = {};
  render() {
    return (
      <Draggable draggableId={this.props.card.id} index={this.props.index}>
        {provided => (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div>
              <h5 style={{ padding: "8px", float: "left" }}>
                {this.props.card.title}
              </h5>

              <button
                id={this.props.card.id}
                className="btn btn-outline-danger fa fa-trash "
                style={{ float: "right" }}
                onClick={this.props.onCardDelete}
              />
              <button
                id={this.props.card.id}
                className="btn btn-outline-primary fa fa-pencil "
                style={{ float: "right" }}
                onClick={this.props.cardEdit}
              />
            </div>
            <br />

            <hr />
            <div>{this.props.card.description}</div>
            <div>
              {this.props.card.dueDate && (
                <div>
                  Due Date -&nbsp;
                  <Moment format="YYYY/MM/DD">{this.props.card.dueDate}</Moment>
                </div>
              )}
            </div>
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Task;
