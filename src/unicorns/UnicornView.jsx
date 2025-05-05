import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { useUnicorns } from "../context/UnicornContext";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


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

const exportToPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.setTextColor(73, 59, 132);
  const pageWidth = doc.internal.pageSize.getWidth();
  const title = "Lista de Unicornios";
  const textWidth = doc.getTextWidth(title);
  const x = (pageWidth - textWidth) / 2;
  doc.text(title, x, 22);

  const tableColumn = ["Nombre", "Color", "Poder", "Edad", "Estado"];
  const tableRows = [];

  unicorns.forEach((unicorn) => {
    tableRows.push([
      unicorn.nombre || "",
      unicorn.color || "",
      unicorn.poder || "",
      unicorn.edad || "",
      unicorn.estado || "",
    ]);
  });

  autoTable(doc, {
    startY: 30,
    head: [tableColumn],
    body: tableRows,
    styles: {
      fillColor: [233, 236, 239],
      fontSize: 10,
      halign: "center",
    },
    headStyles: {
      fillColor: [73, 59, 132],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    alternateRowStyles: { fillColor: [248, 249, 250] },
  });

  doc.save("unicornios.pdf");
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
      <Button label="Inicio" className="mb-4" onClick={() => navigate("/")} />
      <Card title="Lista de Unicornios" className="w-full">
        <div className="mb-3">
          <Button
            label="Crear Unicornio"
            icon="pi pi-plus"
            className="p-button-success"
            onClick={() => navigate("/unicornios/crear")}
          />
          <Button
            label="Exportar PDF"
            icon="pi pi-file-pdf"
            className="p-button-warning ml-2"
            onClick={exportToPDF}
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
          <Column field="estado" header="Estado" />
          <Column body={actionBodyTemplate} header="Acciones" />
        </DataTable>
      </Card>
    </div>
  );
};

export default UnicornsView;
