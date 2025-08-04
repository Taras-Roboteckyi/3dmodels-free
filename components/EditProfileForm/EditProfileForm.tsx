import React, { useEffect } from "react";

import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
  surname: string;
  description: string;
};

type EditProfileFormProps = {
  initialData: FormValues;

  onSubmit: (formData: FormData) => void | Promise<void>;
};

const EditProfileForm = ({ initialData, onSubmit }: EditProfileFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: initialData,
  });

  // 👇 ОНОВЛЮЄ форму, якщо initialData змінюється
  useEffect(() => {
    console.log("initialData змінилось", initialData);
    reset(initialData);
  }, [initialData, reset]);

  const onValidSubmit = (data: FormValues) => {
    const formData = new FormData(); //стандартний Web API, який дозволяє створювати об'єкт з полями форми. FormData — зручно передає текст і файли на бекенд
    formData.append("name", data.name); // додає текстове поле до FormData
    formData.append("surname", data.surname);
    formData.append("description", data.description);

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onValidSubmit)}
      autoComplete="off"
      className="space-y-4"
    >
      <div /* className="max-w-md mx-auto px-4" */>
        <label>First Name:</label>
        <input
          type="text"
          placeholder="Enter a first name"
          {...register("name", {
            required: "The first name is required",
            minLength: { value: 2, message: "Minimum 2 characters" },
          })}
          className="border p-2 w-full rounded"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label>Last Name:</label>
        <input
          type="text"
          placeholder="Enter a last name"
          {...register("surname", {
            minLength: { value: 2, message: "Minimum 2 characters" },
          })}
          className="border p-2 w-full rounded"
        />
        {errors.surname && (
          <p className="text-red-500 text-sm">{errors.surname.message}</p>
        )}
      </div>

      <div>
        <label>Description:</label>
        <textarea
          placeholder="Briefly about myself"
          rows={4}
          {...register("description", {
            maxLength: { value: 500, message: "Maximum 500 characters" },
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
        Save changes
      </button>
    </form>
  );
};

export default EditProfileForm;
