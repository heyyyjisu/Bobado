export type Todo = {
  text: string;
  _id: string;
  date: Date;
  isCompleted: boolean;
  category: "important" | "canwait" | "deadline" | "habit" | "uncategorized";
  recurring: boolean;
  deadline: Date | null;
};
