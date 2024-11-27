import React, { useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Outlet } from "react-router-dom";
import { useState } from "react";

import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CycloneIcon from "@mui/icons-material/Cyclone";
import Tooltip from "@mui/material/Tooltip";
import { Card, CardContent } from "@mui/material";
import { logout } from "../services/auth";
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

import logo from '../assets/img/logo_piar.png'

const drawerWidth = 240;

function Principal(props) {
  const storedUser = JSON.parse(localStorage.getItem("data"));
  console.log("🚀 ~ Principal ~ storedUser:", storedUser)
  const iniciales = `${storedUser.persona.primer_nombre.charAt(
    0
  )}${storedUser.persona.primer_apellido.charAt(0)}`;

  const [modulos, setmodulos] = useState(
    storedUser.modulo_gpo_permiso.modulo
  );

  const navigate = useNavigate();

  const [openCollapse, setOpenCollapse] = useState(true);


  const cerrarsesion = () => {
    logout();
    navigate("/");
  };
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const rutaTextoPersonalizado = {
    PERSONA: "Persona",
    MATRICULA: "Matricula",
    PIAR: "Piar",
  };
  const rutaTextoPersonalizadourl = {
    PERSONA: "personas",
    MATRICULA: "matricula",
    PIAR: "sede-piar",
  };

  const renderIcon = (index) => {
    switch (index % 2) {
      case 0:
        return <OtherHousesIcon />;
      case 1:
        return <AccountCircleIcon />;
      default:
        return null;
    }
  };

  const handleClick = () => {
    setOpenCollapse(!openCollapse);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickk = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const handleClickb = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const drawer = (
    <div>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center", // Centra verticalmente
          justifyContent: "center", // Centra horizontalmente
        }}
      >
        <img src={logo} alt="Logo" style={{ height: "130px" }} />
      </Toolbar>
      <Divider />
      <List>
        {["Inicio"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton to="/dashboard/home">
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        {modulos.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              to={`/dashboard/${rutaTextoPersonalizadourl[item.nombre]}`}
            >
              <ListItemIcon>{renderIcon(index)}</ListItemIcon>
              <ListItemText primary={rutaTextoPersonalizado[item.nombre]} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />

      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "fixed",
          bottom: 0,
          margin: 2,
        }}
      ></List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#0a58ca",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
           PIAR
          </Typography>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ marginLeft: "auto" }}
          >
            Bienvenido(a) {storedUser.persona.primer_nombre}{" "}
            {storedUser.persona.segundo_nombre}{" "}
            {storedUser.persona.primer_apellido}{" "}
            {storedUser.persona.segundo_apellido}
          </Typography>
          <Tooltip title="Account settings">
            <div>
              {" "}
              {/* Contenedor para los elementos internos */}
              <IconButton
                onClick={handleClickb}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>{iniciales}</Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleClose}>
                  <Avatar /> Mi Perfil
                </MenuItem>
                <Divider />

                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Ajustes
                </MenuItem>
                <MenuItem onClick={cerrarsesion}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Cerrar sesión
                </MenuItem>
              </Menu>
            </div>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: "100%", // Cambia el ancho a 100%
          marginLeft: 0, // Elimina el margen izquierdo para dispositivos móviles
          overflow: "auto",
          minHeight: "100vh",
        }}
      >
        <Toolbar />

        <Card>
          <CardContent>
            <Outlet />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

Principal.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default Principal;
