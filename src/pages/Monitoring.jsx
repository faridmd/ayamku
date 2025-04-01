import React, { useEffect, useState } from "react";
import konpik from "../config/configuration"; // import konfigurasi firebase
import { getDatabase, ref, onValue } from "firebase/database";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import LineGraph from "../components/LineGraph";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

function Monitoring() {
  const [data, setData] = useState([]);
  const [uptime, setUptime] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const database = getDatabase(konpik);

    const dhtRef = ref(database, "DHT");
    const uptimeRef = ref(database, "Uptime");

    const fetchDHTData = () => {
      onValue(dhtRef, (snapshot) => {
        const dataItem = snapshot.val();
        if (dataItem) {
          const displayItem = Object.values(dataItem);
          setData(displayItem);
        }
      });
    };

    const fetchUptimeData = () => {
      onValue(uptimeRef, (snapshot) => {
        const uptimeItem = snapshot.val();
        if (uptimeItem) {
          const displayUptime = Object.values(uptimeItem);
          setUptime(displayUptime);
        }
      });
    };

    fetchDHTData();
    fetchUptimeData();
  }, []);

  return (
    <>
      <Grid
        container
        spacing={isMobile ? 1 : 2}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography
            sx={{
              fontSize: isMobile ? "1.2rem" : "1.5rem",
              fontWeight: "600",
              textAlign: "center",
              marginBottom: isMobile ? theme.spacing(1) : theme.spacing(2),
            }}
          >
            Realtime Monitoring
          </Typography>
          <Typography
            sx={{ textAlign: "center", fontSize: isMobile ? "0.9rem" : "1rem" }}
          >
            Uptime: {uptime}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <hr />
        </Grid>
        <Grid item xs={6} sm={3} display="flex" justifyContent="center">
          <Gauge
            width={isMobile ? 150 : 200}
            height={isMobile ? 150 : 200}
            value={data[0]}
            sx={{
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: isMobile ? 14 : 18,
                transform: "translate(0px, 0px)",
              },
            }}
            text={`Humidity\n${data[0]} %`}
          />
        </Grid>
        <Grid item xs={6} sm={3} display="flex" justifyContent="center">
          <Gauge
            width={isMobile ? 150 : 200}
            height={isMobile ? 150 : 200}
            value={data[1]}
            sx={{
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: isMobile ? 14 : 18,
                transform: "translate(0px, 0px)",
              },
            }}
            text={`Temperature\n${data[1]} °C`}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <LineGraph datas={data[0]} label="Humidity (%)" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LineGraph datas={data[1]} label="Temperature (°C)" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction={isMobile ? "column" : "row"}
            spacing={isMobile ? 1 : 2}
            justifyContent="center"
            sx={{ marginTop: isMobile ? theme.spacing(1) : theme.spacing(2) }}
          >
            <Button variant="contained" fullWidth={isMobile}>
              Unduh Data
            </Button>
            <Button variant="outlined" fullWidth={isMobile}>
              Bagikan Data
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default Monitoring;
