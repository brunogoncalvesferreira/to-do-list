import styles from "./Empty.module.css";
import clipboard from "../assets/clipboard.svg";

export function Empty() {
  return (
    <div className={styles.container}>
      <div className={styles.divider}></div>
      <img src={clipboard} alt="icone" />
      <p>
        <span>Você ainda não tem tarefas cadastradas</span>
        Crie tarefas e organize seus itens a fazer
      </p>
    </div>
  );
}
