import React from "react";
import { useState } from "react";

type EditProfileFormProps = {
  initialData: {
    name: string;
    surname: string;
    description: string;
    avatarUrl: string;
  };
  onSubmit: (updatedData: FormData) => void;
};

const EditProfileForm = ({ initialData, onSubmit }: EditProfileFormProps) => {
  const [name, setName] = useState(initialData.name);
  const [surname, setSurname] = useState(initialData.surname);
  const [description, setDescription] = useState(initialData.description);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(initialData.avatarUrl);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(); //стандартний Web API, який дозволяє створювати об'єкт з полями форми
    formData.append("name", name); // додає текстове поле
    formData.append("surname", surname);
    formData.append("description", description);
    if (avatar) formData.append("avatar", avatar);

    onSubmit(formData);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return <div>EditProfileForm</div>;
};

export default EditProfileForm;
