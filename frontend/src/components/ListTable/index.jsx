import { Fragment } from "react";

export const ListTable = ({ columns, data, onEdit, onDelete }) => {
  const renderActionCell = (item, columnKey, index) => {
    if (columnKey === "edit") {
      return (
        <td key={`action-edit-${item.id}-${index}`} className="pl-4">
          <button
            className="bg-blue-400 px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors duration-100 ease-in"
            onClick={() => onEdit(item)}
          >
            Editar
          </button>
        </td>
      );
    }
    if (columnKey === "delete") {
      return (
        <td key={`action-delete-${item.id}-${index}`}>
          <button
            className="bg-red-400 px-4 py-2 rounded-lg hover:bg-red-500 transition-colors duration-100 ease-in"
            onClick={() => onDelete(item.id)}
          >
            Deletar
          </button>
        </td>
      );
    }
    return null;
  };

  const renderRegularCell = (item, column, index) => (
    <td key={`cell-${item.id}-${column.key}-${index}`} className="p-4">
      {item[column.key]}
    </td>
  );

  return (
    <table className="w-full table-auto border border-collapse border-slate-700 mt-12 text-slate-200">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th
              key={`header-${column.key}-${index}`}
              className="border border-slate-700 py-2"
              colSpan={column.key === "actions" ? 2 : 1}
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, rowIndex) => (
          <tr
            key={`row-${item.id}-${rowIndex}`}
            className="even:bg-slate-700 odd:bg-slate-600"
          >
            {columns.map((column, colIndex) => {
              if (column.key === "actions") {
                return (
                  <Fragment key={`actions-${item.id}-${colIndex}`}>
                    {renderActionCell(item, "edit", colIndex)}
                    {renderActionCell(item, "delete", colIndex)}
                  </Fragment>
                );
              }
              return renderRegularCell(item, column, colIndex);
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
