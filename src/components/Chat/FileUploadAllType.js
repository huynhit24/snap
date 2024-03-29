import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { storage } from "../../firebase";
import { useParams } from "react-router-dom";
import firebase from "firebase/app";
import { db } from "../../firebase";
import { DiGoogleDrive } from "react-icons/di";
const useStyles = makeStyles((theme) => ({
  displayImage: {
    height: "105px",
    width: "180px",
  },
  imageName: {
    paddingLeft: "15px",
    fontSize: "1.3em",
  },
  imageDiv: {
    marginLeft: "16px",
    marginRight: "16px",
    marginTop: "-33px",
  },
}));

function FileUploadAllType({ setState, file }) {
  const params = useParams();
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [progress, setProgress] = useState(0);
  const [progressBar, setProgressBar] = useState({ display: "none" });
  const [message, setMessage] = useState("");

  const handleClose = () => {
    setOpen(false);
    setState();
  };

  const sendMsg = (downloadURL) => {
    if (params.id) {
      const userData = JSON.parse(localStorage.getItem("userDetails"));

      if (userData) {
        const displayName = userData.displayName;
        const imgUrl = userData.photoURL;
        const uid = userData.uid;
        const likeCount = 0;
        const likes = {};
        const fireCount = 0;
        const fire = {};
        const heartCount = 0;
        const heart = {};
        const postImg = downloadURL;
        const obj = {
          text: message,
          timestamp: firebase.firestore.Timestamp.now(),
          userImg: imgUrl,
          userName: displayName,
          uid: uid,
          likeCount: likeCount,
          likes: likes,
          fireCount: fireCount,
          fire: fire,
          heartCount: heartCount,
          heart: heart,
          postImg: postImg,
        };

        db.collection("channels")
          .doc(params.id)
          .collection("messages")
          .add(obj)
          .then((res) => {
            console.log("message sent");
          })
          .catch((err) => {
            console.log(err);
          });
      }

      setMessage("");
    }
  };

  const fileObj = URL.createObjectURL(file);

  const handleUpload = (e) => {
    e.preventDefault();
    setProgressBar({ display: "block" });
    const uploadRef = storage.ref(`uploads/${file.name}`).put(file);
    uploadRef.on(
      "state_changed",
      (snapshot) => {
        // Quan sát các sự kiện thay đổi trạng thái như tiến trình, tạm dừng và tiếp tục
        // Nhận tiến độ công việc, bao gồm số byte đã tải lên và tổng số byte sẽ được tải lên
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Xử lý hoàn tất quá trình tải lên thành công
        // Ví dụ: lấy URL tải xuống: https://firebasestorage.googleapis.com/...
        uploadRef.snapshot.ref.getDownloadURL().then((downloadURL) => {
          sendMsg(downloadURL);
        });
        handleClose();
      }
    );
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className={classes.imageDiv}>
          {/* Làm tiếp chia ra nhiều trường hợp các file khác nhau */}
          {!fileObj.split('.').pop() ? <img src={fileObj} alt={file.name} className={classes.displayImage} /> : <DiGoogleDrive></DiGoogleDrive>}
          <Typography className={classes.imageName}>{file.name}</Typography>
        </div>

        <DialogTitle id="alert-dialog-title">Tải ảnh lên</DialogTitle>

        <DialogContent>
          <form
            autoComplete="off"
            onSubmit={(e) => {
              handleUpload(e);
            }}
          >
            <TextField
              id="outlined-basic"
              label="Thêm ghi chú"
              fullWidth
              margin="normal"
              variant="outlined"
              style={{
                backgroundColor: "rgb(45, 45, 73)",
                borderRadius: "5px",
              }}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </form>

          <div style={progressBar}>
            <Box display="flex" alignItems="center">
              <Box width="100%" mr={1}>
                <LinearProgress variant="determinate" value={progress} />
              </Box>
              <Box minWidth={35}>
                <Typography variant="body2">{Math.round(progress)}%</Typography>
              </Box>
            </Box>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: "white" }}>
            Hủy
          </Button>
          <Button
            type="submit"
            onClick={(e) => handleUpload(e)}
            color="primary"
            autoFocus
            variant="contained"
          >
            Tải lên
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FileUploadAllType;
