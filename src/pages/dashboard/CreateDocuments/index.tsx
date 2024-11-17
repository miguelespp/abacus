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
import Dialog from "../Components/Dialog";
import PublisherForm from "./AddAuthors/Components/Publisher Form";

const DocumentForm: React.FC = () => {
  const navigation = useNavigate();
  const [languages, setLanguages] = useState<Language[]>();
  const [publishers, setPublishers] = useState<Publisher[]>();
  const [formats, setFormats] = useState<{ id: number; name: string }[]>();

  const [isDialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Document>({
    defaultValues: {
      external_lend_allowed: false,
      mean_rating: null,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const languageResponse = await Api.get<Language[]>(
        "/dashboard/languages",
      );
      const languages = languageResponse.data;
      setLanguages(languages);
      console.log(languages);

      const publishersResponse = await Api.get<Publisher[]>(
        "/dashboard/publishers",
      );
      const publishers = publishersResponse.data;
      setPublishers(publishers);

      const formatsResponse =
        await Api.get<{ id: number; name: string }[]>("/dashboard/formats");
      const formats = formatsResponse.data;
      setFormats(formats);
    };
    fetchData();
  }, []);

  const handleFileToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit: SubmitHandler<Document> = async (data) => {
    if (data.acquisition_date) {
      // change to ISO format
      data.acquisition_date = new Date(data.acquisition_date)
        .toISOString()
        .split("T")[0];
    }

    if (data.cover_url && data.cover_url.length > 0) {
      // for default input type file returns a FileList
      data.cover_url = data.cover_url[0];

      const coverUrl = await handleFileToBase64(data.cover_url);
      data.cover_url = coverUrl.split(",")[1];
      console.log(data.cover_url);
    } else {
      data.cover_url = null;
    }

    console.log(data);
    const response = await Api.post("/dashboard/document", data);
    console.log(response);

    if (response.status === 200) {
      alert("Document created successfully");
      const id = response.data;
      if (id) {
        navigation(`/dashboard/document/authors/${id}`);
        return;
      }
    }
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
              {...register("ISBN", {
                required: "ISBN is required",
                validate: (value) =>
                  value.length === 13 ||
                  value.length === 10 ||
                  "ISBN must be 10 or 13 characters",
              })}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm"
              type="text"
            />
            {errors.ISBN && (
              <span className="text-red-500 text-sm">
                {errors.ISBN.message}
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
              {...register("price", {
                valueAsNumber: true,
                min: { value: 0, message: "Price must be a positive number" },
              })}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm"
              type="number"
              step={0.01}
            />
            {errors.price && (
              <span className="text-red-500 text-sm">
                {errors.price.message}
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
                valueAsNumber: true,
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
              {...register("language_id", {
                required: "Language is required",
                valueAsNumber: true,
              })}
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
              {...register("format_id", {
                required: "Format is required",
                valueAsNumber: true,
              })}
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
          <div className="flex-1 mb-4" />
        </div>

        <div className="flex justify-end">
          {/* <span className="text-red-600 text-sm pr-4">
            Not found publisher?
          </span>
          <button
            type="button"
            onClick={openDialog}
            className="bg-green-500 h-10 hover:bg-green-700 text-white font-bold w-40 py-2 px-4 rounded "
          >
            Create pubisher
          </button>

          <Dialog
            isOpen={isDialogOpen}
            title="Create Publisher"
            onClose={closeDialog}
          >
            <PublisherForm />
          </Dialog> */}
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
