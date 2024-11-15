import Api from "@/services/Api";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type LoginFormInputs = {
  username: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    console.log(data);
    const response = await Api.post("/login", data);
    console.log(response.data);
    localStorage.setItem("token", response.data.token);
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div
        className="absolute inset-0 bg-cover bg-center w-full h-full filter opacity-75"
        style={{ backgroundImage: "url('/src/assets/bg.png')" }}
      />
      <div
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-8"
        style={{ position: "relative", zIndex: 1 }}
      >
        <img
          src="/src/assets/NavLogo.png"
          alt="Abacus"
          className="w-20 h-20 mx-auto mb-8 shadow-md rounded-full"
        />
        <h2 className="text-2xl font-bold text-center text-blue-600">ABACUS</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-gray-700 font-semibold"
            >
              Usuario
            </label>
            <input
              id="username"
              {...register("username", {
                required: "El usuario es obligatorio",
              })}
              type="text"
              className={`w-full p-3 mt-2 border rounded-lg focus:outline-none ${errors.username ? "border-red-500" : "border-gray-300"}`}
              placeholder="Usuario"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold"
            >
              Contraseña
            </label>
            <input
              id="password"
              {...register("password", {
                required: "La contraseña es obligatoria",
              })}
              type="password"
              className={`w-full p-3 mt-2 border rounded-lg focus:outline-none ${errors.password ? "border-red-500" : "border-gray-300"}`}
              placeholder="Contraseña"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
