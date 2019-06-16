//API service

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}

export default {
  baseURL: "http://localhost:8000/api/v1/",
  user() {
    return {
      getUsers: () =>
        fetch(this.baseURL + "user", {
          method: "GET",

          headers: {
            "Content-Type": "application/json"
          }
        }).then(handleErrors),

      insertUser: data =>
        fetch(this.baseURL + "user", {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }).then(handleErrors),

      deleteUser: data =>
        fetch(this.baseURL + "user", {
          method: "DELETE",

          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }).then(handleErrors)
    };
  },
  board() {
    return {
      getBoards: (param = "") =>
        fetch(this.baseURL + "board/" + param, {
          method: "GET",

          headers: {
            "Content-Type": "application/json"
          }
        }).then(handleErrors),

      insertBoard: data =>
        fetch(this.baseURL + "board/", {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }).then(handleErrors),

      updateBoard: data =>
        fetch(this.baseURL + "board/", {
          method: "PUT",

          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }).then(handleErrors),

      deleteBoard: data =>
        fetch(this.baseURL + "board/", {
          method: "DELETE",

          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }).then(handleErrors)
    };
  },
  list() {
    return {
      getLists: () =>
        fetch(this.baseURL + "list", {
          method: "GET",

          headers: {
            "Content-Type": "application/json"
          }
        }).then(handleErrors),
      insertList: data =>
        fetch(this.baseURL + "list", {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }).then(handleErrors),
      updateList: data =>
        fetch(this.baseURL + "list", {
          method: "PUT",

          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }).then(handleErrors),
      deleteList: data =>
        fetch(this.baseURL + "list", {
          method: "DELETE",

          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }).then(handleErrors)
    };
  },
  card() {
    return {
      getCards: () =>
        fetch(this.baseURL + "card", {
          method: "GET",

          headers: {
            "Content-Type": "application/json"
          }
        }).then(handleErrors),
      insertCard: data =>
        fetch(this.baseURL + "card", {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }).then(handleErrors),
      updateCard: data =>
        fetch(this.baseURL + "card", {
          method: "PUT",

          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }).then(handleErrors),
      deleteCard: data =>
        fetch(this.baseURL + "card", {
          method: "DELETE",

          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }).then(handleErrors)
    };
  }
};
