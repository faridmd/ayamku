import React from "react";
import { Grid, Typography, Card, CardContent, Button } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const FeatureCard = styled(Card)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(2),
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: theme.spacing(2),
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid
      container
      spacing={isMobile ? 2 : 4}
      justifyContent="center"
      alignItems="center"
      sx={{ padding: theme.spacing(2) }}
    >
      <Grid item xs={12}>
        <Typography
          sx={{
            fontSize: isMobile ? "1.8rem" : "2.5rem",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: theme.spacing(3),
          }}
        >
          Selamat Datang di Kandang Ayam Cerdas
        </Typography>
        <Typography
          sx={{
            fontSize: isMobile ? "1rem" : "1.2rem",
            textAlign: "center",
            color: theme.palette.text.secondary,
            marginBottom: theme.spacing(4),
          }}
        >
          Pantau dan kendalikan kandang ayam Anda dengan mudah dan efisien
          melalui platform ini. #JagonyaAyam
        </Typography>
      </Grid>

      {/* Feature Cards */}
      <Grid item xs={12} sm={6} md={4}>
        <FeatureCard>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Monitoring Realtime
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Pantau suhu, kelembaban, dan kondisi kandang ayam secara langsung.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: theme.spacing(2) }}
              href="/monitoring"
            >
              Lihat Monitoring
            </Button>
          </CardContent>
        </FeatureCard>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <FeatureCard>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Kontrol Manual
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Kendalikan perangkat seperti lampu, kipas, dan pompa air secara
              manual.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: theme.spacing(2) }}
              href="/controller"
            >
              Kontrol Sekarang
            </Button>
          </CardContent>
        </FeatureCard>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <FeatureCard>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Database
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Akses data historis untuk analisis dan pengambilan keputusan.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: theme.spacing(2) }}
              href="/database"
            >
              Lihat Database
            </Button>
          </CardContent>
        </FeatureCard>
      </Grid>
    </Grid>
  );
};

export default Home;
