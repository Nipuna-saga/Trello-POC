import React, { Component } from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Task from "./card-component-view";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgray;
  border-radius: 2px;
  display: flex;
  width: 33%;
  flex-direction: column;
  background-color: white;
`;
const Title = styled.h3`
  padding: 8px;
`;
const Tasklist = styled.div`
  padding: 8px;
  flex-grow: 1;
`;

const Input = styled.input`
  padding: 8px;
`;

class Column extends Component {
  state = {};
  render() {
    return (
      <Draggable draggableId={this.props.list.id} index={this.props.index}>
        {provided => (
          <Container ref={provided.innerRef} {...provided.draggableProps}>
            <Title {...provided.dragHandleProps}>{this.props.list.title}</Title>
            <Droppable droppableId={this.props.list.id} type="card">
              {provided => (
                <Tasklist ref={provided.innerRef} {...provided.droppableProps}>
                  {this.props.cards.map((card, index) => (
                    <Task key={card.id} card={card} index={index} />
                  ))}
                  {provided.placeholder}
                </Tasklist>
              )}
            </Droppable>
            <Input placeholder="new card" />
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Column;
