import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import "./style.css";
// eslint-disable-next-line
import { useLocalContext } from "../../context/context";

const Announcment = ({ classData }) => {
  const [announcment, setAnnouncment] = useState([]);
  // const { loggedInUser } = useLocalContext();

  useEffect(() => {
    if (classData) {
      let unsubscribe = db
        .collection("announcments")
        .doc("classes")
        .collection(classData.id)
        .onSnapshot((snap) => {
          setAnnouncment(snap.docs.map((doc) => doc.data()));
        });
      return () => unsubscribe();
    }
  }, [classData]);
  console.log(announcment);
  return (
    <div>
      {announcment.map((item) => (
        <div className="amt">
          <div className="amt__Cnt">
            <div className="amt__top">
              <Avatar 
                
              />
              <div>{item.sender}</div>
            </div>
            <p className="amt__txt">{item.text}</p>
            <img className="amt__img" src={item.imageUrl} alt={item.text} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Announcment;
