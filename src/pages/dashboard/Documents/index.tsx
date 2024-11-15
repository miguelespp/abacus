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

const data: DocumentView[] = [
  {
    id: 1,
    title: "Document 1",
    isbn: "123456789",
    description: "Description 1",
    publication_date: new Date("2021-01-01"),
    edition: "xcs",
    price: 100,
    language: "es",
    publisher: "Publisher 1",
  },
  {
    id: 2,
    title: "Document 2",
    isbn: "123456789",
    description: "Description 2",
    publication_date: new Date("2021-01-01"),
    edition: "xcs",
    price: 100,
    language: "es",
    publisher: "Publisher 2",
  },
];

// Configuración de columnas
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
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("publication_date", {
    header: "Publication Date",
    cell: (info) => info.getValue().toLocaleDateString(),
  }),
  columnHelper.accessor("edition", {
    header: "Edition",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("price", {
    header: "Price",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("language", {
    header: "Language",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("publisher", {
    header: "Publisher",
    cell: (info) => info.getValue(),
  }),
];

const Documentos = () => {
  const navigation = useNavigate();
  // const [data, setData] = useState<DocumentView[]>([]);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<Option | null>(null);
  const [rangeValues, setRangeValues] = useState([20, 80]);
  const [page, setPage] = useState(1);
  const table = useReactTable<DocumentView>({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await Api.post<DocumentView[]>("/documents", {
  //       page: 1,
  //       page_size: 10,
  //     });
  //     setData(response.data);
  //   };
  //   fetchData();
  // }, [page]);

  const handleSubmit = () => {
    const data = {
      search,
      filter,
      rangeValues,
    };
    console.log(data);
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
              onClick={() => handleSubmit}
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
    </div>
  );
};

export default Documentos;
