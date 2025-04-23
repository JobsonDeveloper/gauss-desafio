import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

function App() {
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "state",
      selector: (row) => row.state,
      sortable: true,
    },
  ];

  const data = [
    {
      id: 1,
      name: "jobson",
      email: "jobsondff",
      state: 88,
    },
  ];

  const [dados, setDados] = useState(data);
  const info = [];

  const handleFilter = (event) => {
    const filtroNome = data.filter((row) => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setDados(filtroNome);
  };

  const citys = ["Olinda", "Recife"];
  const key = "74ef281d37b3fcead70089f9d1f12a4c";
  // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`;

  useEffect(() => {
    if (info.length == 0) {
      citys.map((city) => {
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`
        )
          .then((res) => res.json())
          .then((res) => {
            info.push({
              id: res.id,
              cidade: res.name,
              minMaxTemp: `${res.main.temp_min} - ${res.main.temp_max}`,
              humidade: res.main.humidity,
              temperatura: res.main.temp,
            });
          });
      });

      console.log(info);
    }
  }, [citys, info]);

  return (
    <div className="container">
      <div className="text-end">
        <input type="text" onChange={handleFilter} />
      </div>
      <DataTable columns={columns} data={dados} pagination></DataTable>
    </div>
  );
}

export default App;
