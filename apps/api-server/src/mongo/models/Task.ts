import { Schema, model, Types } from "mongoose";

export interface TaskDoc {
  _id: Types.ObjectId;
  boardId: Types.ObjectId;
  title: string;
  description?: string;
  status: "todo" | "doing" | "done";
  assignees: number[];
  dueDate?: Date;
  order: number;                 // for sorting in lists
  createdBy: number;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<TaskDoc>(
  {
    boardId: { type: Schema.Types.ObjectId, ref: "Board", required: true, index: true },
    title: { type: String, required: true },
    description: String,
    status: { type: String, enum: ["todo", "doing", "done"], default: "todo", index: true },
    assignees: { type: [Number], default: [], index: true },
    dueDate: Date,
    order: { type: Number, default: 0, index: true },
    createdBy: { type: Number, required: true },
  },
  { timestamps: true }
)

TaskSchema.index({boardId: 1, order: 1})

export const Task = model<TaskDoc>('Task', TaskSchema)