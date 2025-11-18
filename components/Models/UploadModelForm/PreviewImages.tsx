import Image from "next/image";

type PreviewImagesProps = {
  images: File[];
};

export function PreviewImages({ images }: PreviewImagesProps) {
  if (images.length === 0) return null;

  return (
    <div className="mt-4 flex gap-3 flex-wrap">
      {images.map((img, i) => {
        const previewUrl = URL.createObjectURL(img);

        return (
          <div
            key={i}
            className="w-24 h-24 border rounded overflow-hidden relative"
          >
            <Image
              src={previewUrl}
              alt={`preview-${i}`}
              fill
              className="object-cover"
              unoptimized // <-- дозволяє blob:// URL
            />
          </div>
        );
      })}
    </div>
  );
}
