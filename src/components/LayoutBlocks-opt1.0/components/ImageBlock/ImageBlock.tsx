import React from 'react';
import './ImageBlock.css';

interface ImageBlockProps {
  src: string;
  alt: string;
  maxWidth?: string;
  maxHeight?: string;
}

export const ImageBlock: React.FC<ImageBlockProps> = ({
  src,
  alt,
  maxWidth = '100%',
  maxHeight = '100%',
}) => {
  return (
    <div className="image-block">
      <div className="image-block__control">Contrôle 1</div>
      <div className="image-block__control">Contrôle 2</div>
      <div className="image-block__control">Contrôle 3</div>
      <div className="image-block__content">
        <div className="image-container">
          <img src={src} alt={alt} className="responsive-image" style={{ maxWidth, maxHeight }} />
        </div>
      </div>
    </div>
  );
};
