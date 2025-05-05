import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { Lightbulb, Air, Opacity } from "@mui/icons-material";

// Styled components for better visuals
const ControlCard = styled(Card)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(2),
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: theme.spacing(2),
}));

const ControlButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  fontSize: "1rem",
  padding: theme.spacing(1, 3),
}));

const ManualControl = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const db = getDatabase();

  // state tiap relay
  const [lampState, setLampState] = useState(false);
  const [fanState, setFanState] = useState(false);
  const [pumpState, setPumpState] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentDevice, setCurrentDevice] = useState("");
  const [currentState, setCurrentState] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // sync state with Firebase
  useEffect(() => {
    const lampRef = ref(db, "CONDITION/LAMP");
    const fanRef = ref(db, "CONDITION/FAN");
    const pumpRef = ref(db, "CONDITION/WATERPUMP");

    onValue(lampRef, (snapshot) => {
      setLampState(snapshot.val());
    });

    onValue(fanRef, (snapshot) => {
      setFanState(snapshot.val());
    });

    onValue(pumpRef, (snapshot) => {
      setPumpState(snapshot.val());
    });
  }, [db]);

  const toggleState = (device, state) => {
    set(ref(db, `CONDITION/${device}`), state);
  };

  const handleDialogOpen = (device, state) => {
    setCurrentDevice(device);
    setCurrentState(state);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleConfirm = () => {
    toggleState(currentDevice, currentState);
    setSnackbarMessage(
      `${currentDevice} has been ${currentState ? "turned on" : "turned off"}`
    );
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    setDialogOpen(false);
  };

  return (
    <>
      <Grid
        container
        spacing={isMobile ? 2 : 4}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography
            sx={{
              fontSize: isMobile ? "1.5rem" : "2rem",
              fontWeight: "600",
              textAlign: "center",
              marginBottom: theme.spacing(2),
            }}
          >
            Manual Control
          </Typography>
        </Grid>

        {/* Lamp Control */}
        <Grid item xs={12} sm={4}>
          <ControlCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Lamp
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: lampState ? "primary.main" : "text.secondary",
                }}
              >
                <Lightbulb sx={{ fontSize: "3rem" }} />
              </Box>
              <Typography variant="body1" sx={{ marginTop: theme.spacing(1) }}>
                {lampState ? "ON" : "OFF"}
              </Typography>
              <ControlButton
                variant={lampState ? "contained" : "outlined"}
                color="primary"
                onClick={() => handleDialogOpen("LAMP", !lampState)}
              >
                {lampState ? "Turn Off" : "Turn On"}
              </ControlButton>
            </CardContent>
          </ControlCard>
        </Grid>

        {/* Fan Control */}
        <Grid item xs={12} sm={4}>
          <ControlCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Fan
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: fanState ? "primary.main" : "text.secondary",
                }}
              >
                <Air sx={{ fontSize: "3rem" }} />
              </Box>
              <Typography variant="body1" sx={{ marginTop: theme.spacing(1) }}>
                {fanState ? "ON" : "OFF"}
              </Typography>
              <ControlButton
                variant={fanState ? "contained" : "outlined"}
                color="primary"
                onClick={() => handleDialogOpen("FAN", !fanState)}
              >
                {fanState ? "Turn Off" : "Turn On"}
              </ControlButton>
            </CardContent>
          </ControlCard>
        </Grid>

        {/* Pump Control */}
        <Grid item xs={12} sm={4}>
          <ControlCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Water Pump
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: pumpState ? "primary.main" : "text.secondary",
                }}
              >
                <Opacity sx={{ fontSize: "3rem" }} />
              </Box>
              <Typography variant="body1" sx={{ marginTop: theme.spacing(1) }}>
                {pumpState ? "ON" : "OFF"}
              </Typography>
              <ControlButton
                variant={pumpState ? "contained" : "outlined"}
                color="primary"
                onClick={() => handleDialogOpen("WATERPUMP", !pumpState)}
              >
                {pumpState ? "Turn Off" : "Turn On"}
              </ControlButton>
            </CardContent>
          </ControlCard>
        </Grid>
      </Grid>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to {currentState ? "turn on" : "turn off"} the{" "}
            {currentDevice}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirm
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
    </>
  );
};

export default ManualControl;
