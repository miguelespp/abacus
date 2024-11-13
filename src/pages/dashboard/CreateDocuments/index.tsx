import type { Document } from "@/types/Document";
import { Controller, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import ToggleSwitch from "../Components/ToggleButton";

const DocumentForm: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Document>({
    defaultValues: {
      external_lend_allowed: false,
    },
  });

  const onSubmit: SubmitHandler<Document> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl ml-20 mt-10 p-4 bg-gray-200 rounded-lg shadow-md"
    >
      <span className="text-xl text-red-600 text">Document Info</span>
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
            <span className="text-red-500 text-sm">{errors.title.message}</span>
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
            {...register("isbn", { required: "ISBN is required" })}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm"
            type="text"
          />
          {errors.isbn && (
            <span className="text-red-500 text-sm">{errors.isbn.message}</span>
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
          {...register("description", { required: "Description is required" })}
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
          <input
            id="cover_url"
            {...register("cover_url", { required: "Cover URL is required" })}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm"
            type="file"
            accept="image/*"
          />
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
              required: "Publication date is required",
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
            {...register("edition", { required: "Edition is required" })}
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
              required: "total_pages is required",
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
        <div className="mb-4 flex-1 flex space-x-2 place-content-center">
          <span className="my-auto">External Lend Allowed</span>
          <Controller
            name="external_lend_allowed"
            control={control}
            render={({ field }) => (
              <ToggleSwitch value={field.value} onChange={field.onChange} />
            )}
          />
        </div>

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
              required: "Price is required",
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
            {...register("mean_rating", { required: "Language is required" })}
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
              required: "Language is required",
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
        <div className=" flex-1 mb-4">
          <label
            htmlFor="total_copies"
            className="block text-sm font-medium text-gray-700"
          >
            Total Copies
          </label>
          <input
            id="total_copies"
            {...register("total_copies", { required: "Language is required" })}
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
              required: "Language is required",
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

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default DocumentForm;
