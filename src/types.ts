export interface TodoItem {
  id: string;
  task: string;
  completed: boolean;
}

export enum FilterOption {
  all,
  pending,
  completed
}
