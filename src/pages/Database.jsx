import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";

const rows = [
  {
    id: 1,
    waktu: "Wednesday, 12:01",
    temperatur: "28 C",
    kelembaban: "54 %",
    status: "Normal",
  },
  {
    id: 2,
    waktu: "Wednesday, 12:02",
    temperatur: "32 C",
    kelembaban: "60 %",
    status: "Normal",
  },
  {
    id: 3,
    waktu: "Wednesday, 12:03",
    temperatur: "31 C",
    kelembaban: "55 %",
    status: "Normal",
  },
  {
    id: 4,
    waktu: "Wednesday, 12:04",
    temperatur: "29 C",
    kelembaban: "52 %",
    status: "Normal",
  },
  {
    id: 5,
    waktu: "Wednesday, 12:05",
    temperatur: "30 C",
    kelembaban: "58 %",
    status: "Normal",
  },
  {
    id: 6,
    waktu: "Wednesday, 12:06",
    temperatur: "33 C",
    kelembaban: "61 %",
    status: "Normal",
  },
  {
    id: 7,
    waktu: "Wednesday, 12:07",
    temperatur: "27 C",
    kelembaban: "50 %",
    status: "Normal",
  },
  {
    id: 8,
    waktu: "Wednesday, 12:08",
    temperatur: "34 C",
    kelembaban: "63 %",
    status: "Normal",
  },
  {
    id: 9,
    waktu: "Wednesday, 12:09",
    temperatur: "28 C",
    kelembaban: "54 %",
    status: "Normal",
  },
  {
    id: 10,
    waktu: "Wednesday, 12:10",
    temperatur: "29 C",
    kelembaban: "56 %",
    status: "Normal",
  },
];

const columns = [
  { field: "waktu", headerName: "Waktu", width: 300 },
  { field: "temperatur", headerName: "Temperatur", width: 150 },
  { field: "kelembaban", headerName: "Kelembaban", width: 150 },
  { field: "status", headerName: "Status", width: 150 },
];

export default function Database() {
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
    </div>
  );
}
