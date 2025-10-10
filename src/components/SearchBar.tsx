"use client";

import { ChangeEvent } from "react";
import { FaSyncAlt } from "react-icons/fa";

export const SearchBar = ({
  value,
  onChange,
  placeholder,
  resetHandler,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  resetHandler?: () => void;
}) => {
  return (
    <div className="flex items-center gap-4">
      {/* Refresh/Reset button */}
      {typeof resetHandler === "function" ? (
        <button
          onClick={resetHandler}
          className="bg-gray-100 px-3 py-2 text-gray-500 hover:bg-gray-200 transition-colors"
        >
          <FaSyncAlt />
        </button>
      ) : null}

      {/* Serach Button */}
      <input
        type="text"
        className="border rounded px-3 py-2 w-72 outline-none focus:ring-2 focus:ring-violet-400"
        placeholder={placeholder || "Search..."}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
