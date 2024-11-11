import { Link } from "react-router-dom";

const AddButton = ({ object }: { object: string }) => {
  return (
    <Link to={`/${object}/create`} className="px-3 py-2 bg-red-400 rounded-xl">
      ADD
    </Link>
  );
};

export default AddButton;
