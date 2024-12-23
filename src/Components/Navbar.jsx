import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className="bg-blue-600  shadow-md">
      <Toolbar className="flex justify-between items-center h-5">
        {/* Logo */}
        <Box className="flex items-center space-x-2">
        <Link to="/" className="text-white hover:text-gray-300">
          <Logo />
          </Link>
          <Typography variant="h6" component="div" className="text-white font-bold">
            weChatApp
          </Typography>
        </Box>

        {/* Desktop Navigation */}
        <Box className="hidden md:flex space-x-4">
          
          <Link to="/login" className="text-white hover:text-gray-300">
          login/signup
          </Link>
          <Link to="/about" className="text-white hover:text-gray-300">
            About
          </Link>
          <Link to="/contact" className="text-white hover:text-gray-300">
            Contact
          </Link>
        </Box>

        {/* Mobile Navigation */}
        <Box className="flex md:hidden">
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Mobile Menu Items */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <Link to="/login" className="text-gray-700">
              Login/Signup
            </Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/about" className="text-gray-700">
              About
            </Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/contact" className="text-gray-700">
              Contact
            </Link>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
