import React, { Component } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import initalData from "./initalData";
import styled from "styled-components";

import Column from "./list-component-view";

const Header = styled.h1`
  color: blue;
  padding: 10px;
`;

const Container = styled.div`
  display: flex;
`;

const Input = styled.input`
  padding: 8px;
  height: 20px;
  margin-top: 10px;
`;
class Sample extends Component {
  state = initalData;
  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "list") {
      const newListOrder = Array.from(this.state.listOrder);
      newListOrder.splice(source.index, 1);
      newListOrder.splice(destination.index, 0, draggableId);
      const newState = {
        ...this.state,
        listOrder: newListOrder
      };

      this.setState(newState);
      return;
    }

    const sourceList = this.state.lists[source.droppableId];
    const destinationList = this.state.lists[destination.droppableId];

    const sourceListCardOrder = Array.from(sourceList.cardOrder);
    const destinationListCardOrder = Array.from(destinationList.cardOrder);

    if (sourceList === destinationList) {
      sourceListCardOrder.splice(source.index, 1);
      sourceListCardOrder.splice(destination.index, 0, draggableId);

      const newList = {
        ...sourceList,
        cardOrder: sourceListCardOrder
      };

      const newState = {
        ...this.state,
        lists: {
          ...this.state.lists,
          [newList.id]: newList
        }
      };

      this.setState(newState);
      return;
    }
    sourceListCardOrder.splice(source.index, 1);
    destinationListCardOrder.splice(destination.index, 0, draggableId);

    const newSourceList = {
      ...sourceList,
      cardOrder: sourceListCardOrder
    };
    const newDestionationList = {
      ...destinationList,
      cardOrder: destinationListCardOrder
    };

    const newState = {
      ...this.state,
      lists: {
        ...this.state.lists,
        [newSourceList.id]: newSourceList,
        [newDestionationList.id]: newDestionationList
      }
    };

    this.setState(newState);
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Header>{this.props.location.state.board.title}</Header>
        <Droppable droppableId={"board"} direction="horizontal" type="list">
          {provided => (
            <Container ref={provided.innerRef} {...provided.droppableProps}>
              {this.state.listOrder.map((listId, index) => {
                const list = this.state.lists[listId];
                const cards = list.cardOrder.map(
                  cardId => this.state.cards[cardId]
                );
                return (
                  <Column
                    key={list.id}
                    list={list}
                    cards={cards}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
              <Input placeholder="new list" />
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default Sample;
