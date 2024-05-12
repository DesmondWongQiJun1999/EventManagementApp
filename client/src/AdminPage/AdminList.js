import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router";

const AdminList = () => {
  let Events = ["Event 1", "Event 2", "Event 3"];
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const options = [
    'View',
    'Edit'
  ];
  return (
    <>
      <AppBar component="nav">
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "block", sm: "block" },
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Event Management App - Admin
            </Typography>
          </Box>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  textAlign: "center",
                  border: "2px solid white",
                  "&:hover": {
                    borderColor: "black",
                  },
                }}
                onClick={() => {
                  navigate("/");
                }}
              >
                <ListItemText primary={"Logout"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Toolbar>
      </AppBar>

      <List sx={{ width: "100%", marginTop: "64px" }}>
        {Events?.map((x, i) => {
          return (
            <>
              <ListItem alignItems="flex-start">
                <ListItemButton component="a" href="#simple-list">
                  <ListItemText primary={x} />
                </ListItemButton>
                <IconButton
                  onClick={console.log("del")}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  // id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  transformOrigin={{
                    vertical: "center", 
                    horizontal: "center", 
                  }}
                >
                  {options.map((option) => (
                    <MenuItem
                      key={option}
                      selected={option === "Pyxis"}
                      onClick={handleClose}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </ListItem>

              {i !== Events?.length - 1 ? <Divider component="li" /> : null}
            </>
          );
        })}
      </List>
    </>
  );
};

export default AdminList;
