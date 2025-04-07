// import React from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   InputBase,
//   Box,
//   Menu,
//   MenuItem,
//   Avatar,
//   Button,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import SearchIcon from "@mui/icons-material/Search";

// const Header: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//   const [drawerOpen, setDrawerOpen] = React.useState(false);
//   const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));

//   const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => setAnchorEl(null);

//   const toggleDrawer = () => setDrawerOpen(!drawerOpen);

//   return (
//     <AppBar
//       position="static"
//       color="default"
//       sx={{ boxShadow: "none", borderBottom: "1px solid #ccc" }}
//     >
//       <Toolbar sx={{ justifyContent: "space-between" }}>
//         {/* Left: Logo */}
//         <Typography
//           variant="h6"
//           sx={{ fontWeight: "bold", color: "primary.main" }}
//         >
//           LOGO
//         </Typography>

//         {/* Middle: Search */}
//         {!isMobile && (
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               bgcolor: "#f1f1f1",
//               px: 1,
//               borderRadius: 2,
//             }}
//           >
//             <SearchIcon />
//             <InputBase
//               placeholder="Search properties..."
//               sx={{ ml: 1, width: 200 }}
//             />
//           </Box>
//         )}

//         {/* Right: Avatar / Sign In / Hamburger */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//           {isMobile && (
//             <IconButton onClick={toggleDrawer}>
//               <MenuIcon />
//             </IconButton>
//           )}

//           {isLoggedIn ? (
//             <>
//               <IconButton onClick={handleMenu}>
//                 <Avatar alt="User" />
//               </IconButton>
//               <Menu
//                 anchorEl={anchorEl}
//                 open={Boolean(anchorEl)}
//                 onClose={handleClose}
//               >
//                 <MenuItem onClick={handleClose}>Profile</MenuItem>
//                 <MenuItem onClick={handleClose}>Logout</MenuItem>
//               </Menu>
//             </>
//           ) : (
//             <Button variant="contained" color="primary">
//               Sign In
//             </Button>
//           )}
//         </Box>
//       </Toolbar>

//       {/* Mobile Drawer */}
//       <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
//         <List>
//           {["Home", "Properties", "About", "Contact"].map((text) => (
//             <ListItem key={text}>
//               <ListItemText primary={text} />
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>
//     </AppBar>
//   );
// };

// export default Header;

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Link as MuiLink,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const navLinks = [
  { text: "Home", path: "/" },
  { text: "Properties", path: "/property-listing" },
  { text: "Booked", path: "/booked" },
  { text: "Listed Property", path: "/listedProperty" },
];

const Header: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <AppBar
      position="static"
      color="default"
      sx={{ boxShadow: "none", borderBottom: "1px solid #ccc" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left: Logo */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            fontWeight: "bold",
            color: "primary.main",
            textDecoration: "none",
          }}
        >
          LOGO
        </Typography>

        {/* Nav Links (desktop only) */}
        {!isMobile && (
          <Box sx={{ display: "flex", gap: 2 }}>
            {navLinks.map(({ text, path }) => (
              <MuiLink
                key={text}
                component={Link}
                to={path}
                underline="none"
                color="text.primary"
                sx={{ fontSize: "1rem", fontWeight: 500 }}
              >
                {text}
              </MuiLink>
            ))}
          </Box>
        )}

        {/* Middle: Search (hidden on mobile) */}
        {!isMobile && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "#f1f1f1",
              px: 1,
              borderRadius: 2,
            }}
          >
            <SearchIcon />
            <InputBase
              placeholder="Search properties..."
              sx={{ ml: 1, width: 200 }}
            />
          </Box>
        )}

        {/* Right: Hamburger (mobile only) OR SignIn/Avatar (desktop) */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {isMobile ? (
            <IconButton onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          ) : isLoggedIn ? (
            <>
              <IconButton onClick={handleMenu}>
                <Avatar alt="User" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              Sign In
            </Button>
          )}
        </Box>
      </Toolbar>

      {/* Drawer for Mobile */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <List sx={{ width: 220 }} onClick={toggleDrawer}>
          {navLinks.map(({ text, path }) => (
            <ListItem component={Link} to={path} key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          {isLoggedIn ? (
            <>
              <ListItem>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          ) : (
            <ListItem component={Link} to="/login">
              <ListItemText primary="Sign In" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;
