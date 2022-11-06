import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../../firebase";
import { useHistory } from "react-router-dom";
//import backgroundChat from "../Assets/gaming-plus-story_img.png";

// var randomColor = Math.floor(Math.random()*16777215).toString(16);
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "50px",
    paddingBottom: "25px",
    // color: "#f0f0f0",
    color: "#f0f0f0",
    // backgroundColor: "f0f0f0"
  },
  heading: {
    fontSize: "2.2em",
    fontWeight: "700",
  },
  subHeading: {
    marginTop: "10px",
    fontSize: "1.6em",
  },
  channelDiv: {
    padding: "15px",
  },
  channelContent: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    padding: "20px",
    alignItems: "center",
  },
  square: {
    height: "80px",
    width: "80px",
    backgroundColor: "#8fabbd66",
    // backgroundColor: "black",
    fontSize: "2rem",
    // color: "#cb43fc" 
    // đang code chỗ này
  },
  rootChannel: {
    height: "calc(100vh - 185px)",
    position: "relative",
    padding: "15px",
    overflowY: "scroll",
    // backgroundColor: "black"
  },
  channelText: {
    paddingTop: "10px",
    fontSize: "1.2rem",
  },
  channelCard: {
    // backgroundColor: "#1e2439",
    backgroundColor: "transparent",
    boxShadow:
      "0px 3px 4px -1px rgb(0 0 0 / 17%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    color: "rgb(220, 221, 222)",
    // color: "black",
  },
  backgroundChatSupport: {
    marginTop: "50px",
    width: "50%",
    height: "auto",
    // backgroundColor: "white",
  } 
}));

function Home() {
  const classes = useStyles();
  const [channels, setChannels] = useState([]);
  const history = useHistory();

  useEffect(() => {
    db.collection("channels")
      .orderBy("channelName", "asc")
      .onSnapshot((snapshot) => {
        setChannels(
          snapshot.docs.map((channel) => ({
            channelName: channel.data().channelName,
            id: channel.id,
          }))
        );
      });
  }, []);

  const goToChannel = (id) => {
    history.push(`/channel/${id}`);
  };

  return (
    <div style={{ backGroundColor: "transparent" }}>{/*<div style={{ backgroundColor: "rgb(34 39 59)" }}>*/}
      <Grid container className={classes.root}>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          {/* color: "#cb43fc" */}
          <Typography component="h1" className={classes.heading} style={{color: "#cb43fc"}}>
             Snap 🤞🤞🤞
          </Typography>
          <Typography component="h1" className={classes.subHeading} style={{color: "white"}}>
            Cùng nhau trao đổi, chia sẻ kinh nghiệm học tập mọi lúc mọi nơi! 👍👍
          </Typography>          
        </Grid>
        {/* <Grid item xs={12} style={{ textAlign: "center" }}>
          <img src={backgroundChat} className={classes.backgroundChatSupport} alt="No background"/>
        </Grid> */}
      </Grid>

      <Grid container className={classes.rootChannel}>
        {channels.map((channel) => (
          <Grid
            item
            xs={6}
            md={3}
            className={classes.channelDiv}
            key={channel.id}
          >
            <Card className={classes.channelCard}>
              <CardActionArea
                style={{ display: "flex" }}
                onClick={() => goToChannel(channel.id)}
              >
                <CardContent className={classes.channelContent}>
                  <Avatar
                    variant="square"
                    className={classes.square}
                    style={{ backgroundColor: "#6a9ec066" }}
                  >
                    {channel.channelName.substr(0, 1).toUpperCase()}
                  </Avatar>
                  <Typography className={classes.channelText}>
                    {channel.channelName}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Home;
