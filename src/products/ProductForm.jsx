import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { getProductById, addProduct, updateProduct } from "./productsData";

const validationSchema = Yup.object({
  nombre: Yup.string()
  .min(2, "El nombre debe tener al menos 2 caracteres")
  .max(15, "El nombre debe tener menos de 15 caracteres")
  .required("El nombre es obligatorio"),
  precio: Yup.number()
    .min(0, "El precio debe ser mayor que cero")
    .required("El precio es obligatorio"),
  categoria: Yup.string().required("La categoría es obligatoria"),
  descripcion: Yup.string().required("La descripción es obligatoria"),
});

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const isEditing = id !== undefined; 

  const existingProduct = isEditing ? getProductById(Number(id)) : null;

  const formik = useFormik({
    initialValues: {
      nombre: existingProduct?.nombre || "",
      precio: existingProduct?.precio || "",
      categoria: existingProduct?.categoria || "",
      descripcion: existingProduct?.descripcion || "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (isEditing) {
        updateProduct(Number(id), values);
      } else {
        addProduct(values);
      }
      navigate("/productos");
    },
  });

  useEffect(() => {
    if (isEditing && !existingProduct) {
      // Redirige si no se encuentra el producto a editar
      navigate("/productos");
    }
  }, [isEditing, existingProduct, navigate]);

  return (
    <div className="flex justify-content-center p-4">
      <Card
        title={isEditing ? "Editar Producto" : "Crear Producto"}
        className="w-full md:w-30rem"
      >
        <form onSubmit={formik.handleSubmit} className="p-fluid">
          <div className="field">
            <label htmlFor="nombre">Nombre</label>
            <InputText
              id="nombre"
              name="nombre"
              value={formik.values.nombre}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.nombre && formik.errors.nombre ? "p-invalid" : ""
              }
            />
            {formik.touched.nombre && formik.errors.nombre && (
              <small className="p-error">{formik.errors.nombre}</small>
            )}
          </div>

          <div className="field">
            <label htmlFor="precio">Precio</label>
            <InputNumber
              id="precio"
              name="precio"
              value={formik.values.precio}
              onValueChange={(e) => formik.setFieldValue("precio", e.value)}
              onBlur={formik.handleBlur}
              className={
                formik.touched.precio && formik.errors.precio ? "p-invalid" : ""
              }
            />
            {formik.touched.precio && formik.errors.precio && (
              <small className="p-error">{formik.errors.precio}</small>
            )}
          </div>

          <div className="field">
            <label htmlFor="categoria">Categoría</label>
            <InputText
              id="categoria"
              name="categoria"
              value={formik.values.categoria}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.categoria && formik.errors.categoria
                  ? "p-invalid"
                  : ""
              }
            />
            {formik.touched.categoria && formik.errors.categoria && (
              <small className="p-error">{formik.errors.categoria}</small>
            )}
          </div>

          <div className="field">
            <label htmlFor="descripcion">Descripción</label>
            <InputText
              id="descripcion"
              name="descripcion"
              value={formik.values.descripcion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.descripcion && formik.errors.descripcion
                  ? "p-invalid"
                  : ""
              }
            />
            {formik.touched.descripcion && formik.errors.descripcion && (
              <small className="p-error">{formik.errors.descripcion}</small>
            )}
          </div>

          <div className="flex justify-content-between mt-4">
            <Button
              className="p-button-success"
              label={isEditing ? "Actualizar" : "Crear"}
              icon="pi pi-check"
              type="submit"
            />
            <Button
              className="p-button-danger"
              label="Cancelar"
              icon="pi pi-times"
              type="button"
              onClick={() => navigate("/productos")}
            />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ProductForm;
