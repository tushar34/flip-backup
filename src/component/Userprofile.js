import React, { useState, useEffect } from "react";
// import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";
// import { Button } from '';
import { Button, Typography, Divider, TextField } from "@material-ui/core";
import axios from "axios";
import { Get_user_data } from "../store/actions/action";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  maindiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: "200px",
    padding: "20px",
    border: "1px splid black",
  },
  innerdiv1: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "600px",
    // padding:"50px",
    flexWrap: "wrap",
    flexFlow: "column",
    // border: "1px solid red"
  },
}));

function Alert(props) {
  return <MuiAlert elevation={5} variant="filled" {...props} />;
}

export default function Userprofile() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.LoginReducer?.token);
  const user_id = useSelector((state) => state.LoginReducer?.id);

  const phone_number = useSelector(
    (state) => state.UserReducer?.data?.data?.phonenumber
  );
  const username = useSelector(
    (state) => state.UserReducer?.data?.data?.username
  );

  const [user_phone_number, setuser_phone_number] = useState(phone_number);
  const [user_user_name, setuser_user_name] = useState(username);

  const [phoneedit_btn, setphoneedit_btn] = useState(false);
  const [usernameedit_btn, setusernameedit_btn] = useState(false);
  const [password_btn, setpassword_btn] = useState(false);

  const [password, setpassword] = useState();
  const [newpassword, setnewpassword] = useState();
  const [confirmpassword, setconfirmpassword] = useState();

  // console.log(phoneedit_btn)

  //   alert variable
  const [alert_phonenumber, setalert_phonenumber] = useState(false);
  const [alert_username, setalert_username] = useState(false);
  const [alert_password, setalert_password] = useState(false);

  const [error_alert,seterror_alert] = useState(false)
  const [error_msg,seterror_msg]=useState()
  const handlephoneedit_btn = () => {
    setphoneedit_btn((phoneedit_btn) => !phoneedit_btn);
  };
  const handleusernameedit_btn = () => {
    setusernameedit_btn((usernameedit_btn) => !usernameedit_btn);
  };
  const handlepassword_btn = () => {
    setpassword_btn((password) => !password);
    setpassword();
    setconfirmpassword();
    setnewpassword();
  };

  const handle_update_phone_number = () => {
    const data = {
      user_phone_number: user_phone_number,
      user_id: user_id,
    };
    axios
      .patch("http://127.0.0.1:8000/api/update-phonenumber/", data, {})
      .then((res) => {
        dispatch(Get_user_data(user_id));
        setalert_phonenumber(true);
      })
      .catch((err) => {
        seterror_msg(err.response.data.msg)
        seterror_alert(true)
      });
    setphoneedit_btn(false);
  };
  const handle_update_user_name = () => {
    const data = {
      username: user_user_name,
      user_id: user_id,
    };
    axios
      .patch("http://127.0.0.1:8000/api/update-username/", data, {})
      .then((res) => {
        // setsound_data(res)
        dispatch(Get_user_data(user_id));
        setalert_username(true);
      })
      .catch((err) => {
        seterror_msg(err.response.data.msg)
        seterror_alert(true)
      });
    setusernameedit_btn(false);
  };

  const handlepasswordupdate = () => {
    const data = {
      password: password,
      new_password: newpassword,
      confirm_password: confirmpassword,
      user_id: user_id,
    };
    axios
      .patch("http://127.0.0.1:8000/api/update-password/", data, {})
      .then((res) => {
        dispatch(Get_user_data(user_id));
        setalert_password(true);
      })
      .catch((err) => {
        seterror_msg(err.response.data.msg)
        seterror_alert(true)
        // console.log(err);
        //   console.log(err.response.data.msg);
      });
    setpassword();
    setconfirmpassword();
    setnewpassword();
    setpassword_btn(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setalert_password(false);
    setalert_phonenumber(false);
    setalert_username(false);
    seterror_alert(false);
  };

  return (
    <div className={classes.maindiv}>
      <div className={classes.innerdiv1}>
        {/* phonenumber */}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexFlow: "column",
            width: "100%",
            marginBottom: "50px",
            boxShadow: "rgb(0 0 0 / 20%) 0px 1px 1px 0px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexFlow: "row",
              flexWrap: "wrap",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Typography>Phone Number</Typography>
            </div>
            {phoneedit_btn ? (
              <></>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  onClick={handlephoneedit_btn}
                  variant="contained"
                  color="primary"
                >
                  Edit
                </Button>
              </div>
            )}
          </div>
          {phoneedit_btn ? (
            <div style={{ paddingBottom: "20px" }}>
              <div>
                <TextField
                  value={user_phone_number}
                  onChange={(e) => setuser_phone_number(e.target.value)}
                />
              </div>
              <div
                style={{ display: "flex", marginTop: "10px", flexWrap: "wrap" }}
              >
                <div style={{ margin: "5px" }}>
                  <Button
                    onClick={handlephoneedit_btn}
                    variant="contained"
                    color="secondary"
                  >
                    Cancel
                  </Button>
                </div>
                <div style={{ margin: "5px" }}>
                  <Button
                    onClick={handle_update_phone_number}
                    variant="contained"
                    color="primary"
                  >
                    Done
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ paddingBottom: "20px" }}>
              {/* {user_phone_number} */}
              <Typography>{phone_number}</Typography>
            </div>
          )}
        </div>

        {/* username */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexFlow: "column",
            width: "100%",
            marginBottom: "50px",
            boxShadow: "rgb(0 0 0 / 20%) 0px 1px 1px 0px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexFlow: "row",
              flexWrap: "wrap",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Typography>User Name</Typography>
            </div>
            {usernameedit_btn ? (
              <></>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  onClick={handleusernameedit_btn}
                  variant="contained"
                  color="primary"
                >
                  Edit
                </Button>
              </div>
            )}
          </div>
          {usernameedit_btn ? (
            <div style={{ paddingBottom: "20px" }}>
              <div>
                <TextField
                  value={user_user_name}
                  onChange={(e) => setuser_user_name(e.target.value)}
                />
              </div>
              <div
                style={{ display: "flex", marginTop: "10px", flexWrap: "wrap" }}
              >
                <div style={{ margin: "5px" }}>
                  <Button
                    onClick={handleusernameedit_btn}
                    variant="contained"
                    color="secondary"
                  >
                    Cancel
                  </Button>
                </div>
                <div style={{ margin: "5px" }}>
                  <Button
                    onClick={handle_update_user_name}
                    variant="contained"
                    color="primary"
                  >
                    Done
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ paddingBottom: "20px" }}>
              <Typography>{username}</Typography>
            </div>
          )}
        </div>

        {/* password */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexFlow: "column",
            width: "100%",
            marginBottom: "50px",
            boxShadow: "rgb(0 0 0 / 20%) 0px 1px 1px 0px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexFlow: "row",
              flexWrap: "wrap",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Typography>Password</Typography>
            </div>
            {password_btn ? (
              <></>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  onClick={handlepassword_btn}
                  variant="contained"
                  color="primary"
                >
                  Update
                </Button>
              </div>
            )}
          </div>
          {password_btn ? (
            <div style={{ paddingBottom: "20px" }}>
              <div>
                <div style={{ padding: "10px 0" }}>
                  <TextField
                    label="Enter Old Password"
                    placeholder="Enter Old Password"
                    value={password}
                    type="password"
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>
                <div style={{ padding: "10px 0" }}>
                  <TextField
                    label="Enter New Password"
                    placeholder="Enter New Password"
                    value={newpassword}
                    type="password"
                    onChange={(e) => setnewpassword(e.target.value)}
                  />
                </div>
                <div style={{ padding: "10px 0" }}>
                  <TextField
                    label="Enter Confirm Password"
                    placeholder="Enter Confirm Password"
                    value={confirmpassword}
                    type="password"
                    onChange={(e) => setconfirmpassword(e.target.value)}
                  />
                </div>
              </div>
              <div
                style={{ display: "flex", marginTop: "10px", flexWrap: "wrap" }}
              >
                <div style={{ margin: "5px" }}>
                  <Button
                    onClick={handlepassword_btn}
                    variant="contained"
                    color="secondary"
                  >
                    Cancel
                  </Button>
                </div>
                <div style={{ margin: "5px" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handlepasswordupdate}
                  >
                    Done
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ paddingBottom: "20px" }}>
              <Typography>********************************</Typography>
            </div>
          )}
        </div>
      </div>

      {/*strat alert section */}
      <Snackbar
        open={alert_phonenumber}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          update phonenumber
        </Alert>
      </Snackbar>

      <Snackbar
        open={alert_username}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          update username
        </Alert>
      </Snackbar>

      <Snackbar
        open={alert_password}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          update password
        </Alert>
      </Snackbar>
      {/* seterror_alert */}

      <Snackbar
        open={error_alert}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
         {error_msg}
        </Alert>
      </Snackbar>

      {/* end alert sectiion */}
    </div>
  );
}
