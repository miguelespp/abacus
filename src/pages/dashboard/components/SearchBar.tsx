interface SearchBarProps {
  search: string;
  setSearch: (search: string) => void;
}

const SearchBar = ({ search, setSearch }: SearchBarProps) => {
  return (
    <div className="flex-1">
      <input
        type="text"
        placeholder="Search by title, isbn or publisher..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 transition duration-200"
      />
    </div>
  );
};

export default SearchBar;
