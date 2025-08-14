export default function UploadDropzone() {
  return (
    <div className="mt-10 border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer hover:bg-gray-50 transition">
      <p className="text-gray-600">
        Перетягніть файли сюди або натисніть, щоб завантажити
      </p>
      <input type="file" className="hidden" />
    </div>
  );
}
