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
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router";

const UserList = () => {
  let Events = ["Event 1", "Event 2", "Event 3"];
  const navigate = useNavigate();

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
              Event Management App
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
                <Button variant="outlined" sx={{ marginLeft: "auto" }}>
                  DETAILS
                </Button>
              </ListItem>

              {i !== Events?.length - 1 ? <Divider component="li" /> : null}
            </>
          );
        })}
      </List>
    </>
  );
};

export default UserList;
