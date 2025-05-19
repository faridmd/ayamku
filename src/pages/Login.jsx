import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useAuth } from "../App";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  // state untuk input dan feedback
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // state untuk register
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState("");
  const [regSuccess, setRegSuccess] = useState("");

  // state untuk lupa password
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");

  const [openRegister, setOpenRegister] = useState(false);
  const [openForgot, setOpenForgot] = useState(false);
  const [remember, setRemember] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // dummy login: email admin@ayam.ku, password admin
    if (email === "admin@ayam.ku" && password === "admin") {
      setUser({ email, remember });
      setLoading(false);
      navigate("/", { replace: true });
      return;
    }
    // firebase login
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser({
        email: userCredential.user.email,
        remember,
      });
      setLoading(false);
      navigate("/", { replace: true });
    } catch (err) {
      setError("Login gagal. Email atau password salah.");
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegLoading(true);
    setRegError("");
    setRegSuccess("");
    try {
      await createUserWithEmailAndPassword(auth, regEmail, regPassword);
      setRegSuccess("Registrasi berhasil! Silakan login.");
      setRegEmail("");
      setRegPassword("");
    } catch (err) {
      setRegError(
        "Registrasi gagal. Email mungkin sudah terdaftar atau password kurang kuat."
      );
    }
    setRegLoading(false);
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotError("");
    setForgotSuccess("");
    try {
      // simulasi sukses
      setForgotSuccess("Link reset password telah dikirim ke email Anda.");
      setForgotEmail("");
    } catch (err) {
      setForgotError("Gagal mengirim email reset password.");
    }
    setForgotLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          minWidth: 340,
          maxWidth: 380,
          borderRadius: 3,
          boxShadow: "0 8px 32px 0 rgba(31,38,135,0.15)",
        }}
      >
        <Typography variant="h5" fontWeight={700} align="center" mb={2}>
          Login Ayamku
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          mb={3}
        >
          Masuk untuk mengakses dashboard kandang ayam cerdas Anda
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            margin="normal"
            autoFocus
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                color="primary"
              />
            }
            label="Remember Me"
            sx={{ mt: 1 }}
          />
          {error && (
            <Typography color="error" variant="body2" mt={1} mb={1}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, py: 1.2, fontWeight: 600, fontSize: "1rem" }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </form>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="text"
            size="small"
            onClick={() => setOpenRegister(true)}
          >
            Register
          </Button>
          <Button
            variant="text"
            size="small"
            onClick={() => setOpenForgot(true)}
          >
            Lupa Password?
          </Button>
        </Box>
      </Paper>

      {/* dialog register */}
      <Dialog open={openRegister} onClose={() => setOpenRegister(false)}>
        <DialogTitle>Register Akun Baru</DialogTitle>
        <DialogContent>
          <form onSubmit={handleRegister}>
            <TextField
              label="Email"
              type="email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            {regError && (
              <Typography color="error" variant="body2" mt={1} mb={1}>
                {regError}
              </Typography>
            )}
            {regSuccess && (
              <Typography color="primary" variant="body2" mt={1} mb={1}>
                {regSuccess}
              </Typography>
            )}
            <DialogActions sx={{ px: 0 }}>
              <Button onClick={() => setOpenRegister(false)}>Batal</Button>
              <Button type="submit" variant="contained" disabled={regLoading}>
                {regLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Register"
                )}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* dialog lupa password */}
      <Dialog open={openForgot} onClose={() => setOpenForgot(false)}>
        <DialogTitle>Lupa Password</DialogTitle>
        <DialogContent>
          <form onSubmit={handleForgot}>
            <TextField
              label="Email"
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            {forgotError && (
              <Typography color="error" variant="body2" mt={1} mb={1}>
                {forgotError}
              </Typography>
            )}
            {forgotSuccess && (
              <Typography color="primary" variant="body2" mt={1} mb={1}>
                {forgotSuccess}
              </Typography>
            )}
            <DialogActions sx={{ px: 0 }}>
              <Button onClick={() => setOpenForgot(false)}>Batal</Button>
              <Button
                type="submit"
                variant="contained"
                disabled={forgotLoading}
              >
                {forgotLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Kirim"
                )}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Login;
