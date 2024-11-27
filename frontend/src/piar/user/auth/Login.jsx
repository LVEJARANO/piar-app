import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {
  login,
  setAccessToken,
  setAccessrefresh,
  setdatauser,
  setAccessCatalogo,
  setMunicipio,
} from "../../../services/auth";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";
import logo from "../../../assets/img/logo_piar.png";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Ingresar Usuario y Contraseña", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    try {
      const credentials = { username, password };
      const user = await login(credentials);
      setAccessToken(user.data.access);
      setAccessrefresh(user.data.refresh);
      setdatauser(user.data.user_data);
      setAccessCatalogo(JSON.stringify([].concat(...user.data.catalogo)));
      setMunicipio(JSON.stringify([].concat(...user.data.municipio)));
      setErrorMessage("");
      navigate("/dashboard/home");
    } catch (error) {
      toast.error("Usuario o Contraseña Incorrectos!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme} >
      <Grid container component="main" sx={{ height: "100vh",backgroundColor: "#f8f9fa" }} p={3} >
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={8}
          md={4}
          component={Paper}
          elevation={7}
          square
          sx={{
            mx: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            border: "1px solid", // Ancho y tipo de borde
            borderColor: "success.main", // Puedes usar un color del tema o cualquier valor CSS válido
            borderRadius: "16px",
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box>
              <img src={logo} alt="Logo" style={{ height: "180px" }} />
            </Box>
            <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
              Inicia sesión
            </Typography>
            <Box component="form" noValidate onSubmit={submit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Usuario o Correo"
                name="username"
                autoComplete="email"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recordar Contraseña"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#0d6efd",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#255cac",
                  },
                }}
              >
                Ingresar
              </Button>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
