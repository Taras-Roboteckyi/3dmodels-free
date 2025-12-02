import mongoose, { Schema, model, models } from "mongoose";

const Model3DSchema = new Schema({
  //привязка до користувача
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  modelUrl: {
    type: String,
    required: true,
  },
  // Одне головне превʼю для списку моделей
  thumbnailUrl: {
    type: String,
    required: true,
  },

  // Масив усіх превʼю-картинок (2–3 фото)
  previewImages: {
    type: [String],
    default: [],
  },

  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Model3D = models.Model3D || model("Model3D", Model3DSchema);

export default Model3D;
