import React, { useState, useEffect } from "react";
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
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

const AdminList = () => {
  const API_URL = "http://localhost:5000/";
  const [Events, setEvents] = useState([]);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const closeCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  const [editID, setEditID] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const closeEditDialog = () => {
    setOpenEditDialog(false);
  };

  const loadEvent = () => {
    fetch(API_URL + "api/events")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      });
  };

  const createEvent = async (data) => {
    console.log(data);
    try {
      const response = await fetch(API_URL + "api/events/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);
      closeCreateDialog();
      loadEvent();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteEvent = async (data) => {
    try {
      const response = await fetch(API_URL + `api/events/delete/${data?._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      if (response.status === 204) {
        console.log("Event deleted successfully");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    loadEvent();
  };

  const editEvent = async (data) => {
    try {
      const response = await fetch(API_URL + `api/events/edit/${editID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedEvent = await response.json();
      console.log("Event updated successfully", updatedEvent);
    } catch (error) {
      console.error("Error:", error);
    }
    closeMenu();
    closeEditDialog();
    loadEvent();
  };

  useEffect(() => {
    loadEvent();
  }, []);

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
                  <ListItemText primary={x?.Title} />
                </ListItemButton>
                <IconButton>
                  <DeleteIcon
                    onClick={() => {
                      deleteEvent(x);
                    }}
                  />
                </IconButton>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={openMenu ? "long-menu" : undefined}
                  aria-expanded={openMenu ? "true" : undefined}
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
                  open={openMenu}
                  onClose={closeMenu}
                  transformOrigin={{
                    vertical: "center",
                    horizontal: "center",
                  }}
                >
                  <MenuItem onClick={closeMenu}>View</MenuItem>
                  <MenuItem
                    onClick={() => {
                      setOpenEditDialog(true);
                      setEditID(x?._id);
                    }}
                  >
                    Edit
                  </MenuItem>
                </Menu>
              </ListItem>

              {i !== Events?.length - 1 ? <Divider component="li" /> : null}
            </>
          );
        })}
      </List>

      <Dialog
        open={openCreateDialog}
        onClose={closeCreateDialog}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            // const email = formJson.email;
            // console.log(email);
            createEvent(formJson);
          },
        }}
      >
        <DialogTitle>Create Event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="Title"
            label="Event Title"
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="Description"
            label="Event Description"
            fullWidth
            variant="standard"
            style={{ marginTop: "10px", marginBottom: "30px" }}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker
                label="Event Start Time"
                name="StartTime"
                slotProps={{ popper: { placement: "right" } }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <div style={{ marginTop: "25px" }} />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker
                label="Event End Time"
                name="EndTime"
                slotProps={{ popper: { placement: "right" } }}
              />
            </DemoContainer>
          </LocalizationProvider>

          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="LocationLink"
            label="Location/Link"
            fullWidth
            variant="standard"
            style={{ marginTop: "15px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCreateDialog}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openEditDialog}
        onClose={closeEditDialog}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            // const email = formJson.email;
            // console.log(email);
            editEvent(formJson);
          },
        }}
      >
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="Title"
            label="Event Title"
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="Description"
            label="Event Description"
            fullWidth
            variant="standard"
            style={{ marginTop: "10px", marginBottom: "30px" }}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker
                label="Event Start Time"
                name="StartTime"
                slotProps={{ popper: { placement: "right" } }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <div style={{ marginTop: "25px" }} />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker
                label="Event End Time"
                name="EndTime"
                slotProps={{ popper: { placement: "right" } }}
              />
            </DemoContainer>
          </LocalizationProvider>

          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="LocationLink"
            label="Location/Link"
            fullWidth
            variant="standard"
            style={{ marginTop: "15px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ position: "absolute", bottom: 40, right: 30 }}>
        <Fab color="primary" aria-label="add" onClick={setOpenCreateDialog}>
          <AddIcon />
        </Fab>
      </Box>
    </>
  );
};

export default AdminList;
