import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useUnicorns } from "../context/UnicornContext";

export const useUnicornForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { unicorns, createUnicorn, editUnicorn } = useUnicorns();

  const [initialValues, setInitialValues] = useState({
    nombre: "",
    color: "",
    edad: "",
    poder: "",
    estado: "",
  });

  useEffect(() => {
    if (id) {
      const unicornToEdit = unicorns.find((u) => u._id === id);
      if (unicornToEdit) {
        setInitialValues({
          nombre: unicornToEdit.nombre,
          color: unicornToEdit.color,
          edad: unicornToEdit.edad,
          poder: unicornToEdit.poder,
          estado: unicornToEdit.estado,
        });
      }
    }
  }, [id, unicorns]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      nombre: Yup.string()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(15, "El nombre no puede tener mas de 15 caracteres")
        .required("Requerido"),
      color: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "Solo se permiten letras")
        .required("Requerido"),
      edad: Yup.number()
        .min(0, "La edad no puede ser menor a 0")
        .max(100, "La edad no puede ser mayor a 100")
        .required("Requerido"),
      poder: Yup.string().required("Requerido"),
      estado: Yup.string().required("Requerido"),
    }),
    onSubmit: async (values) => {
      if (id) {
        await editUnicorn(id, values);
      } else {
        await createUnicorn(values);
      }
      navigate("/unicornios");
    },
  });

  return { formik, isEditing: !!id };
};
