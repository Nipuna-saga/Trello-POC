import React, { Component } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid lightgray;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
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
            {this.props.card.title}
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Task;
