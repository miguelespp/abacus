import Api from "@/services/Api";
import type { AuthorBase } from "@/types/Author";
import { Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

type Gender = {
  id: number;
  name: string;
};

type Country = {
  id: number;
  name: string;
};

const AuthorForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigation = useNavigate();
  const [genders, setGenders] = useState<Gender[]>();
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    if (id === undefined) {
      navigation("/dashboard/documents");
      return;
    }
    const document_id = Number.parseInt(id);
    console.log(document_id);
    const fetchData = async () => {
      const gendersRespone = await Api.get<Gender[]>("/genders");
      setGenders(gendersRespone.data);
      const countriesRespone = await Api.get<Country[]>("/countries");
      setCountries(countriesRespone.data);
    };
    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorBase>();

  const onSubmit: SubmitHandler<AuthorBase> = async (data) => {
    const res = await Api.post(`/documents/${document_id}/authors`, data);
    console.log(res);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl ml-20 my-10 p-4 bg-gray-200 rounded-lg shadow-md"
    >
      <span className="text-xl text-red-600 text">Authors Form</span>
      <div className="flex justify-between gap-8 place-content-start mt-4">
        <div className="flex-1 mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            {...register("name", { required: "Title is required" })}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm"
            type="text"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>
        <div className="flex-1 mb-4">
          <label
            htmlFor="birth_date"
            className="block text-sm font-medium text-gray-700"
          >
            Birth Date
          </label>
          <input
            id="birth_date"
            {...register("birth_date", {
              required: "Nirth date is required",
              valueAsDate: true,
            })}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm"
            type="date"
          />
          {errors.birth_date && (
            <span className="text-red-500 text-sm">
              {errors.birth_date.message}
            </span>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="bio"
          className="block text-sm font-medium text-gray-700"
        >
          Biography
        </label>
        <textarea
          id="bio"
          {...register("bio")}
          className="mt-1 p-2 block w-full border rounded-md shadow-sm resize-none overflow-auto"
          rows={3}
        />
        {errors.bio && (
          <span className="text-red-500 text-sm">{errors.bio.message}</span>
        )}
      </div>

      <div className="flex justify-between gap-8 place-content-start mt-4">
        <div className="flex-1 mb-4">
          <label
            htmlFor="death_date"
            className="block text-sm font-medium text-gray-700"
          >
            Death Date
          </label>
          <input
            id="death_date"
            {...register("death_date", {
              required: "Death date is required",
              valueAsDate: true,
            })}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm"
            type="date"
          />
          {errors.death_date && (
            <span className="text-red-500 text-sm">
              {errors.death_date.message}
            </span>
          )}
        </div>

        <div className="flex-1 mb-4">
          <label
            htmlFor="image_url"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <div className="size-fit relative">
            <div className="flex items-center justify-center h-full w-full absolute">
              <Upload className="h-max" />
            </div>
            <input
              id="image_url"
              {...register("image_url")}
              className="mt-1 p-2 block w-full border-4 rounded-md shadow-sm cursor-pointer opacity-0 "
              type="file"
              accept="image/*"
            />
          </div>
          {errors.image_url && (
            <span className="text-red-500 text-sm">
              {errors.image_url.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-between gap-8 place-content-start">
        <div className="flex-1 mb-4">
          <label
            htmlFor="gender_id"
            className="block text-sm font-medium text-gray-700"
          >
            Gender
          </label>
          <select
            id="gender_id"
            {...register("gender_id", { required: "Gender is required" })}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm bg-white"
          >
            {genders?.map((gender) => (
              <option key={gender.id} value={gender.id}>
                {gender.name}
              </option>
            ))}
          </select>
          {errors.gender_id && (
            <span className="text-red-500 text-sm">
              {errors.gender_id.message}
            </span>
          )}
        </div>

        <div className="flex-1 mb-4">
          <label
            htmlFor="country_id"
            className="block text-sm font-medium text-gray-700"
          >
            Country
          </label>
          <select
            id="country_id"
            {...register("country_id", { required: "Format is required" })}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm bg-white"
          >
            {countries?.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.country_id && (
            <span className="text-red-500 text-sm">
              {errors.country_id.message}
            </span>
          )}
        </div>
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
  );
};

export default AuthorForm;
