import styles from "./ListTask.module.css";
import { ITaks } from "../App";

import { Trash, CheckCircle, Circle } from "phosphor-react";

interface Props {
  task: ITaks;
  onHandleDeleteTasks: (deleteTaks: ITaks) => void;
  onComplete: (taskId: string) => void;
}

export function ListTask({ task, onHandleDeleteTasks, onComplete }: Props) {
  function handleDeleteTasks() {
    onHandleDeleteTasks(task);
  }

  function handleIsCompleted() {
    onComplete(task.id);
  }

  return (
    <div className={styles.container}>
      <div className={styles.task}>
        <button className={styles.done} onClick={handleIsCompleted}>
          {task.isCompleted ? (
            <CheckCircle size={20} color="#5e60ce" />
          ) : (
            <Circle size={20} />
          )}
        </button>

        <p className={task.isCompleted ? styles.isCompleted : ""}>
          {task.title}
        </p>

        <button onClick={handleDeleteTasks} className={styles.trash}>
          <Trash size={20} />
        </button>
      </div>
    </div>
  );
}
