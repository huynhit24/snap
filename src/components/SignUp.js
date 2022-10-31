import React from "react";
import Button from "@material-ui/core/Button";
import { FcGoogle } from "react-icons/fc";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import loginImg from "../assets/login.png";
import Topography from "@material-ui/core/Typography";
import { auth, provider, providerFacebook } from "../firebase";
import { Facebook } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "0 0 15px rgb(7 15 63 / 33%)",
    backgroundColor: "#171c30",
    color: "white",
  },
  paper: {
    marginTop: theme.spacing(15),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "25px",
    paddingTop: "35px",
  },
  mainImg: {
    width: "100%",
    height: "auto",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "#d9d9d9",
    backgroundColor: "green",
  },
  FBLogin: {
    backgroundColor: "blue"
  }
}));

function SignUp() {
  const classes = useStyles();

  //xử lý đăng nhập Google
  const login = () => {
    auth
      .signInWithPopup(provider)
      .then((res) => {
        console.log("Success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //xử lý đăng nhập Facebook
  const loginFacebook = () => {
    auth
      .signInWithPopup(providerFacebook)
      .then((res) => {
        console.log("Success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //xử lý đăng nhập SĐT
  // const loginPhone = () => {
  //   auth
  //     .signInWithPopup(providerPhone)
  //     .then((res) => {
  //       console.log("Success");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  //xử lý đăng nhập Github
  // const loginGithub = () => {
  //   auth
  //     .signInWithPopup(providerGithub)
  //     .then((res) => {
  //       console.log("Success");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <Container component="div" maxWidth="xs" className={classes.root}>
      <div className={classes.paper}>
        <img src={loginImg} className={classes.mainImg} alt="signup img" />
        <Topography variant="h4" style={{ paddingTop: "15px" }}>
          Đăng nhập SmartClass
        </Topography>
        <Button
          variant="outlined"
          color="primary"
          className={classes.submit}
          startIcon={<FcGoogle />}
          onClick={login}
        >
          Đăng nhập Google
        </Button>
        <Button
          style={ {marginTop: "5px", backgroundColor: "blue"} }
          variant="outlined"
          color="primary"
          className={classes.submit}
          startIcon={<Facebook />}
          onClick={loginFacebook}
        >
          Đăng nhập Facebook
        </Button>
        {/* <Button
          style={ {marginTop: "5px", backgroundColor: "yellow", color: "black"} }
          variant="outlined"
          color="primary"
          className={classes.submit}
          startIcon={<PhoneAndroid />}
          onClick={loginPhone}
        >
          Đăng nhập Phone
        </Button> */}
        {/* <Button
          style={ {marginTop: "5px", backgroundColor: "black", color: "white"} }
          variant="outlined"
          color="primary"
          className={classes.submit}
          startIcon={<GithubIcon />}
          onClick={loginGithub}
        >
          Đăng nhập Github
        </Button> */}
      </div>
    </Container>
  );
}

export default SignUp;
