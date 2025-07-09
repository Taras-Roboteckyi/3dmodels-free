import { Schema, model, models } from "mongoose";

//User.ts — для моделі користувача
const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  image: { type: String },
  surname: { type: String }, // Додаткове поле, яке користувач може редагувати
  description: { type: String }, // Додаткове поле, яке користувач може редагувати

  createdAt: { type: Date, default: Date.now },
});

export const User = models.User || model("User", UserSchema);
