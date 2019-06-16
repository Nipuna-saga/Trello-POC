//Data formatter

export default {
  decoder() {
    return {
      User: data => {
        return new JsonToUser(data);
      },
      Board: data => {
        return new JsonToBoard(data);
      },
      List: data => {
        let lists = {};
        for (let i = 0; i < data.length; i++) {
          lists[data[i].id] = new JsonToList(data[i]);
        }

        return lists;
      },
      Card: data => {
        let cards = {};
        for (let i = 0; i < data.length; i++) {
          const id = "card-" + data[i].id;
          cards[id] = new JsonToCard(data[i], id);
        }

        return cards;
      }
    };
  },

  encoder() {
    return {
      User: data => {
        return new UserToJson(data);
      },
      UserDelete: data => {
        return new UserToJsonDelete(data);
      },
      Board: (title, user) => {
        return new BoardToJson(title, user);
      },
      BoardCurrent: data => {
        return new BoardToJsonCurrent(data);
      },
      List: (title, board) => {
        return new ListToJson(title, board);
      },
      ListCurrent: data => {
        return new ListToJsonCurrent(data);
      },
      Card: (title, list) => {
        return new CardToJson(title, list);
      },
      CardCurrent: data => {
        return new CardToJsonCurrent(data);
      }
    };
  }
};
class CardToJson {
  constructor(title, list) {
    this.title = title;
    this.list_id = list;
  }
}

class CardToJsonCurrent {
  constructor(data) {
    this.id = parseInt(data.id.split("-")[1]);
    this.title = data.title;
    this.list_id = data.listId;
    this.description = data.description;
    this.due_date = data.dueDate ? new Date(data.dueDate) : null;
  }
}

class ListToJson {
  constructor(title, board) {
    this.title = title;
    this.board_id = board;
  }
}

class ListToJsonCurrent {
  constructor(data) {
    this.title = data.title;
    this.board_id = data.boardId;
    this.id = data.id;
    this.card_order = this.getOrder(data.cardOrder);
  }
  getOrder = cardOrder => {
    let order = [];
    for (let i = 0; i < cardOrder.length; i++) {
      order.push(parseInt(cardOrder[i].split("-")[1]));
    }
    return order;
  };
}

class JsonToList {
  constructor(data) {
    this.title = data.title;
    this.id = data.id;
    this.boardId = data.board_id;
    this.cardOrder = this.getOrder(data.card_order);
  }

  getOrder = cardOrder => {
    let order = [];
    for (let i = 0; i < cardOrder.length; i++) {
      order.push("card-" + cardOrder[i]);
    }
    return order;
  };
}
class JsonToCard {
  constructor(data, id) {
    this.title = data.title;
    this.id = id;
    this.listId = data.list_id;
    this.description = data.description;
    this.dueDate = data.due_date;
  }
}

class JsonToBoard {
  constructor(data) {
    this.id = data.response.id;
    this.title = data.response.title;
    this.user = data.response.board_owner_id;
    this.list_order = data.response.list_order;
  }
}

class BoardToJson {
  constructor(title, user) {
    this.title = title;
    this.board_owner_id = user;
  }
}
class BoardToJsonCurrent {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.board_owner_id = data.board_owner_id;
    this.list_order = data.list_order;
  }
}

class UserToJson {
  constructor(data) {
    this.name = data;
  }
}

class UserToJsonDelete {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
  }
}

class JsonToUser {
  constructor(data) {
    this.id = data.response.id;
    this.name = data.response.name;
  }
}
