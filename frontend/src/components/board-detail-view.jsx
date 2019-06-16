import React, { Component } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import styled from "styled-components";
import api from "./services/api";
import formatter from "./utilities/formatter";
import List from "./list-component-view";
import Modal from "react-responsive-modal";

const Container = styled.div`
  display: flex;
`;

class BoardDetail extends Component {
  state = {
    cards: {},
    lists: {},
    listOrder: [],
    formData: { card: {}, list: "" },
    currentBoard: { title: "" },
    editCardModalOpen: false,
    editListModalOpen: false,
    selectedCard: {},
    selectedList: {}
  };

  componentDidMount = () => {
    this.initBoard();
  };

  //trigger when change in input
  handleOnChangeInput = e => {
    let { formData } = this.state;
    if (e.target.id === "list") {
      formData[e.target.id] = e.target.value;
    } else {
      formData["card"][e.target.id] = e.target.value;
    }

    this.setState({ formData });
  };

  //trigger when  press enter key
  handleOnPressEnterInput = e => {
    let { formData, lists, currentBoard } = this.state;

    if (
      e.which === 13 &&
      (formData[e.target.id] !== "" || formData.card[e.target.id] !== "")
    ) {
      console.log("sss");
      if (e.target.id === "list") {
        api
          .list()
          .insertList(
            formatter.encoder().List(formData[e.target.id], currentBoard.id)
          )

          .then(data => {
            this.initBoard();
          })
          .catch(error => {
            console.log(error, "User insert error");
          });
      } else {
        api
          .card()
          .insertCard(
            formatter.encoder().Card(formData.card[e.target.id], e.target.id)
          )

          .then(data => {
            this.initBoard();
          })
          .catch(error => {
            console.log(error, "User insert error");
          });
      }

      formData[e.target.id] = "";
      formData.card[e.target.id] = "";

      this.setState({ formData, lists });
      this.forceUpdate();
    }
  };

  //trigger when user click delete list button
  handleOnListDelete = e => {
    const id = e.target.id;
    let { lists } = this.state;
    api
      .list()
      .deleteList(formatter.encoder().ListCurrent(lists[parseInt(id)]))

      .then(data => {
        this.initBoard();
      })
      .catch(error => {
        console.log(error, "Delete error");
      });
  };

  //trigger when user click delete card button
  handleOnCardDelete = e => {
    const id = e.target.id;
    let { cards } = this.state;

    api
      .card()
      .deleteCard(formatter.encoder().CardCurrent(cards[id]))

      .then(data => {
        this.initBoard();
      })
      .catch(error => {
        console.log(error, "Delete error");
      });
  };

  //Drag and drop reoder logic
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
      this.updateBoard(newListOrder);
      this.setState(newState);
      return;
    }

    const sourceList = this.state.lists[source.droppableId];
    const destinationList = this.state.lists[destination.droppableId];

    const sourceListCardOrder = Array.from(sourceList.cardOrder);
    const destinationListCardOrder = Array.from(destinationList.cardOrder);

    //same list reorder
    if (sourceList === destinationList) {
      sourceListCardOrder.splice(source.index, 1);
      sourceListCardOrder.splice(destination.index, 0, draggableId);

      const newList = {
        ...sourceList,
        cardOrder: sourceListCardOrder
      };
      this.updateList(newList);
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
    //differnt list reorder
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
    this.updateList(newSourceList);
    this.updateList(newDestionationList);
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

  //use to update order of lists
  updateList = list => {
    api
      .list()
      .updateList(formatter.encoder().ListCurrent(list))

      .then(data => {
        this.initBoard();
      })
      .catch(error => {
        console.log(error, "Delete error");
      });
  };

  //use to update order of boards
  updateBoard = order => {
    let { currentBoard } = this.state;
    currentBoard.list_order = order;
    api
      .board()
      .updateBoard(formatter.encoder().BoardCurrent(currentBoard))

      .then(data => {
        this.initBoard();
      })
      .catch(error => {
        console.log(error, "Delete error");
      });
  };

  //board initialiizer
  initBoard = () => {
    let { lists, listOrder, cards, currentBoard, formData } = this.state;
    api
      .board()
      .getBoards("?q=" + this.props.match.params.id)

      .then(data => {
        currentBoard = data;
        this.setState({ currentBoard });
        api
          .card()
          .getCards()

          .then(data => {
            cards = formatter.decoder().Card(data);

            this.setState({ cards });
            api
              .list()
              .getLists()

              .then(data => {
                const currentList = data.filter(
                  x => x.board_id === currentBoard.id
                );
                listOrder = currentBoard.list_order;
                listOrder.forEach(function(entry) {
                  formData.card[entry] = "";
                });
                lists = formatter.decoder().List(currentList);

                this.setState({ listOrder, lists });
              })
              .catch(error => {
                console.log(error, "List retireive error");
              });
          })
          .catch(error => {
            console.log(error, "Card retireive error");
          });
      })
      .catch(error => {
        console.log(error, "Board retireive error");
      });
  };

  //trigger when user click update card button
  handleUpdateCard = e => {
    let { cards, selectedCard } = this.state;
    const selectedCardCopy = JSON.parse(JSON.stringify(cards[e.target.id]));
    selectedCard = selectedCardCopy;
    this.setState({ editCardModalOpen: true, selectedCard });
  };

  //trigger on change card details
  handleOnChangeCard = e => {
    let { selectedCard } = this.state;
    selectedCard[e.target.id] = e.target.value;
    this.setState({ selectedCard });
  };

  //trigger when user click update submit button
  handleUpdateCardOnSubmit = e => {
    let { selectedCard } = this.state;

    api
      .card()
      .updateCard(formatter.encoder().CardCurrent(selectedCard))

      .then(data => {
        this.setState({ editCardModalOpen: false });
        this.initBoard();
      })
      .catch(error => {
        console.log(error, "Delete error");
      });
  };

  //trigger when user click update list button
  handleUpdateList = e => {
    let { lists, selectedList } = this.state;
    const selectedListCopy = JSON.parse(JSON.stringify(lists[e.target.id]));
    selectedList = selectedListCopy;
    this.setState({ editListModalOpen: true, selectedList });
  };

  //trigger on change card details
  handleOnChangeList = e => {
    let { selectedList } = this.state;
    selectedList[e.target.id] = e.target.value;
    this.setState({ selectedList });
  };

  //trigger when user click update submit button
  handleUpdateListOnSubmit = e => {
    let { selectedList } = this.state;

    api
      .list()
      .updateList(formatter.encoder().ListCurrent(selectedList))

      .then(data => {
        this.setState({ editListModalOpen: false });
        this.initBoard();
      })
      .catch(error => {
        console.log(error, "Delete error");
      });
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <nav className="navbar navbar-light bg-light">
          <p className="navbar-brand" href="#" style={{ color: "#9400af" }}>
            {this.state.currentBoard.title}
          </p>
        </nav>
        <Droppable droppableId={"board"} direction="horizontal" type="list">
          {provided => (
            <Container ref={provided.innerRef} {...provided.droppableProps}>
              {this.state.listOrder.map((listId, index) => {
                const list = this.state.lists[listId];
                const cards = list.cardOrder.map(
                  cardId => this.state.cards[cardId]
                );
                return (
                  <List
                    onListDelete={this.handleOnListDelete}
                    key={list.id}
                    list={list}
                    cards={cards}
                    index={index}
                    newValue={this.state.formData.card}
                    newOnChange={this.handleOnChangeInput}
                    newOnKeyPress={this.handleOnPressEnterInput}
                    cardDelete={this.handleOnCardDelete}
                    cardEdit={this.handleUpdateCard}
                    onListEdit={this.handleUpdateList}
                  />
                );
              })}
              {provided.placeholder}
              <div style={{ paddingTop: "10px", height: "40px" }}>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-th-list" aria-hidden="true" />
                    </span>
                  </div>
                  <input
                    type="text"
                    id="list"
                    placeholder="eg: Todo"
                    value={this.state.formData.list}
                    onChange={this.handleOnChangeInput}
                    onKeyPress={this.handleOnPressEnterInput}
                    className="form-control"
                  />
                </div>
              </div>
            </Container>
          )}
        </Droppable>
        {/* edit card modal */}
        <Modal
          open={this.state.editCardModalOpen}
          onClose={() => this.setState({ editCardModalOpen: false })}
          center
        >
          <div className="modal-header">
            <h6
              className="modal-title justify-content-center"
              id="exampleModalLabel"
            >
              Edit Card
            </h6>
          </div>
          <div className="modal-body">
            <form id="productiveTimes">
              <div className="row">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      Title
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    id="title"
                    onChange={this.handleOnChangeCard}
                    value={this.state.selectedCard.title}
                  />
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      Description
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="description"
                    id="description"
                    onChange={this.handleOnChangeCard}
                    value={this.state.selectedCard.description}
                  />
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      Date
                    </span>
                  </div>
                  <input
                    className="form-control"
                    id="dueDate"
                    onChange={this.handleOnChangeCard}
                    type="date"
                    value={this.state.selectedCard.dueDate}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="row modal-footer float-center">
            <button
              className="btn btn-primary"
              onClick={this.handleUpdateCardOnSubmit}
            >
              Submit
            </button>
          </div>
        </Modal>
        {/* edit list modal */}
        <Modal
          open={this.state.editListModalOpen}
          onClose={() => this.setState({ editListModalOpen: false })}
          center
        >
          <div className="modal-header">
            <h6
              className="modal-title justify-content-center"
              id="exampleModalLabel"
            >
              Edit List
            </h6>
          </div>
          <div className="modal-body">
            <form id="productiveTimes">
              <div className="row">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      Date
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    id="title"
                    onChange={this.handleOnChangeList}
                    value={this.state.selectedList.title}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="row modal-footer float-center">
            <button
              className="btn btn-primary"
              onClick={this.handleUpdateListOnSubmit}
            >
              Submit
            </button>
          </div>
        </Modal>
      </DragDropContext>
    );
  }
}

export default BoardDetail;
