import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./Styles.css";

function Table() {
  const [loading, setLoading] = useState(true);

  const citys = [
    "Olinda",
    "Recife",
    "Paulista",
    "Fortaleza",
    "Escada",
    "Ilha de Itamaracá",
    "Bonito",
    "Gramado",
    "Rio Formoso",
    "Natal",
    "Limoeiro",
    "Surubim",
    "Gravatá",
    "João Pessoa",
    "Petrolina",
    "Petrópolis",
    "Cabo Frio",
    "Taubaté",
    "Sorocaba",
  ];

  const columns = [
    {
      field: "id",
      headerName: "Id",
      width: 100,
      sortable: true,
    },
    { field: "cidade", headerName: "Cidade", width: 160 },
    { field: "sensTerm", headerName: "Sensação Térmica", width: 190 },
    { field: "humidade", headerName: "Humidade", width: 140 },
    {
      field: "temp",
      headerName: "Temperatura",
      width: 160,
      sortable: true,
    },
  ];

  const [linhas, setLinhas] = useState();

  const key = "74ef281d37b3fcead70089f9d1f12a4c";

  useEffect(() => {
    const info = [];

    citys.map((city, index) => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`
      )
        .then((res) => res.json())
        .then((res) => {
          if (!info.find((item) => item.id == res.id)) {
            info.push({
              id: index + 1,
              cidade: res.name,
              humidade: `${res.main.humidity}%`,
              sensTerm: `${Math.round(res.main.feels_like)}°C`,
              temp: `${Math.round(res.main.temp)}°C`,
            });

            if (index == citys.length - 1) {
              info.sort(function (a, b) {
                if (a.id < b.id) return -1;
                if (a.id > b.id) return 1;
                return 0;
              });

              setTimeout(() => {
                setLinhas(info);
                setLoading(false);
              }, 500);
            }
          }
        });
    });
  }, []);

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <section className="table">
      {!loading && (
        <Paper sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={linhas}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0 }}
            showToolbar
          />
        </Paper>
      )}
    </section>
  );
}

export default Table;
