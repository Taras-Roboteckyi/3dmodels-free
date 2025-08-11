import UploadsHeader from "./UploadsHeader";
import UploadCard from "./UploadCard";
import UploadDropzone from "./UploadDropzone";

export default function UploadsPage() {
  const files = [
    { name: "model1.glb", date: "2025-08-11", size: "2.4 MB", preview: "..." },
    { name: "texture.jpg", date: "2025-08-09", size: "1.1 MB", preview: "..." },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <UploadsHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.map((file, idx) => (
          <UploadCard key={idx} {...file} />
        ))}
      </div>
      <UploadDropzone />
    </div>
  );
}
