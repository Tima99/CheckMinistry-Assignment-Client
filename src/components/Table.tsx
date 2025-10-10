"use client";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Table: React.FC<TableProps> = ({ columns, data, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="p-3 font-semibold">
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="p-3 text-center font-semibold">Actions</th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((row, idx) => (
              <tr
                key={idx}
                className="border-t hover:bg-gray-50 transition-colors duration-150"
              >
                {columns.map((col) => (
                  <td key={col.key} className="p-3 text-gray-700">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}

                {(onEdit || onDelete) && (
                  <td className="p-3 text-center flex justify-center gap-3">
                    {onEdit && (
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => onEdit(row)}
                      >
                        <FaEdit size={16} />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => onDelete(row)}
                      >
                        <FaTrash size={16} />
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + 1}
                className=" py-4 text-center text-gray-500"
              >
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
