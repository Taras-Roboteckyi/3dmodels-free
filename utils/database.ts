import mongoose from "mongoose";

let isConnected = false; //track the connection status(відстежувати стан підключення)

export const connectToDB = async () => {
  //Підключення до бази данних
  //Спершу налаштовуємо moongose. Рекомендовано писати strictQuery щоб не вибивало червоним в консолі
  mongoose.set("strictQuery", true);

  //Перевіряєм чи ми підключені
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  //Якщо ми не підключені до бази, тоді.....
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      //Налаштовуємо опції підключення
      dbName: "model3d_app_db", //MongoDB дозволяє підключитися до будь-якої бази в кластері — і якщо такої бази ще нема, вона створиться автоматично при першому збереженні даних.
    });

    isConnected = true;

    console.log("✅ MongoDB connected");
  } catch (error) {
    console.log("❌ MongoDB connection error:", error);
    //Шукаєм помилку при підключені
  }
};
