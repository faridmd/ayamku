import React, { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";
import {
  Button,
  Card,
  CardContent,
  Typography,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";

const AyamSettings = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleDeleteAll = () => {
    const db = getDatabase();
    const logsRef = ref(db, "LOGS");
    set(logsRef, null)
      .then(() => {
        setSnackbarMessage("Semua data berhasil dihapus!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        setSnackbarMessage("Terjadi kesalahan saat menghapus data.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      });
    setDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <Card style={{ maxWidth: 400, textAlign: "center" }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Pengaturan Ayam
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Gunakan tombol di bawah ini untuk menghapus semua data yang
            tersimpan di database. Pastikan Anda yakin sebelum melanjutkan.
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleDialogOpen}
            style={{ margin: "10px 0" }}
          >
            Hapus Semua Data
          </Button>
        </CardActions>
      </Card>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Konfirmasi Hapus Data</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Apakah Anda yakin ingin menghapus semua data? Tindakan ini tidak
            dapat dibatalkan.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Batal
          </Button>
          <Button onClick={handleDeleteAll} color="error">
            Hapus
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AyamSettings;
