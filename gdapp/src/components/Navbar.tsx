import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import AdminPanel from "./AdminPanel";
import { Link } from "react-router-dom";

interface Props {
  children?: string;
  value?: string;
  openBool?: boolean;
  onClick?: () => void;
  user?: any;
}

export const NavBar = ({ onClick, value, openBool, user }: Props) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [adminOpen, setAdminOpen] = React.useState(false);

  const handleAdmin = () => {
    setAdminOpen(!openBool);
    setAnchorElUser(null);
  };

  const closeAdmin = () => {
    setAdminOpen(false);
  };

  return (
    <div>
      <AppBar position="static" sx={{ bgcolor: "#342F31", color: "#F3BB3B" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <CropSquareIcon
              fontSize="large"
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
              }}
            />
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "#F3BB3B",
                  textDecoration: "none",
                  px: 1,
                }}
              >
                GD Browser
              </Typography>
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <Link to="/signup">
                  <MenuItem key="signup" onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">SignU edep</Typography>
                  </MenuItem>
                </Link>
                <Link to="/login">
                  <MenuItem key="login" onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">LogIn</Typography>
                  </MenuItem>
                </Link>
              </Menu>
            </Box>
            <CropSquareIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <Button
                  key="sign up"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Sign Up
                </Button>
              </Link>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button
                  key="log in"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Log In
                </Button>
              </Link>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="USER" src="/static/images/broken-user.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key="username" onClick={handleAdmin}>
                  <Typography textAlign="center">
                    {user ?? "No User"}
                  </Typography>
                </MenuItem>
                <MenuItem key="admin panel" onClick={handleAdmin}>
                  <Typography textAlign="center">Admin Panel</Typography>
                </MenuItem>
                <MenuItem key="log out" onClick={handleAdmin}>
                  <Typography textAlign="center">Log Out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <AdminPanel
        openBool={adminOpen}
        onClick={handleAdmin}
        user={user}
      ></AdminPanel>
    </div>
  );
};

export default NavBar;
