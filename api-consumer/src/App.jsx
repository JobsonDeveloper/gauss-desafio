import React from "react";
import "./Styles.css";
import Table from "./components/Table/Table";

function App() {

  return (
    <main className="page">
        <div className="page__header">
            <h1>PREVISÃO DO TEMPO</h1>
        </div>

        <Table />
    </main>
  );
}

export default App;
