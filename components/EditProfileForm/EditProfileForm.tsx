import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
  surname: string;
  description: string;
};

type EditProfileFormProps = {
  initialData: {
    name: string;
    surname: string;
    description: string;
  };
  onSubmit: (formData: FormData) => void | Promise<void>;
};

const EditProfileForm = ({ initialData, onSubmit }: EditProfileFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: initialData,
  });

  const onValidSubmit = (data: FormValues) => {
    const formData = new FormData(); //стандартний Web API, який дозволяє створювати об'єкт з полями форми. FormData — зручно передає текст і файли на бекенд
    formData.append("name", data.name); // додає текстове поле до FormData
    formData.append("surname", data.surname);
    formData.append("description", data.description);

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(onValidSubmit)} className="space-y-4">
      <div>
        <label>Ім’я:</label>
        <input
          type="text"
          placeholder="Введіть ім’я"
          {...register("name", {
            required: "Ім’я обов’язкове",
            minLength: { value: 2, message: "Мінімум 2 символи" },
          })}
          className="border p-2 w-full rounded"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label>Прізвище:</label>
        <input
          type="text"
          placeholder="Введіть прізвище"
          {...register("surname", {
            minLength: { value: 2, message: "Мінімум 2 символи" },
          })}
          className="border p-2 w-full rounded"
        />
        {errors.surname && (
          <p className="text-red-500 text-sm">{errors.surname.message}</p>
        )}
      </div>

      <div>
        <label>Опис:</label>
        <textarea
          placeholder="Коротко про себе"
          rows={4}
          {...register("description", {
            maxLength: { value: 500, message: "Максимум 500 символів" },
          })}
          className="border p-2 w-full rounded"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Зберегти зміни
      </button>
    </form>
  );
};

export default EditProfileForm;
