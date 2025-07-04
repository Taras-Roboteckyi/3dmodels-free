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

  return <div>EditProfileForm</div>;
};

export default EditProfileForm;
