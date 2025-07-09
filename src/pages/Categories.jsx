import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

// Iconos de categorías
import CatCamioneta from "../assets/categories/camioneta/ccamioneta.png";
import CatDeportivo from "../assets/categories/camioneta/cdeportivo.png";
import CatElectrico from "../assets/categories/camioneta/celectrico.png";

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    { id: 1, name: "camioneta", image: CatCamioneta },
    { id: 2, name: "deportivo", image: CatDeportivo },
    { id: 3, name: "electrico", image: CatElectrico },
  ];

  const handleCategoryClick = (category) => {
    navigate(`/categories/${category}`);
  };

  return (
    <>
      

      <main className="min-h-screen flex flex-col items-center px-4 pt-28 pb-16 bg-gray-50 mt-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          Explora por categorías
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-screen-lg w-full px-4 mt-5">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.name)}
              className=" cursor-pointer bg-white shadow-sm border border-gray-200 hover:border-red-500 transition-all rounded-xl flex flex-col items-center p-6 hover:shadow-md hover:scale-105 transform duration-300"
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-24 w-auto mb-4 "
              />
              <span className=" text-gray-700 font-medium capitalize text-lg ">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </main>

     
    </>
  );
};

export default Categories;
