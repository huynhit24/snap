import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import background_1 from '../../assets/images/bg-1.webp';
import background_2 from '../../assets/images/bg-2.png';
import background_3 from '../../assets/images/bg-3.jpg';
import background_4 from '../../assets/images/bg-4.png';
import background_5 from '../../assets/images/bg-5.webp';
import background_6 from '../../assets/images/bg-6.jpg';
import background_7 from '../../assets/images/bg-7.png';


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

const images = [
  background_1,
  background_2,
  background_3,
  background_4,
  background_5,
  background_6,
  background_7
];

function Home() {
  const classes = useStyles();
  const [image, setImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (image === images.length - 1) {
        setImage(0);
      } else {
        setImage(image + 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [image]);

  return (
    <div style={{ backGroundColor: "transparent", backgroundImage: images[image] }}>{/*<div style={{ backgroundColor: "rgb(34 39 59)" }}>*/}
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
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <img src={images[image]} className={classes.backgroundChatSupport} alt="No background" width={"100%"} height={"100%"}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
