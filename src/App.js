import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Application from "./components/Chat/Application";
import Chat from "./components/Chat/Chat";
import Login from "./components/Chat/SignUp";
import Home from "./components/Chat/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth, db } from "./firebase";
import "./App.css";

import background_1 from '../src/assets/images/background-snap.jpg';
import background_2 from '../src/assets/images/background-snap-2.jpg';
import background_3 from '../src/assets/images/background-snap-3.jpg';
import background_4 from '../src/assets/images/background-snap-4.jpg';
import background_5 from '../src/assets/images/background-snap-5.jpg';
import background_6 from '../src/assets/images/background-snap-6.jpg';
import background_7 from '../src/assets/images/background-snap-7.jpg';
// import { useState, useEffect } from "react";

import SpeedDials from './components/Common/SpeedDial';
import ListRoom from './components/Chat/ListRoom';
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: "#22273b !important",
    // height: "100vh",
  },
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

function App() {
  const classes = useStyles();
  const [user, setUser] = useState(null);

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
    <div className="App" style={{ backgroundImage: `url(${images[image]})`, backgroundSize: 'cover'}}>
      <Router>
        {!user ? (
          <Login />
        ) : (
          <div className={classes.root}>
            <Application uid={user} />
            <main className={classes.content}>
              <div className={classes.toolbar} style={{ minHeight: "50px" }} />

              <Switch>
                <Route path="/" exact>
                  <Home />
                </Route>
                <Route path="/list-room" exact>
                  <ListRoom />
                </Route>
                <Route path="/classroom" exact>                  
                    {/* {!localStorage.getItem("loginStatus") 
                      ? renderClassApp
                         : (<Home/>)
                    }   */}
                    {/* {() => renderClassApp()}  */}
                    {/* <Main /> */}
                </Route>
                {/* <Route path="/video">
                  <MainVideo />
                </Route> */}
                <Route path="/channel/:id">
                  <Chat />
                </Route>
              </Switch>

              <SpeedDials></SpeedDials>
            </main>
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;
