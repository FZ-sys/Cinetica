import Image from "next/image";
export interface MovieImage {
  filePath: string;
}

export const ImageGallery = ({ images }: { images: MovieImage[] }) => {
  return (
    <div className="flex gap-4 overflow-auto no-scrollbar h-[400px]">
      {images.map((image, index) => (
        <div key={index} className="w-[600px] flex-shrink-0">
          <Image
            src={`https://image.tmdb.org/t/p/w500/${image.filePath}`}
            alt={`Image ${index + 1}`}
            width={600}
            height={400}
            className="w-full h-auto object-cover rounded-lg border-4 border-pink-200 shadow-md"
          />
        </div>
      ))}
    </div>
  );
};
