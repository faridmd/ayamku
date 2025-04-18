import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, useLocation } from "react-router";

// icons
import HomeIcon from "@mui/icons-material/Home";
import LegendToggleIcon from "@mui/icons-material/LegendToggle";
import AdjustIcon from "@mui/icons-material/Adjust";
import StorageIcon from "@mui/icons-material/Storage";
import KeyboardCommandKeyIcon from "@mui/icons-material/KeyboardCommandKey";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Keyboard } from "@mui/icons-material";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(2),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Frame({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [bottomNavValue, setBottomNavValue] = React.useState(location.pathname);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleBottomNavChange = (event, newValue) => {
    setBottomNavValue(newValue);
    window.location.href = newValue;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        padding: isMobile ? theme.spacing(1) : theme.spacing(2),
      }}
    >
      <CssBaseline />
      {!isMobile && (
        <>
          <AppBar position="fixed" open={open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={[
                  {
                    mr: 2,
                  },
                  open && { display: "none" },
                ]}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Ayamku
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "ltr" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              <Link to={"/"}>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{
                      color: `${location.pathname === "/" ? "blue" : "black"}`,
                      backgroundColor: `${
                        location.pathname === "/" ? "#dbdbdb" : "white"
                      }`,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: `${
                          location.pathname === "/" ? "blue" : "black"
                        }`,
                      }}
                    >
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText>Home</ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link to={"/monitoring"}>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{
                      color: `${
                        location.pathname === "/monitoring" ? "blue" : "black"
                      }`,
                      backgroundColor: `${
                        location.pathname === "/monitoring"
                          ? "#dbdbdb"
                          : "white"
                      }`,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: `${
                          location.pathname === "/monitoring" ? "blue" : "black"
                        }`,
                      }}
                    >
                      <LegendToggleIcon />
                    </ListItemIcon>
                    <ListItemText>Monitoring</ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link to={"/controller"}>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{
                      color: `${
                        location.pathname === "/controller" ? "blue" : "black"
                      }`,
                      backgroundColor: `${
                        location.pathname === "/controller"
                          ? "#dbdbdb"
                          : "white"
                      }`,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: `${
                          location.pathname === "/controller" ? "blue" : "black"
                        }`,
                      }}
                    >
                      <AdjustIcon />
                    </ListItemIcon>
                    <ListItemText>Manual Control</ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link to={"/database"}>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{
                      color: `${
                        location.pathname === "/database" ? "blue" : "black"
                      }`,
                      backgroundColor: `${
                        location.pathname === "/database" ? "#dbdbdb" : "white"
                      }`,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: `${
                          location.pathname === "/database" ? "blue" : "black"
                        }`,
                      }}
                    >
                      <StorageIcon />
                    </ListItemIcon>
                    <ListItemText>Database</ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
            <Divider />
            <List>
              <Link to={"/settings"}>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{
                      color: `${
                        location.pathname === "/settings" ? "blue" : "black"
                      }`,
                      backgroundColor: `${
                        location.pathname === "/settings" ? "#dbdbdb" : "white"
                      }`,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: `${
                          location.pathname === "/settings" ? "blue" : "black"
                        }`,
                      }}
                    >
                      <KeyboardCommandKeyIcon />
                    </ListItemIcon>
                    <ListItemText>Settings</ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
          </Drawer>
        </>
      )}
      <Main
        open={open}
        sx={{
          padding: isMobile ? theme.spacing(1) : theme.spacing(2),
          marginBottom: isMobile ? theme.spacing(7) : 0,
        }}
      >
        <DrawerHeader />
        {children}
      </Main>
      {isMobile && (
        <BottomNavigation
          value={bottomNavValue}
          onChange={handleBottomNavChange}
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: theme.zIndex.appBar,
            backgroundColor: theme.palette.background.paper,
            boxShadow: "0px -2px 5px rgba(0, 0, 0, 0.1)",
            padding: theme.spacing(0.5),
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            gap: theme.spacing(0.5),
          }}
        >
          <BottomNavigationAction
            label="Monitoring"
            value="/monitoring"
            icon={<LegendToggleIcon />}
            sx={{
              fontSize: "0.7rem",
              minWidth: "auto",
              padding: theme.spacing(0.5),
            }}
          />
          <BottomNavigationAction
            label="Control"
            value="/controller"
            icon={<AdjustIcon />}
            sx={{
              fontSize: "0.7rem",
              minWidth: "auto",
              padding: theme.spacing(0.5),
            }}
          />
          <BottomNavigationAction
            label="Home"
            value="/"
            icon={<HomeIcon />}
            sx={{
              fontSize: "0.7rem", // Ukuran font lebih kecil
              minWidth: "auto", // Menghindari lebar minimum default
              padding: theme.spacing(0.5),
            }}
          />
          <BottomNavigationAction
            label="Database"
            value="/database"
            icon={<StorageIcon />}
            sx={{
              fontSize: "0.7rem",
              minWidth: "auto",
              padding: theme.spacing(0.5),
            }}
          />
          <BottomNavigationAction
            label="Settings"
            value="/settings"
            icon={<KeyboardCommandKeyIcon />}
            sx={{
              fontSize: "0.7rem",
              minWidth: "auto",
              padding: theme.spacing(0.5),
            }}
          />
        </BottomNavigation>
      )}
    </Box>
  );
}
