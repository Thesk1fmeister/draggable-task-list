import React, { useState } from "react";
import "../App.css";
import { FiTrash2, FiEdit, FiPlusCircle } from "react-icons/fi";

function TodoList({
  lists,
  setLists,
  handleRemove,
  handleEdit,
  editingChange,
  editingSubmit,
  currentValue,
  handleChange,
  handleSubmit,
  removeList,
}) {
  const [currentList, setCurrentList] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  const dragOverHandler = (e) => {
    e.preventDefault();
  };
  const dragLeaveHandler = (e) => {};
  const dragStartHandler = (e, list, task) => {
    setCurrentList(list);
    setCurrentItem(task);
  };
  const dragEndHandler = (e) => {};
  const dropHandler = (e, list, task) => {
    e.preventDefault();
    const currentIndex = currentList.tasks.indexOf(currentItem);
    currentList.tasks.splice(currentIndex, 1);
    const dropIndex = list.tasks.indexOf(task);
    list.tasks.splice(dropIndex + 1, 0, currentItem);
    setLists(
      lists.map((l) => {
        if (l.id === list.id) {
          return list;
        }
        if (l.id === currentList.id) {
          return currentList;
        }
        return l;
      })
    );
  };

  return (
    <>
      {lists.map((list) => (
        <div className="todo-list" key={list.id}>
          <div className="task-input">
            <form onSubmit={(e) => handleSubmit(e, list)}>
              <input
                type="text"
                placeholder="Add task"
                value={list.value}
                onChange={(e) => handleChange(e, list)}
              />
            </form>
          </div>
          <h2>{list.listName}</h2>

          <ul>
            {list.tasks.map((task) => (
              <li
                key={task.id}
                draggable={true}
                onDragOver={dragOverHandler}
                onDragLeave={dragLeaveHandler}
                onDragStart={(e) => dragStartHandler(e, list, task)}
                onDragEnd={dragEndHandler}
                onDrop={(e) => dropHandler(e, list, task)}
              >
                {!task.edit ? (
                  <p>{task.name}</p>
                ) : (
                  <form>
                    <input
                      className="edit"
                      type="text"
                      onChange={editingChange}
                    />
                    <FiPlusCircle
                      className="submit-edit"
                      onClick={() => {
                        editingSubmit(task);
                      }}
                    />
                  </form>
                )}
                <span>
                  <FiTrash2 onClick={() => handleRemove(task)} />
                  <FiEdit onClick={() => handleEdit(task)} />
                </span>
              </li>
            ))}
          </ul>
          <div className="delete-list">
            <FiTrash2 onClick={() => removeList(list)} />
          </div>
        </div>
      ))}
    </>
  );
}

export default TodoList;
