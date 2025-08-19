import { Schema, model, InferSchemaType } from "mongoose";

const DownloadSchema = new Schema(
  {
    filename: { type: String, required: true },
    url: { type: String, required: true },
    user: { type: String, required: true },
    model: { type: String, required: true },
  },
  { timestamps: true }
);

export type DownloadDocument = InferSchemaType<typeof DownloadSchema>;

export default model<DownloadDocument>("Download", DownloadSchema);
