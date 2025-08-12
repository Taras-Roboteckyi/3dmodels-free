export default function UploadsHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <h1 className="text-2xl font-bold">Завантаження</h1>
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Пошук файлів..."
          className="px-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Сортувати за датою</option>
          <option>Сортувати за назвою</option>
          <option>Сортувати за розміром</option>
        </select>
      </div>
    </div>
  );
}
