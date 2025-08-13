import Image from "next/image";

type UploadValues = {
  name: string;
  date: string;
  size: string;
  preview: string;
};
export default function UploadCard({
  name,
  date,
  size,
  preview,
}: UploadValues) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col">
      <Image src={preview} alt="Preview" className="rounded-lg mb-4" />
      <h2 className="font-semibold truncate">{name}</h2>
      <p className="text-sm text-gray-500">Завантажено: {date}</p>
      <p className="text-sm text-gray-500">Розмір: {size}</p>
      <div className="flex gap-2 mt-4">
        <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
          Переглянути
        </button>
        <button className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600">
          Скачати
        </button>
        <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
          Видалити
        </button>
      </div>
    </div>
  );
}
