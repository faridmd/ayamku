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
  Box,
  Paper,
  useMediaQuery,
  Switch,
  FormControlLabel,
  TextField,
  Checkbox,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../App";
import AccountCircle from "@mui/icons-material/AccountCircle";

const AyamSettings = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const { user, setUser } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // opsi otomasi kandang
  const [lampAuto, setLampAuto] = useState(false);
  const [lampOnTime, setLampOnTime] = useState("18:00");
  const [lampOffTime, setLampOffTime] = useState("06:00");
  const [fanAuto, setFanAuto] = useState(false);
  const [fanThreshold, setFanThreshold] = useState(30);
  const [pumpAuto, setPumpAuto] = useState(false);
  const [pumpTankThreshold, setPumpTankThreshold] = useState(30); // persentase tandon
  const [notifActive, setNotifActive] = useState(true);

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

  const handleLogout = () => {
    setUser(null);
    window.location.href = "/login";
  };

  const handleSaveSettings = () => {
    const db = getDatabase();
    set(ref(db, "SETTINGS"), {
      lamp: {
        auto: lampAuto,
        onTime: lampOnTime,
        offTime: lampOffTime,
      },
      fan: {
        auto: fanAuto,
        threshold: fanThreshold,
      },
      pump: {
        auto: pumpAuto,
        tankThreshold: pumpTankThreshold, // persentase tandon
      },
      notification: notifActive,
    })
      .then(() => {
        setSnackbarMessage("Pengaturan berhasil disimpan!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      })
      .catch((error) => {
        setSnackbarMessage("Gagal menyimpan pengaturan.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: isMobile ? 2 : 6,
      }}
    >
      {/* User Info */}
      <Paper
        elevation={2}
        sx={{
          mb: 3,
          px: 3,
          py: 2,
          display: "flex",
          alignItems: "center",
          width: "100%",
          maxWidth: 400,
          justifyContent: "space-between",
          background: "#f7f7fa",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AccountCircle sx={{ mr: 1, fontSize: 32, color: "primary.main" }} />
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              User Login
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              {user?.email}
            </Typography>
          </Box>
        </Box>
        {isMobile && (
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={handleLogout}
            sx={{ ml: 2, fontWeight: 600 }}
          >
            Logout
          </Button>
        )}
      </Paper>

      <Card style={{ maxWidth: 400, textAlign: "center", marginBottom: 24 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Otomasi Kandang
          </Typography>
          <Box sx={{ textAlign: "left", mt: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={lampAuto}
                  onChange={(e) => setLampAuto(e.target.checked)}
                  color="primary"
                />
              }
              label="Lampu otomatis"
            />
            <Box
              sx={{
                pl: 3,
                mb: 1,
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                maxWidth: 320,
              }}
            >
              <TextField
                label="Jam nyala"
                type="time"
                size="small"
                value={lampOnTime}
                onChange={(e) => setLampOnTime(e.target.value)}
                disabled={!lampAuto}
                sx={{ minWidth: 140, flex: 1 }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Jam mati"
                type="time"
                size="small"
                value={lampOffTime}
                onChange={(e) => setLampOffTime(e.target.value)}
                disabled={!lampAuto}
                sx={{ minWidth: 140, flex: 1 }}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={fanAuto}
                  onChange={(e) => setFanAuto(e.target.checked)}
                  color="primary"
                />
              }
              label="Kipas otomatis"
            />
            <Box sx={{ pl: 3, mb: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Jika aktif, kecepatan kipas akan diatur otomatis berdasarkan
                suhu kandang. Jika nonaktif, kipas hanya bisa dikontrol manual.
              </Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={pumpAuto}
                  onChange={(e) => setPumpAuto(e.target.checked)}
                  color="primary"
                />
              }
              label="Pompa otomatis isi tandon"
            />
            <Box sx={{ pl: 3, mb: 1 }}>
              <TextField
                label="Isi tandon minimal (%)"
                type="number"
                size="small"
                value={pumpTankThreshold}
                onChange={(e) => setPumpTankThreshold(Number(e.target.value))}
                disabled={!pumpAuto}
                sx={{ width: 180 }}
                InputLabelProps={{ shrink: true }}
                helperText="Pompa aktif jika isi tandon di bawah nilai ini"
                FormHelperTextProps={{
                  sx: { marginLeft: 0, textAlign: "left", pl: 0 },
                }}
              />
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={notifActive}
                  onChange={(e) => setNotifActive(e.target.checked)}
                  color="primary"
                />
              }
              label="Aktifkan notifikasi suhu/kelembapan ekstrem (Telegram)"
            />
          </Box>
        </CardContent>
        <CardActions style={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveSettings}
            style={{ margin: "10px 0" }}
          >
            Simpan Pengaturan
          </Button>
        </CardActions>
      </Card>

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
    </Box>
  );
};

export default AyamSettings;
