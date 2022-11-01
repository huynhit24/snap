import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Application from "./components/Application";
import Chat from "./components/Chat";
import Login from "./components/SignUp";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth, db } from "./firebase";
import "./App.css";
//colormode

// eslint-disable-next-line no-unused-vars
import { ThemeProvider } from '@material-ui/core/styles';
// eslint-disable-next-line no-unused-vars
import theme from './configs/theme';
// eslint-disable-next-line no-unused-vars
import useTheme from './hooks/useTheme';

//new inport component
//import LaptopModal from "./Components/LaptopModal";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: "#22273b !important",
    height: "100vh",
  },
}));

function App() {
  const classes = useStyles();
  const [user, setUser] = useState(null);

  // get and set theme
  //useTheme();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log("user exits");
            } else {
              const details = {
                name: user.displayName,
                displayName: user.displayName.split(" ")[0],
                photoURL: user.photoURL,
                email: user.email,
                uid: user.uid,
              };
              db.collection("users")
                .doc(user.uid)
                .set(details)
                .then((res) => {
                  console.log("new user created");
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });

        setUser(user.uid);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login />
        ) : (
          
          // <ThemeProvider theme={theme}>
            <div className={classes.root}>
              <Application uid={user} />
              <main className={classes.content}>
                <div className={classes.toolbar} style={{ minHeight: "50px" }} />
                <Switch>
                  <Route path="/" exact>
                    <Home />
                  </Route>
                  {/* <Route path="/shop" exact>
                    <LaptopModal />
                  </Route> */}
                  <Route path="/channel/:id">
                    <Chat />
                  </Route>
                </Switch>
              </main>
            </div>
          // </ThemeProvider>

        )}
      </Router>
    </div>
  );
}

export default App;
