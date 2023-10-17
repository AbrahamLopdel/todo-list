export type TodoType = {
  id: string;
  todoTitle: string;
  todoDescription?: string;
  todoDueDate?: Date;
  todoNotification?: {
    oneDay?: boolean;
    threeDays?: boolean;
    week?: boolean;
    month?: boolean;
  };
};
