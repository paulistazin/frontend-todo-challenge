import { useReducer, useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "../App.css";
import { AddTodoTaskButton } from "../components/AddTodoTaskButton.tsx";
import { TodoColumn } from "../components/TodoColumn.tsx";
import {
  mockTasks,
  getPendingTasks,
  getCompletedTasks,
  getInProgressTasks,
} from "../helpers/helpers.ts";
import { AddTodoTaskModal } from "../components/AddTodoTaskModal.tsx";
import { taskReducer, initialTaskState } from "../reducers/taskReducer.ts";

const simulateApiCall = async () => {
  await Promise.resolve(setTimeout(() => {}, 1500));
};

function App() {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    simulateApiCall().then(() => setLoading(false));
  }, []);

  // Inicializa com os dados mock na primeira renderização
  useEffect(() => {
    dispatch({ type: "SET_TASKS", payload: mockTasks });
  }, []);

  const pendingTasks = getPendingTasks(state.tasks);
  const inProgressTasks = getInProgressTasks(state.tasks);
  const completedTasks = getCompletedTasks(state.tasks);

  const handleToggleTask = (taskId: string) => {
    dispatch({ type: "TOGGLE_TASK", payload: taskId });
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch({ type: "DELETE_TASK", payload: taskId });
  };

  const handleMoveTask = (taskId: string, newStatus: ColumnType) => {
    dispatch({ type: "MOVE_TASK", payload: { taskId, newStatus } });
  };

  const handleEditTask = (taskId: string) => {
    setEditingTaskId(taskId);
    setOpenModal(true);
  };

  const getEditingTask = () => {
    return editingTaskId
      ? state.tasks.find((task) => task.id === editingTaskId)
      : null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-row p-8 gap-4 justify-center">
        <div className="bg-gray-200 rounded-lg shadow-md p-4 w-72 mx-2 animate-pulse" />
        <div className="bg-gray-200 rounded-lg shadow-md p-4 w-72 mx-2 animate-pulse" />
        <div className="bg-gray-200 rounded-lg shadow-md p-4 w-72 mx-2 animate-pulse" />
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-row p-8 gap-4 justify-center">
          <AddTodoTaskButton onClick={() => setOpenModal(true)} />
          <TodoColumn
            title="A Fazer"
            tasks={pendingTasks}
            columnType="todo"
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onMoveTask={handleMoveTask}
            onEditTask={handleEditTask}
          />
          <TodoColumn
            title="Em Progresso"
            tasks={inProgressTasks}
            columnType="inProgress"
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onMoveTask={handleMoveTask}
            onEditTask={handleEditTask}
          />
          <TodoColumn
            title="Concluídas"
            tasks={completedTasks}
            columnType="done"
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onMoveTask={handleMoveTask}
            onEditTask={handleEditTask}
          />
        </div>
        {openModal && (
          <AddTodoTaskModal
            onClose={() => {
              setOpenModal(false);
              setEditingTaskId(null);
            }}
            onAddTask={(task) => {
              if (editingTaskId) {
                // Editando tarefa existente
                dispatch({
                  type: "UPDATE_TASK",
                  payload: {
                    ...task,
                    id: editingTaskId,
                  },
                });
              } else {
                // Adicionando nova tarefa
                dispatch({ type: "ADD_TASK", payload: task });
              }
              setOpenModal(false);
              setEditingTaskId(null);
            }}
            editingTask={getEditingTask()}
          />
        )}
      </div>
    </DndProvider>
  );
}

export default App;
