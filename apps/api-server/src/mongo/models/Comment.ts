import { Schema, model, Types } from "mongoose";

export interface CommentDoc {
  _id: Types.ObjectId;
  boardId: Types.ObjectId;
  taskId: Types.ObjectId;
  authorId: number;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<CommentDoc>(
  {
    boardId: { type: Schema.Types.ObjectId, ref: "Board", required: true, index: true },
    taskId: { type: Schema.Types.ObjectId, ref: "Task", required: true, index: true },
    authorId: { type: Number, required: true, index: true },
    body: { type: String, required: true },
  },
  { timestamps: true }
);

CommentSchema.index({ taskId: 1, createdAt: 1 });

export const Comment = model<CommentDoc>("Comment", CommentSchema);
