import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { useState, useEffect } from "react";
import { Button, Snackbar, Alert } from "@mui/material";

export default function Database() {
  const [rows, setRows] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const db = getDatabase();
    const logsRef = ref(db, "LOGS");

    onValue(logsRef, (snapshot) => {
      const data = snapshot.val();
      const sortedKeys = Object.keys(data || {}).sort(
        (a, b) => new Date(data[a].timestamp) - new Date(data[b].timestamp)
      );
      const formattedRows = sortedKeys.map((key, index) => ({
        id: index + 1,
        waktu: data[key].localtime || "Unknown",
        tanggal: data[key].date || "Unknown",
        temperatur: `${data[key].temperature || "-"} C`,
        kelembaban: `${data[key].humidity || "-"} %`,
        status: "Normal", // add logic disini kalo perlu
        lampu: data[key].lamp ? "On" : "Off",
        pompa: data[key].pump ? "On" : "Off",
      }));
      setRows(formattedRows);
    });
  }, []);

  const handleDelete = (id) => {
    const db = getDatabase();
    const logsRef = ref(db, "LOGS");

    onValue(
      logsRef,
      (snapshot) => {
        const data = snapshot.val();
        const keyToDelete = Object.keys(data || {}).find(
          (key, index) => index + 1 === id
        );

        if (keyToDelete) {
          const logRef = ref(db, `LOGS/${keyToDelete}`);
          set(logRef, null).then(() => {
            setOpenSnackbar(true);
          });
        }
      },
      { onlyOnce: true }
    );
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "tanggal", headerName: "Tanggal", width: 150 },
    { field: "waktu", headerName: "Waktu", width: 150 },
    { field: "temperatur", headerName: "Temperatur", width: 150 },
    { field: "kelembaban", headerName: "Kelembaban", width: 150 },
    { field: "lampu", headerName: "Lampu", width: 100 },
    { field: "pompa", headerName: "Pompa", width: 100 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          style={{ backgroundColor: "#ff6666", color: "white" }}
          onClick={() => handleDelete(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <Typography sx={{ fontSize: "1.5rem", fontWeight: "600" }}>
        Database
      </Typography>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
        />
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Data berhasil dihapus!
        </Alert>
      </Snackbar>
    </div>
  );
}
