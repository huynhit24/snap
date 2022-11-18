import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";

import { db } from "../../firebase";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
// import ExpandLess from "@material-ui/icons/ExpandLess";
// import ExpandMore from "@material-ui/icons/ExpandMore";
import { ImUserCheck } from "react-icons/im";
// import { BiHash } from "react-icons/bi";
import { makeStyles } from "@material-ui/core/styles";
import { CheckBox } from "@material-ui/icons";
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  iconDesign: {
    fontSize: "2em",
    color: "#cb43fc",
  },
  primary: {
    color: "#cb43fc",
  },
}));

function CreateConversation({ create, manage }) {
  const [open, setOpen] = useState(true);
  const [conversationName, setConversationName] = useState("");
  const [userList, setUserList] = useState([]);
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  // const handleToggle = (id, event) => {
  //   if (selected.includes(id)) {
  //     setSelected(selected.filter((item) => item !== id));
  //     setChecked(event.target.checked);
  //   } else {
  //     setSelected([...selected, id]);
  //     setChecked(false);
  //     setChecked(event.target.checked);
  //   }
  // };

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

  const handleClose = () => {
    setOpen(false);
    manage();
  };
  const handleNewConversation = (e) => {
    e.preventDefault();
    if (conversationName) {
      create(conversationName);
      manage();
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Tạo phòng chat riêng mới"}
        </DialogTitle>
        <DialogContent>
          <form autoComplete="off" onSubmit={handleNewConversation}>
            {/* <TextField
              id="outlined-basic"
              label="Nhập tên phòng"
              fullWidth
              margin="normal"
              variant="outlined"
              required
              value={roomName}
              style={{ backgroundColor: "rgb(45 45 73)", borderRadius: "5px" }}
              onChange={(e) => {
                setRoomName(e.target.value);
              }}
            /> */}

            <List component="nav" aria-labelledby="nested-list-subheader">
              <ListItem button>
                <ListItemIcon>
                  <ImUserCheck className={classes.iconDesign} />
                </ListItemIcon>
                <ListItemText primary="Người dùng" style={{ color: "white", textAlign: "left" }} />
                {/* {open ? (
                  <ExpandLess className={classes.primary} />
                ) : (
                  <ExpandMore className={classes.primary} />
                )} */}
              </ListItem>

              <Collapse in={open} timeout="auto">
                <List component="div" disablePadding>
                  {userList.map((user) => (
                    <ListItem
                      key={user.id}
                      button
                      className={classes.nested}
                      // onClick={() => goToUser(user.id)}
                    >
                      <ListItemIcon style={{ minWidth: "30px" }}>
                        {/* <BiHash
                          className={classes.iconDesign}
                          style={{ color: "white" }}
                        /> */}
                        <FormControlLabel control={
                            <CheckBox 
                              inputProps={{ 'aria-label': 'primary checkbox' }}
                              className={classes.iconDesign} 
                              style={{ color: "white" }}
                              onChange={() => handleChange()}
                              
                              checked = {checked}
                            />  
                          }
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
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            style={{ color: "white" }}
          >
            Hủy
          </Button>
          <Button
            onClick={(e) => {
              handleNewConversation(e);
            }}
            type="submit"
            color="primary"
            autoFocus
            variant="contained"
          >
            Tạo
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateConversation;
