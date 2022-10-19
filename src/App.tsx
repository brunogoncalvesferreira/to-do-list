import styles from "./App.module.css";
import icon_button from "./assets/icon-button.svg";

import { useState, useEffect, FormEvent } from "react";

import { Header } from "./components/Header";
import { Empty } from "./components/Empty";
import { ListTask } from "./components/ListTask";

export interface ITaks {
  id: string;
  title: string;
  isCompleted: boolean;
}

export function App() {
  const [onChangeText, setOnChangeText] = useState("");
  const [tasks, setTasks] = useState<ITaks[]>([]);

  function loadTasksSaved() {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }

  useEffect(() => {
    loadTasksSaved();
  }, []);

  function setTasksSaved(newTasks: ITaks[]) {
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }

  function handleAddNewTasks(event: FormEvent) {
    event.preventDefault();

    setTasksSaved([
      ...tasks,
      {
        title: onChangeText,
        id: crypto.randomUUID(),
        isCompleted: false,
      },
    ]);
    setOnChangeText("");
  }

  function handleDeleteTasks(deteleToTasks: ITaks) {
    const actionDeleteTasks = tasks.filter((task) => {
      return task !== deteleToTasks;
    });
    setTasksSaved(actionDeleteTasks);
  }

  function toggleTaskCompletedById(taskId: string) {
    const actionIsCompleted = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }
      return task;
    });
    setTasksSaved(actionIsCompleted);
  }

  const taskQuantity = tasks.length;
  const completedTasks = tasks.filter((tasks) => tasks.isCompleted).length;

  return (
    <div className={styles.container}>
      <Header />

      <form>
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          onChange={(e) => setOnChangeText(e.target.value)}
          value={onChangeText}
        />

        <button
          onClick={handleAddNewTasks}
          disabled={onChangeText.length === 0}
        >
          Criar <img src={icon_button} alt="Icone" />
        </button>
      </form>

      <div className={styles.info}>
        <header>
          <div className={styles.created}>
            <strong>Tarefas criadas</strong>
            <small>{taskQuantity}</small>
          </div>

          <div className={styles.completed}>
            <strong>Concluídas</strong>
            <small>
              {completedTasks} de {taskQuantity}
            </small>
          </div>
        </header>
      </div>

      {tasks.length === 0 && <Empty />}

      {tasks.map((task) => {
        return (
          <ListTask
            task={task}
            onHandleDeleteTasks={handleDeleteTasks}
            onComplete={toggleTaskCompletedById}
            key={task.title}
          />
        );
      })}
    </div>
  );
}
