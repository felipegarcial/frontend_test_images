import "./ImageCard.css";
import React from "react";
import { Image } from "../../types";

interface Props {
  image: Image;
  onLike: (id: number) => void;
}

const ImageCard: React.FC<Props> = ({ image, onLike }) => {
  return (
    <div className="image-card">

      <div className="diagonal-box">
        <span>{image.price} €</span>
      </div>

      <figure className="image-wrapper">
        <img src={image.main_attachment.small} alt={image.title} />
      </figure>

      <div className="likes-wrapper">
        <div
          className={`icon ${image.liked ? "icon-like" : "icon-no-like"}`}
          onClick={() => onLike(image.id)}
        >
          {image.liked ? "💚" : "👍"}
        </div>
        <div className="likes-count">{image.likes_count}</div>
      </div>

      <div className="information-card-wrapper">
        <h3>{image.title}</h3>
        <p>by {image.author}</p>
      </div>
    </div>
  );
};

export default ImageCard;
