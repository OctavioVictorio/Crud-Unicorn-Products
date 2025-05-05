import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const UnicornContext = createContext();
const API_URL =
  "https://crudcrud.com/api/fdda1aaee90f4945a78bfd1ed512c202/unicorns";

export const UnicornProvider = ({ children }) => {
  const [unicorns, setUnicorns] = useState([]);

  // Obtener Unicornios (GET)
  const getUnicorns = async () => {
    try {
      const response = await axios.get(API_URL);
      setUnicorns(response.data);
    } catch (err) {
      console.log("Error al obtener los unicornios:", err);
    }
  };

  // Crear Unicornio (POST)
  const createUnicorn = async (unicorn) => {
    try {
      const response = await axios.post(API_URL, unicorn);
      setUnicorns((prev) => [...prev, response.data]);
    } catch (err) {
      console.log("Error al crear el unicornio:", err);
      alert("Error al crear el unicornio");
    }
  };

  // Editar Unicornio (PUT)
  const editUnicorn = async (id, updatedUnicorn) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedUnicorn);
      setUnicorns((prev) =>
        prev.map((unicorn) =>
          unicorn._id === id ? { ...unicorn, ...updatedUnicorn } : unicorn
        )
      );
    } catch (err) {
      console.log("Error al editar el unicornio:", err);
      alert("Error al editar el unicornio");
    }
  };

  // Borrar Unicornio (DELETE)
  const deleteUnicorn = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUnicorns((prev) => prev.filter((unicorn) => unicorn._id !== id));
    } catch (err) {
      console.log("Error al eliminar el unicornio:", err);
      alert("Error al eliminar el unicornio");
    }
  };

  useEffect(() => {
    getUnicorns();
  }, []);

  return (
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
