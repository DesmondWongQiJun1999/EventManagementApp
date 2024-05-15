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
  Button,
  Box,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { format } from "date-fns";

import { useNavigate } from "react-router";

const UserList = () => {
  const API_URL = "http://localhost:5000/";
  const [Events, setEvents] = useState([]);
  const [EventDetails, setEventDetails] = useState(null);
  const navigate = useNavigate();

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const closeDetailsDialog = () => {
    setOpenDetailsDialog(false);
  };

  const loadEvent = () => {
    fetch(API_URL + "api/events")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      });
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
              Event Management App - User
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
                <Button
                  variant="outlined"
                  onClick={() => {
                    setEventDetails(x)
                    setOpenDetailsDialog(true);
                  }}
                  sx={{ marginLeft: "auto" }}
                >
                  DETAILS
                </Button>
              </ListItem>

              {i !== Events?.length - 1 ? <Divider component="li" /> : null}
            </>
          );
        })}
      </List>

      <Dialog
        open={openDetailsDialog}
        onClose={closeDetailsDialog}
        // PaperProps={{
        //   component: "form",
        //   onSubmit: (event) => {
        //     event.preventDefault();
        //     const formData = new FormData(event.currentTarget);
        //     const formJson = Object.fromEntries(formData.entries());
        //     // const email = formJson.email;
        //     // console.log(email);
        //     editEvent(formJson);
        //   },
        // }}
      >
        <DialogTitle>Event Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            disabled
            margin="dense"
            id="name"
            name="Title"
            label="Event Title"
            fullWidth
            value={EventDetails?.Title}
            variant="standard"
          />

          <TextField
            autoFocus
            disabled
            margin="dense"
            id="name"
            name="Description"
            label="Event Description"
            fullWidth
            value={EventDetails?.Description}
            variant="standard"
            style={{ marginTop: "35px" }}
          />

          <TextField
            autoFocus
            disabled
            margin="dense"
            id="name"
            name="StartTime"
            label="Event Start Time"
            fullWidth
            value={EventDetails?.StartTime ? format(new Date(EventDetails?.StartTime), 'yyyy/MM/dd kk:mm:ss'): "Error: No End Date"}
            variant="standard"
            style={{ marginTop: "35px" }}
          />

          <TextField
            autoFocus
            disabled
            margin="dense"
            id="name"
            name="EndTime"
            label="Event End Time"
            fullWidth
            value={EventDetails?.EndTime ? format(new Date(EventDetails?.EndTime), 'yyyy/MM/dd kk:mm:ss') : "Error: No End Date"}
            variant="standard"
            style={{ marginTop: "35px" }}
          />

          <TextField
            autoFocus
            disabled
            margin="dense"
            id="name"
            name="LocationLink"
            label="Location/Link"
            fullWidth
            variant="standard"
            value={EventDetails?.LocationLink}
            style={{ marginTop: "35px"}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDetailsDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserList;
