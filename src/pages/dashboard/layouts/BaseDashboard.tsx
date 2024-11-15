import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import Header from "../Components/Header";
import { Outlet, redirect } from "react-router-dom";

const BaseDashboard = () => {
  const [selectOption, setSelectOption] = useState("Home");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      redirect("/auth/login");
      return;
    }
  }, []);

  return (
    <div className="flex min-h-screen gap-1 bg-sky-100">
      <NavBar
        selectedOption={selectOption}
        setSelectedOption={setSelectOption}
      />
      <div className="flex-1">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default BaseDashboard;
