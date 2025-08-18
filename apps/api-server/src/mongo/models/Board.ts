import { Schema, model, Types } from "mongoose";

export interface BoardDoc {
  _id: Types.ObjectId;
  name: string;
  ownerId: number;              // from Postgres users.id
  members: number[];            // user IDs
  createdAt: Date;
  updatedAt: Date;
}

const BoardSchema = new Schema<BoardDoc>(
  {
    name: { type: String, required: true },
    ownerId: { type: Number, required: true, index: true},
    members: { type: [Number], default: [], index: true}
  },
  {
    timestamps: true
  }
)

BoardSchema.index({ownerId: 1, members: 1})

export const Board = model<BoardDoc>('Board', BoardSchema)