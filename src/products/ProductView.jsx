import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { getProducts, deleteProduct } from "./productsData";

const ProductView = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const toast = React.useRef(null);

  useEffect(() => {
    try {
      setProducts(getProducts());
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudieron cargar los productos.",
      });
    }
  }, []);

  const handleDelete = (id) => {
    if (confirm("¿Seguro que deseas eliminar este producto?")) {
      deleteProduct(id);
      setProducts(getProducts());
    }
  };

  const handleEdit = (id) => {
    navigate(`/productos/editar/${id}`);
  };

  const actionBodyTemplate = (rowData) => (
    <div className="flex justify-content-center">
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-info p-mr-2"
        onClick={() => handleEdit(rowData.id)}
      />
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-danger"
        onClick={() => handleDelete(rowData.id)}
      />
    </div>
  );

  return (
    <div className="p-4">
      <Card title="Lista de Productos" className="w-full">
        <div className="flex justify-content-end">
          <Button
            label="Agregar Producto"
            icon="pi pi-plus"
            className="p-button-success mb-4"
            onClick={() => navigate("/productos/nuevo")}
          />
        </div>

        <DataTable
          value={products}
          paginator
          rows={10}
          className="p-datatable-sm"
        >
          <Column field="nombre" header="Nombre" />
          <Column field="precio" header="Precio" />
          <Column field="categoria" header="Categoría" />
          <Column field="descripcion" header="Descripción" />
          <Column body={actionBodyTemplate} header="Acciones" />
        </DataTable>
      </Card>
    </div>
  );
};

export default ProductView;
