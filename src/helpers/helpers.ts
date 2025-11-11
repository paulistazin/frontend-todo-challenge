// Interface para Task (exportada para reutilização)
export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  status: "todo" | "inProgress" | "done";
}

// Tipos de status das colunas
export type ColumnType = "todo" | "inProgress" | "done";

// Mock de tarefas para demonstração
export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Implementar autenticação de usuário",
    description: "Criar sistema de login e registro com JWT",
    completed: false,
    status: "todo",
  },
  {
    id: "2",
    title: "Criar componente de header",
    description: "Header responsivo com navegação",
    completed: true,
    status: "done",
  },
  {
    id: "3",
    title: "Configurar banco de dados",
    description: "Setup do PostgreSQL e migrations iniciais",
    completed: false,
    status: "inProgress",
  },
  {
    id: "4",
    title: "Implementar CRUD de tarefas",
    description: "Criar, ler, atualizar e deletar tarefas",
    completed: false,
    status: "todo",
  },
  {
    id: "5",
    title: "Adicionar testes unitários",
    description: "Cobertura de testes para componentes principais",
    completed: false,
    status: "todo",
  },
  {
    id: "6",
    title: "Configurar deploy",
    description: "Setup do CI/CD e deploy automático",
    completed: true,
    status: "done",
  },
  {
    id: "7",
    title: "Documentar API",
    description: "Criar documentação completa da API REST",
    completed: false,
    status: "inProgress",
  },
  {
    id: "8",
    title: "Otimizar performance",
    description: "Lazy loading e otimizações de bundle",
    completed: false,
    status: "todo",
  },
];

// Função auxiliar para filtrar tarefas por status
export const getTasksByStatus = (tasks: Task[], status: ColumnType): Task[] => {
  return tasks.filter((task) => task.status === status);
};

// Função auxiliar para obter tarefas pendentes
export const getPendingTasks = (tasks: Task[]): Task[] => {
  return getTasksByStatus(tasks, "todo");
};

// Função auxiliar para obter tarefas em progresso
export const getInProgressTasks = (tasks: Task[]): Task[] => {
  return getTasksByStatus(tasks, "inProgress");
};

// Função auxiliar para obter tarefas concluídas
export const getCompletedTasks = (tasks: Task[]): Task[] => {
  return getTasksByStatus(tasks, "done");
};

// Função para alternar status de uma tarefa (compatibilidade)
export const toggleTaskStatus = (tasks: Task[], taskId: string): Task[] => {
  return tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
};
