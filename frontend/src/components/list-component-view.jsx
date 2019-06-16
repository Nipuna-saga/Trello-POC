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
  float: left;
`;
const Tasklist = styled.div`
  padding: 8px;
  flex-grow: 1;
`;

class List extends Component {
  state = {};
  render() {
    const cards = this.props.cards.filter(x => x);
    return (
      <Draggable draggableId={this.props.list.id} index={this.props.index}>
        {provided => (
          <Container ref={provided.innerRef} {...provided.draggableProps}>
            <div>
              <Title {...provided.dragHandleProps}>
                {this.props.list.title}
              </Title>
              <button
                id={this.props.list.id}
                onClick={this.props.onListDelete}
                className="btn btn-outline-danger fa fa-trash "
                style={{ float: "right" }}
              />
              <button
                id={this.props.list.id}
                onClick={this.props.onListEdit}
                onChange={this.props.handleUpdateList}
                className="btn btn-outline-primary fa fa-pencil "
                style={{ float: "right" }}
              />
            </div>

            <Droppable droppableId={this.props.list.id} type="card">
              {provided => (
                <Tasklist ref={provided.innerRef} {...provided.droppableProps}>
                  {cards.map((card, index) => (
                    <Task
                      onCardDelete={this.props.cardDelete}
                      cardEdit={this.props.cardEdit}
                      key={card.id}
                      card={card}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </Tasklist>
              )}
            </Droppable>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-sticky-note-o" aria-hidden="true" />
                </span>
              </div>
              <input
                type="text"
                id={this.props.list.id}
                placeholder="eg: card 1"
                className="form-control"
                value={this.props.newValue[this.props.list.id]}
                onChange={this.props.newOnChange}
                onKeyPress={this.props.newOnKeyPress}
              />
            </div>
          </Container>
        )}
      </Draggable>
    );
  }
}

export default List;
