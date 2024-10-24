import React from "react";
import Image from "next/image"; // Import the Image component

interface CardProps {
  title: string;
  value: string;
  imgsrc: string;
  icon: JSX.Element;
  bgColor: string;
  classProps: string;
}

const Card: React.FC<CardProps> = ({
  title,
  value,
  icon,
  imgsrc,
  bgColor,
  classProps,
}) => {
  return (
    <div
      className={`${classProps} flex items-center justify-between space-x-4 rounded-lg p-6 text-white shadow-md`}
    >
      <div className="border-rounded-full rounded-lg border border-white p-4">
        <Image
          src={imgsrc}
          alt="Logo"
          width={20} // Specify width
          height={20} // Specify height
          className={`w-5 overflow-hidden transition-all duration-300`}
        />
      </div>
      <div className="justify-end">
        <h3 className="text-right text-lg">{title}</h3>
        <p className="text-right text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default Card;
