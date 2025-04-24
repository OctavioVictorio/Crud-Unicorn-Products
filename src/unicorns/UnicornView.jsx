import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { useUnicorns } from "../context/UnicornContext";

const UnicornsView = () => {
  const { unicorns, deleteUnicorn } = useUnicorns();
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/unicornios/editar/${id}`);
  };

  const handleDelete = (id) => {
    if (confirm("¿Seguro que deseas eliminar este unicornio?")) {
      deleteUnicorn(id);
    }
  };

  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-info"
        onClick={() => handleEdit(rowData._id)}
      />
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-danger"
        onClick={() => handleDelete(rowData._id)}
      />
    </div>
  );

  return (
    <div className="p-4">
      <Card title="Lista de Unicornios" className="w-full">
        <div className="mb-3">
          <Button
            label="Crear Unicornio"
            icon="pi pi-plus"
            className="p-button-success"
            onClick={() => navigate("/unicornios/crear")}
          />
        </div>

        <DataTable
          value={unicorns}
          emptyMessage="No hay unicornios"
          paginator
          rows={10}
          className="p-datatable-sm"
        >
          <Column field="nombre" header="Nombre" />
          <Column field="color" header="Color" />
          <Column field="edad" header="Edad" />
          <Column field="poder" header="Poder" />
          <Column body={actionBodyTemplate} header="Acciones" />
        </DataTable>
      </Card>
    </div>
  );
};

export default UnicornsView;
