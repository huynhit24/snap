/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { Grid } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";
import Rooms from "../Chat/Rooms";
import { GoSignOut } from "react-icons/go";
import { FaUserEdit } from "react-icons/fa";
import { auth, db } from "../../firebase";
import { Link, Redirect } from "react-router-dom";
import EditProfile from "../Chat/EditProfile";
import Fade from "@material-ui/core/Fade";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import { Language, VideoCall,  School, BurstMode, ContactMail } from "@material-ui/icons";
// import { School } from "@material-ui/icons/School";
// import BurstMode from '@material-ui/icons/BurstMode';
// import { VideoCall } from "@material-ui/icons/VideoCall";
// import { ContactMailIcon } from "@material-ui/icons/ContactMail";
//new import
// import LaptopModal from "./LaptopModal";

const drawerWidth = 240;

//CSS cho Application component
const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  avatarGrid: {
    paddingTop: "20px",
    paddingLeft: "5px",
    paddingBottom: "20px",
    color: "#dcddde",
  },
  avatarIcon: {
    display: "flex",
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  avatarName: {
    fontSize: "1em",
    paddingLeft: "12px",
    paddingTop: "8px",
  },
  avatarDisplayName: {
    alignSelf: "center",
    paddingLeft: "10px",
    fontWeight: "600",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: "#3f51b5",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: "#22273b",
    color: "#dcddde",
    boxShadow:
      "0 1px 0 rgba(4,4,5,0.2),0 1.5px 0 rgba(6,6,7,0.05),0 2px 0 rgba(4,4,5,0.05);",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // CSS toolbar mixins cần thiết để nội dung ở bên dưới thanh ứng dụng
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#171c2e",
    color: "white",
  },
  sideToolBar: {
    backgroundColor: "#171c2e",
    color: "#fff",
    lineHeight: 1.6,
    boxShadow:
      "0 1px 0 rgba(4,4,5,0.2),0 1.5px 0 rgba(6,6,7,0.05),0 2px 0 rgba(4,4,5,0.05);",
    minHeight: "50px",
  },
  sideToolBarText: {
    letterSpacing: "0.2em",
    fontWeight: "900",
  },
  title: {
    flexGrow: 1,
  },
}));

function Application(props) {
  const { window, uid } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userDetails, setUserDetails] = useState([]);
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [alert, setAlert] = useState(false);
  const open = Boolean(anchorEl);

  useEffect(() => {
    db.collection("users")
      .doc(uid)
      .onSnapshot((doc) => {
        setUserDetails(doc.data());
        localStorage.setItem("userDetails", JSON.stringify(doc.data()));
      });
  }, [uid]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleEditProfile = () => {
    setEditProfileModal(!editProfileModal);
  };

  const handleAlert = () => {
    setAlert(!alert);
  };

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("signed out");
        localStorage.clear();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClassRoom = () => {
      
  }

  const handleCallVideo = () => {
      //window.location.href = 'https://www.google.com.vn';
      //window.open("https://www.google.com","_self")
  }

  const drawer = userDetails && (
    <div>
      <Toolbar className={classes.sideToolBar}>
        <Typography variant="h5" className={classes.sideToolBarText}>
          SNAP 🤞🤞🤞
        </Typography>
      </Toolbar>
      <Divider />
      <Grid className={classes.avatarGrid}>
        <div className={classes.avatarIcon}>
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
          >
            <Avatar
              alt={userDetails.name}
              src={userDetails.photoURL}
              className={classes.purple}
            />
          </StyledBadge>
          <Typography variant="h6" className={classes.avatarDisplayName}>
            {userDetails.displayName}
          </Typography>
        </div>
        <div>
          <Typography variant="h4" className={classes.avatarName}>
            {userDetails.name}
          </Typography>
          <Typography variant="h4" className={classes.avatarName}>
            {userDetails.email}
          </Typography>
        </div>
      </Grid>
      <Divider />
      <Rooms />
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <div className={classes.root}>
      <CssBaseline />

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alert}
        onClose={handleAlert}
        TransitionComponent={Fade}
        message="Đã cập nhật thành công tên hiển thị!"
        key={Fade}
        action={
          <IconButton aria-label="close" color="inherit" onClick={handleAlert}>
            <CloseIcon />
          </IconButton>
        }
      />

      {editProfileModal ? (
        <EditProfile toggler={toggleEditProfile} alert={handleAlert} />
      ) : null}

      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar style={{ minHeight: "50px" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              😍 Trang chủ
            </Link>
            {/* modal show laptop from smartshop */}
            {/* <LaptopModal /> */}
            {/* <Link to="/shop" style={{ textDecoration: "none", color: "#dcddde", marginLeft: "50px" }}>
              😍 Call Video
            </Link> */}
          </Typography>

          
          <div>
            {/* Gọi video */}
            <IconButton
              aria-label="VideoCall"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleCallVideo}
              color="inherit"
              href={null}
              title="Gọi video"
            >
              <VideoCall style={{color: "lightgreen"}}/>
            </IconButton>
            {/* Lớp học */}
            <IconButton
              aria-label="School"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleClassRoom}
              color="inherit"
              href={"/classroom"}
              title="Lớp học"
            >
              <School style={{color: "yellow"}}/>
            </IconButton>
            {/* Dark mode */}
            <IconButton
              aria-label="Darkmode"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleClassRoom}
              color="inherit"
              title="Darkmode"
            >
              <BurstMode style={{color: "#FB2576"}}/>
            </IconButton>
            {/* Liên hệ Snap */}
            <IconButton
              aria-label="Contact"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleClassRoom}
              color="inherit"
              title="Liên hệ Snap"
            >
              <ContactMail style={{color: "orange"}}/>
            </IconButton>
            {/* <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={toggleEditProfile}>
                <FaUserEdit /> &nbsp; Tiếng Việt
              </MenuItem>

              <MenuItem onClick={signOut}>
                <GoSignOut /> &nbsp; Tiếng Anh
              </MenuItem>
            </Menu> */}
          </div>

          {/* Chỉnh sửa thông tin & Đăng xuất */}
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              title="Tài khoản"
            >
              <AccountCircle style={{color: "white"}}/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={toggleEditProfile}>
                <FaUserEdit /> &nbsp; Sửa hồ sơ
              </MenuItem>

              <MenuItem onClick={signOut}>
                <GoSignOut /> &nbsp; Đăng xuất
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer} aria-label="chat rooms">
        {/* Việc thực hiện này có thể được hoán đổi với js để tránh SEO trùng lặp các liên kết. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Hiệu suất mở tốt hơn trên thiết bị di động.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>

        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

export default Application;
