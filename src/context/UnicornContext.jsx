import React, { createContext, useState, useEffect, useContext } from "react";

const UnicornContext = createContext();
const API_URL =
  "https://crudcrud.com/api/39eeceb9fbf0432c9f4cdfd581a3061a/unicorns";
export const UnicornProvider = ({ children }) => {
  const [unicorns, setUnicorns] = useState([]);

  const getUnicorns = async () => {
    try{
      const response = await fetch(API_URL);
      const data = await response.json();
      setUnicorns(data);
    }catch(err){
      console.log("Error al obtener los unicornios:", err);
    }
  };

  //Crear Unicornio(POST)
  const createUnicorn = async (unicorn) => {
    try{
      const response = await fetch(API_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(unicorn),
        }
      );
      const newUnicorn = await response.json();
      setUnicorns((prev) => [...prev, newUnicorn]);
    }catch(err){
      console.log("Error al crear el unicornio:", err);
      alert("Error al crear el unicornio");
    }
  };

  //Editar Unicornio(PUT)
  const editUnicorn = async (id, updatedUnicorn) => {
    try{
      const response = await fetch(`${API_URL}/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUnicorn),
        }
      );
      setUnicorns((prev) => 
        prev.map((unicorn) => (unicorn._id === id ? { ... unicorn, ...updatedUnicorn} : unicorn)));
    }catch(err){
      console.log("Error al editar el unicornio:", err);
      alert("Error al editar el unicornio");
  }
  };

  //Borrar Unicornio(DELETE)
  const deleteUnicorn = async (id) => {
    try{
      await fetch(`${API_URL}/${id}`,
        {
          method: "DELETE",
        }
      );
      setUnicorns((prev) => prev.filter((unicorn) => unicorn._id !== id));
    }catch(err){
      console.log("Error al eliminar el unicornio:", err);
      alert("Error al eliminar el unicornio");
    }
  };

  //Obtener Unicornios
  useEffect(() => {
    getUnicorns();
  }, []);
  
  return(
    <UnicornContext.Provider 
      value={{ 
        unicorns, 
        getUnicorns,
        createUnicorn,
        editUnicorn, 
        deleteUnicorn, 
      }}
    >
      {children}
    </UnicornContext.Provider>
  );
};

export const useUnicorns = () => useContext(UnicornContext);