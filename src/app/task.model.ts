export interface Task {
  id?: number;
  documentId?: string;
  taskName: string;
  isCompleted: boolean;
  isReadOnly: boolean;
  assignedTo?: number | null;
  assignedToName?: string; // Make sure this exists
}
