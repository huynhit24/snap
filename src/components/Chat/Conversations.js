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
import Divider from "@material-ui/core/Divider";
import AddIcon from "@material-ui/icons/Add";
import { db } from "../../firebase";
import { useHistory } from "react-router-dom";
import { IoIosChatboxes } from "react-icons/io";
import { BiHash } from "react-icons/bi";
import CreateConversation from "../Chat/CreateConversation";
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

function Conversations() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [conversationList, setConversationList] = useState([]);
  const [showCreateConversation, setShowCreateConversation] = useState(false);
  const history = useHistory();
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    db.collection("channels")
      .orderBy("channelName", "asc")
      .onSnapshot((snapshot) => {
        setConversationList(
          snapshot.docs.map((channel) => ({ 
            channelName: channel.data().channelName,
            id: channel.id,
          }))
        );
      });
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  const goToChannel = (id) => {
    history.push(`/conversation/${id}`);
  };

  const manageCreateConversationModal = () => {
    setShowCreateConversation(!showCreateConversation);
  };

  const handleAlert = () => {
    setAlert(!alert);
  };

  const addConversation = (cName) => {
    if (cName) {
      cName = cName.toLowerCase().trim();
      if (cName === "") {
        handleAlert();
        return;
      }

      for (var i = 0; i < conversationList.length; i++) {
        if (cName === conversationList[i].channelName) {
          handleAlert();
          return;
        }
      }

      db.collection("channels")
        .add({ channelName: cName.toLowerCase() })
        .then((res) => {
          console.log("added new channel");
        })
        .then((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alert}
        onClose={handleAlert}
        TransitionComponent={Fade}
        message="Conversation Name Already Exist!!"
        key={Fade}
        action={
          <IconButton aria-label="close" color="inherit" onClick={handleAlert}>
            <CloseIcon />
          </IconButton>
        }
      />

      {showCreateConversation ? (
        <CreateConversation create={addConversation} manage={manageCreateConversationModal} />
      ) : null}
      <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
        <ListItemText primary="Tạo chat riêng" style={{textAlign: "center"}}/>
        <IconButton edge="end" aria-label="add" onClick={manageCreateConversationModal}>
          <AddIcon className={classes.primary} />
        </IconButton>
      </ListItem>
      <Divider />

      <List component="nav" aria-labelledby="nested-list-subheader">
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <IoIosChatboxes className={classes.iconDesign} />
          </ListItemIcon>
          <ListItemText primary="Phòng chat ⛔" style={{ color: "white", textAlign: "left" }} />
          {open ? (
            <ExpandLess className={classes.primary} />
          ) : (
            <ExpandMore className={classes.primary} />
          )}
        </ListItem>

        <Collapse in={open} timeout="auto">
          <List component="div" disablePadding>
            {conversationList.map((channel) => (
              <ListItem
                key={channel.id}
                button
                className={classes.nested}
                onClick={() => goToChannel(channel.id)}
              >
                <ListItemIcon style={{ minWidth: "30px" }}>
                  <BiHash
                    className={classes.iconDesign}
                    style={{ color: "white" }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    channel.channelName === channel.channelName.substr(0, 12)
                      ? channel.channelName
                      : `${channel.channelName.substr(0, 12)}...`
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

export default Conversations;
