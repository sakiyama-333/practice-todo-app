import { useState } from "react";
import "./styles.css";

export default function App() {
  const [enteredValue, setEnteredValue] = useState("");

  const onChangeEnteredValue = (event) => {
    setEnteredValue(event.target.value);
  };

  const [incompleteTask, setIncompleteTask] = useState([]);

  const [completeTask, setCompleteTask] = useState([]);

  const addTaskValue = () => {
    if (enteredValue === "") return;
    const newIncompleteTask = [...incompleteTask, enteredValue];
    setIncompleteTask(newIncompleteTask);
    setEnteredValue("");
  };

  const newArrayTask = (index) => {
    const newDeleteTask = [...incompleteTask];
    newDeleteTask.splice(index, 1);
    setIncompleteTask(newDeleteTask);
  };

  const doneTask = (index) => {
    newArrayTask();
    const newDoneTask = [...completeTask, incompleteTask[index]];
    setCompleteTask(newDoneTask);
  };

  const backTask = (index) => {
    const newBackTask = [...completeTask];
    newBackTask.splice(index, 1);
    setCompleteTask(newBackTask);

    const addBackTask = [...incompleteTask, completeTask[index]];
    setIncompleteTask(addBackTask);
  };
  return (
    <>
      {/* タスクを追加するエリア */}
      <div className="input-area">
        <input
          placeholder="入力してください"
          value={enteredValue}
          onChange={onChangeEnteredValue}
        />
        <button onClick={addTaskValue}>追加</button>
      </div>
      {/* 未完了のタスク */}
      <div className="incomplete-area">
        <p className="title">未完了のタスク</p>
        <ul>
          {incompleteTask.map((task, index) => {
            return (
              <li key={task}>
                <div className="list-row">
                  <p>{task}</p>
                  <button onClick={() => doneTask(index)}>完了</button>
                  <button onClick={() => newArrayTask(index)}>削除</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {/* 完了のタスク */}
      <div className="complete-area">
        <p className="title">完了のタスク</p>
        <ul>
          {completeTask.map((task, index) => {
            return (
              <li key={task}>
                <div className="list-row">
                  <p>{task}</p>
                  <button onClick={() => backTask(index)}>戻す</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
