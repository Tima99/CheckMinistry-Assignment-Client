"use client";
import React from "react";
import { FaCheck } from "react-icons/fa";

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onSelect: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect(product.id)}
      className={`cursor-pointer border rounded-lg relative transition-all border-2 p-[1px]
        ${
          isSelected
            ? "border-transparent bg-gradient-to-r from-violet-400 to-pink-500"
            : "border-gray-100 bg-white"
        }`}
    >
      <div
        className={`rounded-lg p-3 h-full bg-white flex flex-col justify-between`}
      >
        <h3 className="font-semibold">{product.productName}</h3>
        {product.productDescription && (
          <p className="text-sm text-gray-600">{product.productDescription}</p>
        )}
      </div>

      {isSelected && (
        <div className="absolute top-2 right-2 bg-white rounded-full p-1">
          <FaCheck className="text-green-500 w-4 h-4" />
        </div>
      )}
    </div>
  );
};

export default ProductCard;
