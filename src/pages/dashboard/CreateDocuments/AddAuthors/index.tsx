import { useEffect, useState } from "react";
import Dialog from "../../Components/Dialog";
import AuthorForm from "./Components/AuthorForms";
import type { AuthorTable } from "@/types/Author";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import SearchBar from "../../Components/ReallySearchBar";
import { useNavigate, useParams } from "react-router-dom";
import Api from "@/services/Api";

const columnHelper = createColumnHelper<AuthorTable>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("birth_date", {
    header: "Birth Date",
    cell: (info) => info.getValue() || "N/A",
  }),
];

const AuthorsInfo = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isDialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);
  const [author, setAuthor] = useState(null);
  const [data, setData] = useState<AuthorTable[]>([]);

  useEffect(() => {
    if (id === undefined) {
      navigate("/dashboard/documents");
      return;
    }
    const fetchData = async () => {
      const response = await Api.get(`dashboard/authors/${id}`);
      setData(response.data);
    };
    fetchData();
  });

  const handleAuthorAdd = async () => {
    if (!author) {
      return;
    }
    console.log(author);
    const response = await Api.post(
      `dashboard/author/${author.id}/document/${id}`,
    );
    console.log(response);
    if (response.status !== 200) {
      alert("Error adding author");
    } else {
      setData([...data, author]);
    }
    alert("Author added successfully");
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex justify-around h-dvh items-center ">
      <div className="place-content-center h-full">
        <img
          src="/src/assets/authors.png"
          alt="xd"
          className="border rounded-[60%] shadow-md"
        />
      </div>
      <div className="h-full flex flex-col justify-center py-4">
        <div className="flex-1 px-4 bg-gray-200 rounded-xl h-fit py-2 ">
          <span
            className="text-xl text-red-600 text"
            style={{
              fontFamily: "'Edu AU VIC WA NT Pre', cursive",
              fontOpticalSizing: "auto",
              fontWeight: 500,
              fontStyle: "normal",
            }}
          >
            Some authors
          </span>
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
        <div className="p-4 flex flex-col bg-gray-200 justify-center flex-1  my-6 items-center">
          <div className="mb-2">
            <SearchBar
              apiEndpoint="/dashboard/authors"
              onSelectResult={setAuthor}
            />
          </div>
          <button
            type="button"
            onClick={() => handleAuthorAdd()}
            className="bg-blue-500 h-10 hover:bg-blue-700 text-white font-bold w-40 py-2 px-4 rounded "
          >
            Add author
          </button>
          <span className="text-red-600">Not found author?</span>
          <button
            type="button"
            onClick={openDialog}
            className="bg-green-500 h-10 hover:bg-green-700 text-white font-bold w-40 py-2 px-4 rounded "
          >
            Create author
          </button>

          <Dialog
            isOpen={isDialogOpen}
            title="Create Author"
            onClose={closeDialog}
          >
            <AuthorForm />
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default AuthorsInfo;
