import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Select, { Option } from "../Components/Select";
import SearchBar from "../Components/SearchBar";
import AddButton from "../Components/AddButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "@/services/Api";

type OrderView = {
  id: number;
  order_date: Date;
  max_return_date: Date;
  user: string;
};

const data: OrderView[] = [
  {
    id: 1,
    order_date: new Date(),
    max_return_date: new Date(),
    user: "skibidi",
  },
];

const columnHelper = createColumnHelper<OrderView>();

const columns = [
  columnHelper.accessor("order_date", {
    header: "Order Date",
    cell: (info) => info.getValue().toLocaleDateString(),
  }),
  columnHelper.accessor("max_return_date", {
    header: "Max Return Date",
    cell: (info) => info.getValue().toLocaleDateString(),
  }),
  columnHelper.accessor("user", {
    header: "User",
    cell: (info) => info.getValue(),
  }),
];

const Orders = () => {
  const navigation = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<Option | null>(null);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState<OrderView[]>([]);

  const paginatedData = data.slice(page * pageSize, (page + 1) * pageSize);

  const table = useReactTable<OrderView>({
    columns,
    data: paginatedData,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(data.length / pageSize),
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await Api.get<OrderView[]>("/books", {
        params: {
          page,
          page_size: pageSize,
        },
      });
      setData(response.data);
    };
    fetchData();
  }, [page, pageSize]);

  const handleSubmit = () => {
    console.log("search", search);
    console.log("filter", filter);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Orders List</h2>
      {/* Filtros */}
      <div className="px-4 bg-gray-200 rounded-xl mb-4 h-fit pt-2">
        <span className="text-xl ml-2 mt-6">Filter by</span>
        <div className="mt-1 flex justify-between space-x-4 px-2">
          <Select
            options={[
              { value: "title", label: "Title" },
              { value: "isbn", label: "ISBN" },
              { value: "edition", label: "Edition" },
            ]}
            placeholder="Select a filter option"
            onChange={setFilter}
          />
          <SearchBar search={search} setSearch={setSearch} />
          <div className="place-content-center">
            <button
              type="button"
              className="px-4 py-3 bg-blue-400 rounded-xl h-fit"
              onClick={() => handleSubmit}
            >
              Search
            </button>
          </div>
          <AddButton object="document" />
        </div>
        <div className="flex space-x-2 mb-2 px-2" />
      </div>
      {/* Tabla */}
      <div className="mb-4 bg-gray-200 rounded-xl p-4">
        <div className="overflow-x-auto bg-gray-200 p-4">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-gray-200">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      onDoubleClick={() => {
                        navigation(
                          `/dashboard/document/edit/${row.original.id}`,
                        );
                      }}
                      className="px-6 cursor-pointer py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Paginación */}
      <div className="flex items-center justify-between mt-4">
        <button
          type="button"
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page + 1} of {Math.ceil(data.length / pageSize)}
        </span>
        <button
          type="button"
          onClick={() =>
            setPage((prev) =>
              Math.min(prev + 1, Math.ceil(data.length / pageSize) - 1),
            )
          }
          disabled={page >= Math.ceil(data.length / pageSize) - 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <div className="flex items-center mt-2">
        <label htmlFor="pageSize" className="mr-2">
          Rows per page:
        </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(0); // Reinicia a la primera página
          }}
          className="border rounded px-2 py-1"
        >
          {[5, 10, 15].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Orders;
