import "./App.css";
import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";

function App() {
  const [currentValue, setCurrentValue] = useState("");

  const [lists, setLists] = useState([
    {
      id: Date.now(),
      listName: "To do",
      value: "",
      tasks: [
        { edit: false, id: 1, name: "Wake up" },
        { edit: false, id: 2, name: "Make food" },
      ],
    },
  ]);

  const [editPost, setEditPost] = useState("");

  const [nameList, setNameList] = useState("");

  const namingList = (e) => {
    setNameList(e.target.value);
  };

  const listSubmit = (e) => {
    e.preventDefault();
    const newList = {
      id: Date.now(),
      listName: nameList,
      tasks: [],
    };
    setLists([...lists, newList]);
    setNameList("");
  };

  const handleChange = (e, list) => {
    list.value = e.target.value;
    setLists([...lists]);
  };

  const handleSubmit = (e, list) => {
    e.preventDefault();
    const newPost = {
      edit: false,
      id: Date.now(),
      name: list.value,
    };
    list.tasks.push(newPost);
    setLists([...lists]);
    list.value = "";
  };

  const editingChange = (e) => {
    setEditPost(e.target.value);
  };

  const handleRemove = (elem) => {
    lists.forEach((list) => {
      list.tasks = list.tasks.filter((e) => e.id !== elem.id);
    });
    setLists([...lists]);
  };
  const handleEdit = (item) => {
    item.edit = !item.edit;
    setLists([...lists]);
  };

  const editingSubmit = (item) => {
    item.edit = false;
    item.name = editPost;
    setLists([...lists]);
  };
  const removeList = (elem) => {
    const remover = [...lists].filter((e) => e.id !== elem.id);
    setLists(remover);
  };

  useEffect(() => {
    const data = localStorage.getItem("lists-store");
    if (data) {
      setLists(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lists-store", JSON.stringify(lists));
  }, [lists]);

  return (
    <div className="container">
      <div className="todo-block">
        <div className="input-block">
          <form onSubmit={listSubmit}>
            <input
              type="text"
              placeholder="Add List"
              value={nameList}
              onChange={namingList}
            />
          </form>
        </div>
        <div className="list-container">
          <TodoList
            setLists={setLists}
            lists={lists}
            handleRemove={handleRemove}
            handleEdit={handleEdit}
            editingChange={editingChange}
            editingSubmit={editingSubmit}
            currentValue={currentValue}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            removeList={removeList}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
