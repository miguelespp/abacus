import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import type { DocumentView } from "@/types/Document";
import SearchBar from "../Components/SearchBar";
import { useState } from "react";
import AddButton from "../Components/AddButton";
import Select, { Option } from "../Components/Select";

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
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
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
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<Option | null>(null);
  const table = useReactTable<DocumentView>({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Lista de Libros</h2>
      <div className="my-4 flex justify-between space-x-2 px-2">
        <SearchBar search={search} setSearch={setSearch} />
        <AddButton object="document" />
      </div>
      <Select
        options={[
          { value: "title", label: "Título" },
          { value: "isbn", label: "ISBN" },
          { value: "publication_date", label: "Fecha de Publicación" },
          { value: "edition", label: "Edición" },
        ]}
        placeholder="Selecciona una opción"
        onChange={setFilter}
      />

      <div className="overflow-x-auto">
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
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Documentos;
