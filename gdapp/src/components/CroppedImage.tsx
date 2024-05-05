import React, { useState, useEffect } from "react";

interface Props {
  imageSource: string;
  difficulty2: number;
  distinction?: string;
  cropX: number;
  cropY: number;
  cropWidth: number;
  cropHeight: number;
}

export const CroppedImage = ({
  cropX,
  cropY,
  cropHeight,
  cropWidth,
  imageSource,
}: Props) => {
  const [croppedImageSrc, setCroppedImageSrc] = useState<string>("");

  useEffect(() => {
    const img = new Image();
    img.src = imageSource;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = cropWidth;
      canvas.height = cropHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(
          img,
          cropX,
          cropY,
          cropWidth,
          cropHeight,
          0,
          0,
          cropWidth,
          cropHeight
        );
        setCroppedImageSrc(canvas.toDataURL());
      }
    };
  }, [imageSource, cropX, cropY, cropWidth, cropHeight]);

  return (
    <div>
      <img height="90vh" src={croppedImageSrc} alt="Cropped" />
    </div>
  );
};

export default CroppedImage;
