const initialData = {
  cards: {
    1: { id: 1, title: "Do first thing" },
    2: { id: 2, title: "Do second thing" },
    3: { id: 3, title: "Do third thing" },
    4: { id: 4, title: "Do fourth thing" },
    5: { id: 5, title: "Do fifth thing" }
  },
  lists: {
    "column-1": {
      id: "column-1",
      title: "To do",
      cardOrder: [1, 2, 3]
    },
    "column-2": {
      id: "column-2",
      title: "Doing",
      cardOrder: [4, 5]
    }
  },
  listOrder: ["column-1", "column-2"]
};

export default initialData;
