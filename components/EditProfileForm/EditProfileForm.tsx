import React from "react";
import { useState } from "react";

type EditProfileFormProps = {
  initialData: {
    name: string;
    surname: string;
    description: string;
  };
  onSubmit: (updatedData: FormData) => void | Promise<void>;
};

const EditProfileForm = ({ initialData, onSubmit }: EditProfileFormProps) => {
  const [name, setName] = useState(initialData.name || "");
  const [surname, setSurname] = useState(initialData.surname || "");
  const [description, setDescription] = useState(initialData.description || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(); //стандартний Web API, який дозволяє створювати об'єкт з полями форми. FormData — зручно передає текст і файли на бекенд
    formData.append("name", name); // додає текстове поле до FormData
    formData.append("surname", surname);
    formData.append("description", description);

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Ім’я:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>Прізвище:</label>
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>Опис:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Зберегти зміни
      </button>
    </form>
  );
};

export default EditProfileForm;
