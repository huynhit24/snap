import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import { db } from "../../firebase";
import { useHistory } from "react-router-dom";
import { IoMdChatboxes } from "react-icons/io";
import { BiHash } from "react-icons/bi";
import Fade from "@material-ui/core/Fade";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  iconDesign: {
    fontSize: "1.5em",
    color: "#cb43fc",
  },
  primary: {
    color: "#cb43fc",
  },
}));

function Users() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [userList, setUserList] = useState([]);
  const history = useHistory();
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    db.collection("users")
      .orderBy("displayName", "asc")
      .onSnapshot((snapshot) => {
        setUserList(
          snapshot.docs.map((user) => ({ 
            displayName: user.data().displayName,
            id: user.id,
          }))
        );
      });
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  const goToUser = (id) => {
    history.push(`/user/${id}`);
  };

  const handleAlert = () => {
    setAlert(!alert);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alert}
        onClose={handleAlert}
        TransitionComponent={Fade}
        message="User Name Already Exits!!"
        key={Fade}
        action={
          <IconButton aria-label="close" color="inherit" onClick={handleAlert}>
            <CloseIcon />
          </IconButton>
        }
      />

      <List component="nav" aria-labelledby="nested-list-subheader">
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <IoMdChatboxes className={classes.iconDesign} />
          </ListItemIcon>
          <ListItemText primary="Người dùng" style={{ color: "white", textAlign: "left" }} />
          {open ? (
            <ExpandLess className={classes.primary} />
          ) : (
            <ExpandMore className={classes.primary} />
          )}
        </ListItem>

        <Collapse in={open} timeout="auto">
          <List component="div" disablePadding>
            {userList.map((user) => (
              <ListItem
                key={user.id}
                button
                className={classes.nested}
                onClick={() => goToUser(user.id)}
              >
                <ListItemIcon style={{ minWidth: "30px" }}>
                  <BiHash
                    className={classes.iconDesign}
                    style={{ color: "white" }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    user.displayName === user.displayName.substr(0, 12)
                      ? user.displayName
                      : `${user.displayName.substr(0, 12)}...`
                  }
                  style={{ color: "white" }}
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </div>
  );
}

export default Users;
