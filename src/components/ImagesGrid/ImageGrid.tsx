/* eslint-disable @typescript-eslint/no-explicit-any */
import { Image } from '../../types';
import ImageCard from '../ImageCard/ImageCard'


interface ImageGridProps {
    images: Image[];
    handleLike: (id: number) => void;
  }

const ImageGrid = ({images , handleLike}:ImageGridProps) => {

  return (
    <div className="grid">
    {images.map((image) => (
      <ImageCard key={image.id} image={image} onLike={handleLike} />
    ))}
  </div>
  )
}

export default ImageGrid