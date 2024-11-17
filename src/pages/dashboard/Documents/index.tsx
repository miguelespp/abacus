import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import type { DocumentView } from "@/types/Document";
import SearchBar from "../Components/SearchBar";
import { useEffect, useState } from "react";
import AddButton from "../Components/AddButton";
import Select from "../Components/Select";
import type { Option } from "../Components/Select";
import PriceSlider from "../Components/Slider";
import { useNavigate } from "react-router-dom";
import Api from "@/services/Api";

const columnHelper = createColumnHelper<DocumentView>();

const columns = [
  columnHelper.accessor("title", {
    header: "Title",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("isbn", {
    header: "ISBN",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("description", {
    header: "Description",
    cell: (info) => info.getValue().substring(0, 50) + "...",
  }),
  columnHelper.accessor("publication_year", {
    header: "Publication Date",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("edition", {
    header: "Edition",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("base_price", {
    header: "Price",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("language_name", {
    header: "Language",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("publisher_name", {
    header: "Publisher",
    cell: (info) => info.getValue(),
  }),
];

const Documentos = () => {
  const navigation = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<Option | null>(null);
  const [rangeValues, setRangeValues] = useState([20, 80]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [allData, setAllData] = useState<DocumentView[]>([]);
  const [filteredData, setFilteredData] = useState<DocumentView[]>([]);
  const [data, setData] = useState<DocumentView[]>([]);

  const table = useReactTable<DocumentView>({
    columns,
    data: filteredData,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await Api.get<DocumentView[]>("/dashboard/documents");
      setAllData(response.data);
      setFilteredData(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Actualiza los datos paginados cuando cambian `filteredData` o la página
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    setData(filteredData.slice(start, end));
  }, [page, pageSize, filteredData]);

  const handleSubmit = () => {
    let tempData = allData;

    // Filtrar por búsqueda
    if (search) {
      tempData = tempData.filter((doc) => {
        if (filter?.value === "title") {
          return doc.title.toLowerCase().includes(search.toLowerCase());
        }
        if (filter?.value === "isbn") {
          return doc.isbn.toLowerCase().includes(search.toLowerCase());
        }
        if (filter?.value === "edition") {
          return doc.edition === parseInt(search, 10); // Comparar como número
        }
        return false;
      });
    }

    // Filtrar por rango de precios
    tempData = tempData.filter(
      (doc) =>
        doc.base_price >= rangeValues[0] && doc.base_price <= rangeValues[1],
    );

    setFilteredData(tempData); // Actualiza los datos filtrados
    setPage(1); // Reinicia a la primera página
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Books List</h2>
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
              onClick={handleSubmit}
            >
              Search
            </button>
          </div>
          <AddButton object="document" />
        </div>
        <div className="flex space-x-2 mb-2 px-2">
          <PriceSlider
            min={0}
            max={200}
            minValue={rangeValues[0]}
            maxValue={rangeValues[1]}
            step={1}
            onChange={(values) => setRangeValues(values)}
          />
        </div>
      </div>
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
                        if (row.original.id) {
                          navigation(
                            `/dashboard/document/authors/${row.original.id}`,
                          );
                        }
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
        {/* Paginación */}
        <div className="flex justify-between mt-4">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 disabled:bg-gray-200"
          >
            Previous
          </button>
          <span>
            Page {page} of {Math.ceil(allData.length / pageSize)}
          </span>
          <button
            type="button"
            disabled={page >= Math.ceil(allData.length / pageSize)}
            onClick={() =>
              setPage((prev) =>
                Math.min(prev + 1, Math.ceil(allData.length / pageSize)),
              )
            }
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 disabled:bg-gray-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Documentos;
