import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Switch,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

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

  // state tiap relay
  const [lampState, setLampState] = useState(false);
  const [fanState, setFanState] = useState(false);
  const [pumpState, setPumpState] = useState(false);

  return (
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
            <Switch
              checked={lampState}
              onChange={() => setLampState(!lampState)}
              color="primary"
            />
            <Typography variant="body1" sx={{ marginTop: theme.spacing(1) }}>
              {lampState ? "ON" : "OFF"}
            </Typography>
            <ControlButton
              variant={lampState ? "contained" : "outlined"}
              color="primary"
              onClick={() => setLampState(!lampState)}
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
            <Switch
              checked={fanState}
              onChange={() => setFanState(!fanState)}
              color="primary"
            />
            <Typography variant="body1" sx={{ marginTop: theme.spacing(1) }}>
              {fanState ? "ON" : "OFF"}
            </Typography>
            <ControlButton
              variant={fanState ? "contained" : "outlined"}
              color="primary"
              onClick={() => setFanState(!fanState)}
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
            <Switch
              checked={pumpState}
              onChange={() => setPumpState(!pumpState)}
              color="primary"
            />
            <Typography variant="body1" sx={{ marginTop: theme.spacing(1) }}>
              {pumpState ? "ON" : "OFF"}
            </Typography>
            <ControlButton
              variant={pumpState ? "contained" : "outlined"}
              color="primary"
              onClick={() => setPumpState(!pumpState)}
            >
              {pumpState ? "Turn Off" : "Turn On"}
            </ControlButton>
          </CardContent>
        </ControlCard>
      </Grid>
    </Grid>
  );
};

export default ManualControl;
