import { useState } from "react";
import Dialog from "../../Components/Dialog";
import AuthorForm from "./Components/AuthorForms";

const AuthorsInfo = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  return (
    <div className="flex justify-around h-dvh items-center ">
      <div className="place-content-center h-full">
        <img
          src="/src/assets/authors.png"
          alt="xd"
          className="border rounded-[60%] shadow-md"
        />
      </div>
      <div>
        <div className="p-4">
          <button
            type="button"
            onClick={openDialog}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add author
          </button>

          <Dialog
            isOpen={isDialogOpen}
            title="Add Author"
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
