import { Link } from "react-router-dom";

const AddButton = ({ object }: { object: string }) => {
  return (
    <div className="place-content-center">
      <Link
        to={`/dashboard/${object}/create`}
        className="px-4 py-3 bg-red-400 rounded-xl h-fit"
      >
        ADD
      </Link>
    </div>
  );
};

export default AddButton;
