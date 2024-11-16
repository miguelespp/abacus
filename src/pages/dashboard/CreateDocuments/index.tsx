import type { Document } from "@/types/Document";
import { Controller, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import ToggleSwitch from "../Components/ToggleButton";
import { useEffect, useState } from "react";
import Api from "@/services/Api";
import type { Language } from "@/types/Language";
import type { Publisher } from "@/types/Publisher";
import { Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DocumentForm: React.FC = () => {
  const navigation = useNavigate();
  const [languages, setLanguages] = useState<Language[]>();
  const [publishers, setPublishers] = useState<Publisher[]>();
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Document>({
    defaultValues: {
      external_lend_allowed: false,
    },
  });

  const formats: { id: number; name: string }[] = [
    { id: 1, name: "Book" },
    { id: 2, name: "Magazine" },
    { id: 3, name: "Newspaper" },
    { id: 4, name: "Journal" },
    { id: 5, name: "Thesis" },
    { id: 6, name: "Report" },
    { id: 7, name: "Manuscript" },
    { id: 8, name: "Audio" },
    { id: 9, name: "Video" },
    { id: 10, name: "Map" },
    { id: 11, name: "Photograph" },
    { id: 12, name: "Painting" },
    { id: 13, name: "Drawing" },
    { id: 14, name: "Sculpture" },
    { id: 15, name: "Artifact" },
    { id: 16, name: "Other" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const languageResponse = await Api.get<Language[]>("/languages");
      const languages = languageResponse.data;
      setLanguages(languages);

      const publishersResponse = await Api.get<Publisher[]>("/publishers");
      const publishers = publishersResponse.data;
      setPublishers(publishers);
    };
    fetchData();
  }, []);

  const onSubmit: SubmitHandler<Document> = async (data) => {
    // falta configurar adecuadamente
    const response = await Api.post("/postear/documento", data);

    const id = response.data.id;
    if (id) {
      navigation(`/document/edit/${id}`);
      return;
    }

    navigation("/documents");

    console.log(response.data);
  };

  return (
    <div className="flex justify-around">
      <div className="place-content-center">
        <img
          src="/src/assets/books.jpg"
          alt="xd"
          className="border my-auto rounded-full shadow-lg"
        />
        <div className="flex justify-end">
          <img
            src="/src/assets/books1.png"
            alt="xd"
            className="border size-32 rounded-full"
          />
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl ml-10 my-10 p-4 bg-gray-200 rounded-lg shadow-md"
      >
        <span
          className="text-xl text-red-600 text"
          style={{
            fontFamily: "'Edu AU VIC WA NT Pre', cursive",
            fontOpticalSizing: "auto",
            fontWeight: 500,
            fontStyle: "normal",
          }}
        >
          Document Info
        </span>
        <div className="flex justify-between gap-8 place-content-start mt-4">
          <div className="flex-1 mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              {...register("title", { required: "Title is required" })}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm"
              type="text"
            />
            {errors.title && (
              <span className="text-red-500 text-sm">
                {errors.title.message}
              </span>
            )}
          </div>
          <div className="flex-1 mb-4">
            <label
              htmlFor="isbn"
              className="block text-sm font-medium text-gray-700"
            >
              ISBN
            </label>
            <input
              id="isbn"
              {...register("isbn", {
                required: "ISBN is required",
                validate: (value) =>
                  value.length === 13 ||
                  value.length === 10 ||
                  "ISBN must be 10 or 13 characters",
              })}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm"
              type="text"
            />
            {errors.isbn && (
              <span className="text-red-500 text-sm">
                {errors.isbn.message}
              </span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description")}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm resize-none overflow-auto"
            rows={3}
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
        </div>

        <div className="flex justify-between gap-8 place-content-start">
          <div className="flex-1 mb-4">
            <label
              htmlFor="cover_url"
              className="block text-sm font-medium text-gray-700"
            >
              Cover URL
            </label>
            <div className="size-fit relative">
              <div className="flex items-center justify-center h-full w-full absolute">
                <Upload className="h-max" />
              </div>
              <input
                id="cover_url"
                {...register("cover_url")}
                className="mt-1 p-2 block w-full border-4 rounded-md shadow-sm cursor-pointer opacity-0 "
                type="file"
                accept="image/*"
              />
            </div>
            {errors.cover_url && (
              <span className="text-red-500 text-sm">
                {errors.cover_url.message}
              </span>
            )}
          </div>
          <div className="flex-1 mb-4">
            <label
              htmlFor="acquisition_date"
              className="block text-sm font-medium text-gray-700"
            >
              Acquisition Date
            </label>
            <input
              id="acquisition_date"
              {...register("acquisition_date", {
                valueAsDate: true,
              })}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm"
              type="date"
            />
            {errors.acquisition_date && (
              <span className="text-red-500 text-sm">
                {errors.acquisition_date.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-between gap-8 place-content-start">
          <div className="flex-1 mb-4">
            <label
              htmlFor="edition"
              className="block text-sm font-medium text-gray-700"
            >
              Edition
            </label>
            <input
              id="edition"
              {...register("edition", {
                valueAsNumber: true,
                min: { value: 0, message: "Edition must be a positive number" },
              })}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm"
              type="number"
            />
            {errors.edition && (
              <span className="text-red-500 text-sm">
                {errors.edition.message}
              </span>
            )}
          </div>

          <div className="flex-1 mb-4">
            <label
              htmlFor="total_pages"
              className="block text-sm font-medium text-gray-700"
            >
              Total Pages
            </label>
            <input
              id="total_pages"
              {...register("total_pages", {
                valueAsNumber: true,
                min: {
                  value: 0,
                  message: "Total pages must be a positive number",
                },
              })}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm"
              type="number"
            />
            {errors.total_pages && (
              <span className="text-red-500 text-sm">
                {errors.total_pages.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-between gap-8 place-content-start">
          <div className="mb-4 flex-1">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              id="price"
              {...register("base_price", {
                valueAsNumber: true,
                min: { value: 0, message: "Price must be a positive number" },
              })}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm"
              type="number"
            />
            {errors.base_price && (
              <span className="text-red-500 text-sm">
                {errors.base_price.message}
              </span>
            )}
          </div>
          <div className="mb-4 flex-1 flex justify-between px-8 space-x-2 place-content-center">
            <span className="my-auto">External Lend Allowed</span>
            <Controller
              name="external_lend_allowed"
              control={control}
              render={({ field }) => (
                <ToggleSwitch value={field.value} onChange={field.onChange} />
              )}
            />
          </div>
        </div>

        <div className="flex justify-between gap-8 place-content-start">
          <div className=" flex-1 mb-4">
            <label
              htmlFor="mean_rating"
              className="block text-sm font-medium text-gray-700"
            >
              Mean Rating
            </label>
            <input
              id="mean_rating"
              {...register("mean_rating", {
                valueAsNumber: true,
                min: { value: 0, message: "Rating must be a positive number" },
              })}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm"
              type="number"
            />
            {errors.mean_rating && (
              <span className="text-red-500 text-sm">
                {errors.mean_rating.message}
              </span>
            )}
          </div>

          <div className="flex-1 mb-4">
            <label
              htmlFor="publication_year"
              className="block text-sm font-medium text-gray-700"
            >
              Publication Year
            </label>
            <input
              id="publication_year"
              {...register("publication_year", {
                valueAsNumber: true,
                min: { value: 1500, message: "Age was 1500 or more" },
              })}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm"
              type="number"
            />
            {errors.publication_year && (
              <span className="text-red-500 text-sm">
                {errors.publication_year.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-between gap-8 place-content-start">
          <div className=" flex-1 mb-4">
            <label
              htmlFor="total_copies"
              className="block text-sm font-medium text-gray-700"
            >
              Total Copies
            </label>
            <input
              id="total_copies"
              {...register("total_copies", {
                required: "Language is required",
                valueAsNumber: true,
                min: {
                  value: 0,
                  message: "Total copies must be a positive number",
                },
              })}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm"
              type="number"
            />
            {errors.total_copies && (
              <span className="text-red-500 text-sm">
                {errors.total_copies.message}
              </span>
            )}
          </div>

          <div className="flex-1 mb-4">
            <label
              htmlFor="available_copies"
              className="block text-sm font-medium text-gray-700"
            >
              Available Copies
            </label>
            <input
              id="available_copies"
              {...register("available_copies", {
                required: "Avalible copies is required",
                valueAsNumber: true,
                min: { value: 0, message: "Price must be a positive number" },
                validate: (value) =>
                  value <= watch("total_copies") ||
                  "Available copies must be less than or equal to total copies",
              })}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm"
              type="number"
            />
            {errors.available_copies && (
              <span className="text-red-500 text-sm">
                {errors.available_copies.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-between gap-8 place-content-start">
          <div className="flex-1 mb-4">
            <label
              htmlFor="language_id"
              className="block text-sm font-medium text-gray-700"
            >
              Language
            </label>
            <select
              id="language_id"
              {...register("language_id", { required: "Language is required" })}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm bg-white"
            >
              {languages?.map((language) => (
                <option key={language.id} value={language.id}>
                  {language.name}
                </option>
              ))}
            </select>
            {errors.language_id && (
              <span className="text-red-500 text-sm">
                {errors.language_id.message}
              </span>
            )}
          </div>

          <div className="flex-1 mb-4">
            <label
              htmlFor="format_id"
              className="block text-sm font-medium text-gray-700"
            >
              Format
            </label>
            <select
              id="format_id"
              {...register("format_id", { required: "Format is required" })}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm bg-white"
            >
              {formats?.map((format) => (
                <option key={format.id} value={format.id}>
                  {format.name}
                </option>
              ))}
            </select>
            {errors.format_id && (
              <span className="text-red-500 text-sm">
                {errors.format_id.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-between gap-8 place-content-start">
          <div className="flex-1 mb-4">
            <label
              htmlFor="publisher_id"
              className="block text-sm font-medium text-gray-700"
            >
              Publisher
            </label>
            <select
              id="publisher_id"
              {...register("publisher_id", {
                required: "Publisher is required",
              })}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm bg-white"
            >
              {publishers?.map((publisher) => (
                <option key={publisher.id} value={publisher.id}>
                  {publisher.name}
                </option>
              ))}
            </select>
            {errors.publisher_id && (
              <span className="text-red-500 text-sm">
                {errors.publisher_id.message}
              </span>
            )}
          </div>

          <div className="flex-1 mb-4" />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="w-40 ml-auto py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DocumentForm;
