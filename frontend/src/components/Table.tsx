import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

interface TableProps {
  columns: string[];
  currentPage?: number;
  totalPages?: number;
  isPagination?: boolean;
  data: { [key: string]: string | number }[] | undefined | null | false | [];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onHandlePrevPage?: () => void;
  onHandleNextPage?: () => void;
}

export default function Table({
  columns,
  data,
  currentPage,
  totalPages,
  isPagination,
  onEdit,
  onDelete,
  onHandlePrevPage,
  onHandleNextPage,
}: TableProps) {
  return (
    <div>
      <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
        <table className="min-w-full ">
          <thead className="bg-neutral-500 ">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-200 sm:pl-6 "
                >
                  {column}
                </th>
              ))}
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className=" bg-neutral-700 ">
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="">
                  {columns.map((_, colIndex) => (
                    <td
                      key={colIndex}
                      className="max-w-md px-6 py-3 text-sm text-gray-200 text-wrap align-top"
                    >
                      {Object.values(item)[colIndex]}{" "}
                    </td>
                  ))}
                  <td className="px-4 py-2 gap-2 flex flex-row items-center justify-end w-full">
                    <button
                      onClick={() => {
                        onEdit(item.id as number);
                      }}
                      className="hover:bg-neutral-500 rounded-full p-2"
                    >
                      <PencilIcon className="h-5 w-5 text-gray-100" />
                    </button>

                    <button
                      onClick={() => {
                        onDelete(item.id as number);
                      }}
                      className="hover:bg-neutral-500 rounded-full p-2"
                    >
                      <TrashIcon className="h-5 w-5 text-gray-100" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-6 py-3 text-sm text-gray-200 text-center"
                >
                  Não há dados disponíveis
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isPagination && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            onClick={onHandlePrevPage}
            disabled={currentPage === 1}
            className={`p-2 rounded-full ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-neutral-500"
            }`}
          >
            <ArrowLeftIcon className="h-5 w-5 text-gray-200" />
          </button>

          <span className="text-gray-200 text-sm">
            Página {currentPage} de {totalPages}
          </span>

          <button
            onClick={onHandleNextPage}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-full ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-neutral-500"
            }`}
          >
            <ArrowRightIcon className="h-5 w-5 text-gray-200" />
          </button>
        </div>
      )}
    </div>
  );
}
