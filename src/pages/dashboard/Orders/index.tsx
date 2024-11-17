import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Select, { Option } from "../Components/Select";
import SearchBar from "../Components/SearchBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "@/services/Api";

type OrderView = {
  id: number;
  order_date: string;
  max_return_date: string;
  user: string;
};

const columnHelper = createColumnHelper<OrderView>();

const Orders = () => {
  const navigation = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<Option | null>(null);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState<OrderView[]>([]);
  const [filteredData, setFilteredData] = useState<OrderView[]>([]);

  const paginatedData = filteredData.slice(
    page * pageSize,
    (page + 1) * pageSize,
  );

  const columns = [
    columnHelper.accessor("order_date", {
      header: "Order Date",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("max_return_date", {
      header: "Max Return Date",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("user", {
      header: "User",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("id", {
      cell: (info) => (
        <button
          type="button"
          className="px-4 py-2 bg-red-400 rounded-xl"
          onClick={() => {
            handleDestroy(info.getValue());
          }}
        >
          {"CANCEL"}
        </button>
      ),
    }),
  ];

  const handleDestroy = async (id: number) => {
    console.log("Deleting document", id);
    const response = await Api.post(`/dashboard/order/${id}`);
    console.log("Document deleted", response);
    if (response.status === 200) {
      setData(data.filter((order) => order.id !== id));
    } else {
      console.error("Error deleting document", response.data);
    }
  };

  const table = useReactTable<OrderView>({
    columns,
    data: paginatedData,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(filteredData.length / pageSize),
  });

  const fetchData = async () => {
    const response = await Api.get<OrderView[]>("/dashboard/orders", {});
    setData(response.data);
    setFilteredData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilterAndSearch = () => {
    let tempData = [...data];

    // Filtrar por usuario
    if (search) {
      tempData = tempData.filter((order) =>
        order.user.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Ordenar según el filtro seleccionado
    if (filter) {
      if (filter.value === "orderDateAsc") {
        tempData.sort(
          (a, b) =>
            new Date(a.order_date).getTime() - new Date(b.order_date).getTime(),
        );
      } else if (filter.value === "orderDateDes") {
        tempData.sort(
          (a, b) =>
            new Date(b.order_date).getTime() - new Date(a.order_date).getTime(),
        );
      } else if (filter.value === "returnDateAsc") {
        tempData.sort(
          (a, b) =>
            new Date(a.max_return_date).getTime() -
            new Date(b.max_return_date).getTime(),
        );
      } else if (filter.value === "returnDateDes") {
        tempData.sort(
          (a, b) =>
            new Date(b.max_return_date).getTime() -
            new Date(a.max_return_date).getTime(),
        );
      }
    }

    setFilteredData(tempData);
    setPage(0); // Reinicia a la primera página
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
              { value: "orderDateAsc", label: "Order Date (Ascending)" },
              { value: "orderDateDes", label: "Order Date (Descending)" },
              { value: "returnDateAsc", label: "Return Date (Ascending)" },
              { value: "returnDateDes", label: "Return Date (Descending)" },
            ]}
            placeholder="Select a filter option"
            onChange={setFilter}
          />
          <SearchBar
            search={search}
            setSearch={setSearch}
            placeholder="Search by user"
          />
          <div className="place-content-center">
            <button
              type="button"
              className="px-4 py-3 bg-blue-400 rounded-xl h-fit"
              onClick={handleFilterAndSearch}
            >
              Search
            </button>
          </div>
        </div>
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
          Page {page + 1} of {Math.ceil(filteredData.length / pageSize)}
        </span>
        <button
          type="button"
          onClick={() =>
            setPage((prev) =>
              Math.min(prev + 1, Math.ceil(filteredData.length / pageSize) - 1),
            )
          }
          disabled={page >= Math.ceil(filteredData.length / pageSize) - 1}
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
