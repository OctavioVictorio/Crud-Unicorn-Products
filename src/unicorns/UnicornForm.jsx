import React from "react";
import { useUnicornForm } from "./useUnicornsForm";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";


const UnicornForm = () => {
  const { formik, isEditing } = useUnicornForm();
  const navigate = useNavigate();
  return (
    <div className="flex justify-content-center p-4">
      <Card
        title={isEditing ? "Editar Unicornio" : "Crear Unicornio"}
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
            <label htmlFor="color">Color</label>
            <InputText
              id="color"
              name="color"
              value={formik.values.color}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.color && formik.errors.color ? "p-invalid" : ""
              }
            />
            {formik.touched.color && formik.errors.color && (
              <small className="p-error">{formik.errors.color}</small>
            )}
          </div>

          <div className="field">
            <label htmlFor="edad">Edad</label>
            <InputNumber
              id="edad"
              name="edad"
              value={formik.values.edad}
              onValueChange={(e) => formik.setFieldValue("edad", e.value)}
              onBlur={formik.handleBlur}
              className={
                formik.touched.edad && formik.errors.edad ? "p-invalid" : ""
              }
            />
            {formik.touched.edad && formik.errors.edad && (
              <small className="p-error">{formik.errors.edad}</small>
            )}
          </div>

          <div className="field">
            <label htmlFor="poder">Poder</label>
            <InputText
              id="poder"
              name="poder"
              value={formik.values.poder}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.poder && formik.errors.poder ? "p-invalid" : ""
              }
            />
            {formik.touched.poder && formik.errors.poder && (
              <small className="p-error">{formik.errors.poder}</small>
            )}
          </div>

          <div className="field">
            <label htmlFor="estado">Estado</label>
            <InputText
              id="estado"
              name="estado"
              value={formik.values.estado}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.estado && formik.errors.estado ? "p-invalid" : ""
              }
            />
            {formik.touched.estado && formik.errors.estado && (
              <small className="p-error">{formik.errors.estado}</small>
            )}
          </div>

          <div className="flex justify-content-between">
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
              onClick={() => navigate("/unicornios")}
            />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default UnicornForm;
