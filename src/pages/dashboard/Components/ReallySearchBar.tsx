import React, { useState } from "react";
import Api from "@/services/Api";

interface SearchBarProps<T> {
  apiEndpoint: string; // Endpoint de la API
  params?: Record<string, any>; // Parámetros adicionales para la consulta
  transformResults?: (data: any) => T[]; // Función para transformar la respuesta
  placeholder?: string; // Placeholder del input
  onSelectResult?: (result: T) => void; // Callback al seleccionar un resultado
}

const SearchBar = <T,>({
  apiEndpoint,
  params = {},
  transformResults = (data) => data as T[], // Función por defecto: asume que la API devuelve un array
  placeholder = "Busca algo...",
  onSelectResult,
}: SearchBarProps<T>) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await Api.get(apiEndpoint, {
        params: { ...params, query: value },
      });
      const transformedResults = transformResults(response.data);
      setResults(transformedResults.slice(0, 10)); // Mostrar solo los 10 primeros resultados
    } catch (err) {
      setError("Error al cargar resultados");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder={placeholder}
        className="w-full max-w-md p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <ul className="w-full max-w-md mt-4 bg-white border border-gray-300 rounded-md shadow-md">
        {loading && <li className="px-4 py-2 text-gray-500">Cargando...</li>}
        {error && <li className="px-4 py-2 text-red-500">{error}</li>}
        {!loading &&
          !error &&
          results.map((result, index) => (
            <li
              key={index}
              onClick={() => onSelectResult?.(result)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {JSON.stringify(result.name)} {/* Renderizado genérico */}
            </li>
          ))}
        {!loading && !error && results.length === 0 && query !== "" && (
          <li className="px-4 py-2 text-gray-500">Sin resultados</li>
        )}
      </ul>
    </div>
  );
};

export default SearchBar;
