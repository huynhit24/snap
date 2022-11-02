import React, { useEffect, useState } from "react";
// import { Drawer, JoinedClasses, Login, Main } from "./components";
import { Drawer, JoinedClasses, Main } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { IsUserRedirect, ProtectedRoute } from "./routes/Routes";
import { useLocalContext } from "./context/context";
import { db } from "./firebase";
import { ContextProvider } from "./context/context";

function ClassApp() {
    const { loggedInMail } = useLocalContext();

    const [createdClasses, setCreatedClasses] = useState([]);
    const [joinedClasses, setJoinedClasses] = useState([]);

    useEffect(() => {
        if (loggedInMail) {
            let unsubscribe = db
                .collection("CreatedClasses")
                .doc(loggedInMail)
                .collection("classes")
                .onSnapshot((snapshot) => {
                    setCreatedClasses(snapshot.docs.map((doc) => doc.data()));
                });
            return () => unsubscribe();
        }
    }, [loggedInMail]);

    useEffect(() => {
        if (loggedInMail) {
            let unsubscribe = db
                .collection("JoinedClasses")
                .doc(loggedInMail)
                .collection("classes")
                .onSnapshot((snapshot) => {
                    setJoinedClasses(snapshot.docs.map((doc) => doc.data().joinedData));
                });

            return () => unsubscribe();
        }
    }, [loggedInMail]);
    return (
        <ContextProvider>

            <Router>
                <Switch>
                    {createdClasses.map((item, index) => (
                        <Route key={index} exact path={`/${item.id}`}>
                            <Drawer />
                            <Main classData={item} />
                        </Route>
                    ))}
                    {joinedClasses.map((item, index) => (
                        <Route key={index} exact path={`/${item.id}`}>
                            <Drawer />
                            <Main classData={item} />
                        </Route>
                    ))}
                    {/* <IsUserRedirect
                        user={loggedInMail}
                        loggedInPath="/"
                        path="/signin"
                        exact
                        >
                        <Login />
                    </IsUserRedirect> */}

                    {/* <ProtectedRoute user={loggedInMail} path="/" exact> */}
                    <Drawer />
                    <ol className="joined">
                        {createdClasses.map((item) => (
                            <JoinedClasses classData={item} />
                        ))}

                        {joinedClasses.map((item) => (
                            <JoinedClasses classData={item} />
                        ))}
                    </ol>
                    {/* </ProtectedRoute> */}
                </Switch>
            </Router>
        </ContextProvider>
    );
}

export default ClassApp;
