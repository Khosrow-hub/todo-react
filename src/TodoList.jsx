import { useState } from "react";
import pic from "./assets/delete.png";
import up from "./assets/up-arrow.png";
import down from "./assets/arrows.png";

function TodoList() {
  const [task, setTask] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddTask = () => {
    if (inputValue.trim() !== "") {
      setTask([...task, inputValue]);
      setInputValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const handleRemoveTask = (index) => {
    setTask(task.filter((_, i) => i !== index));
  };

  const handleMoveUp = (index) => {
    if (index > 0) {
      const updateUp = [...task];
      [updateUp[index], updateUp[index - 1]] = [
        updateUp[index - 1],
        updateUp[index],
      ];

      setTask(updateUp);
    }
  };

  const hanldeMoveDown = (index) => {
    if (index < task.length - 1) {
      const updateDown = [...task];
      [updateDown[index], updateDown[index + 1]] = [
        updateDown[index + 1],
        updateDown[index],
      ];

      setTask(updateDown);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-600 flex flex-col justify-center items-center">
      <div className="bg-white rounded-sm shadow-lg shadow-gray-300 p-20 flex flex-col justify-center items-center gap-10">
        <h1 className="text-2xl italic">To Do List</h1>

        <div>
          <div className="flex">
            {" "}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter a task"
              className="rounded-l-2xl p-2 border w-85"
            />
            <button
              onClick={handleAddTask}
              className="bg-gray-600 px-4 py-2 rounded-r-2xl text-white hover:bg-gray-700 transition-colors"
            >
              add
            </button>
          </div>

          <ul>
            {task.map((taskList, index) => {
              return (
                <li
                  key={index}
                  className="my-2 bg-gray-200 p-2 rounded-sm w-100 flex justify-between flex-row break-words gap-5"
                >
                  <span className="break-words max-w-[200px]">{taskList}</span>{" "}
                  <div className="flex flex-row justify-center items-center gap-2 flex-shrink-0">
                    <img
                      src={up}
                      alt="move up icon"
                      className={`w-5 h-5.5 cursor-pointer ${
                        index === 0
                          ? "opacity-30 cursor-not-allowed"
                          : "hover:opacity-70"
                      }`}
                      onClick={() => index > 0 && handleMoveUp(index)}
                    />
                    <img
                      src={down}
                      alt="move down icon"
                      className={`w-5 h-5 cursor-pointer ${
                        index === task.length - 1
                          ? "opacity-30 cursor-not-allowed"
                          : "hover:opacity-70"
                      }`}
                      onClick={() =>
                        index < task.length - 1 && hanldeMoveDown(index)
                      }
                    />
                    <img
                      src={pic}
                      alt="delete sign"
                      onClick={() => handleRemoveTask(index)}
                      className="w-5 h-5 cursor-pointer hover:opacity-70"
                    />
                  </div>
                </li>
              );
            })}
          </ul>

          {task.length === 0 && (
            <p className="text-center text-gray-500 mt-4">
              No tasks yet. Add one above!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
