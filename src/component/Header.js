import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Input from '@material-ui/core/Input';
import clsx from 'clsx';
// import { useEffect } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import DehazeIcon from '@material-ui/icons/Dehaze';
import SearchIcon from '@material-ui/icons/Search';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Drawer from '@material-ui/core/Drawer';
// import ListItem from '@material-ui/core/ListItem';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import List from '@material-ui/core/List';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Button, Divider, ListItem } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Login, Register, Logout, Usercartlist,Get_user_data } from '../store/actions/action';
// import Menu from '@material-ui/core/Menu';
import { useHistory } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';




const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const Transition2 = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    navbar: {
        backgroundColor: 'black',
        // overflowx:'none',
        [theme.breakpoints.down('sm')]: {
            backgroundColor: 'red',
        },
    },
    navigation: {
        display: 'inline-flex',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    menu: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'inline-flex',
        },
    },
    dialogcontent: {
        // height:'auto',
        padding: '0 103px',
        paddingTop: '0px',
        paddingBottom: "10px",
        [theme.breakpoints.down(450)]: {
            padding: '0 25px',
            paddingTop: '0px',
        },
    },
    cartnumbericon: {
        position: 'absolute',
        // right: '175px',
        right: '215px',
        top: '13px',
        textAlign: 'center',
        borderRadius: '7px',
        width: '18px',
        height: '18px',
        backgroundColor: '#ff6161',
        border: '1px solid #fff',
        fontWeight: '400',
        color: '#f0f0f0',
        lineHeight: '16px',
        fontSize: '12px',
    },
    textField: {
        width: '25ch',
    },
    margin: {
        margin: theme.spacing(1),
    },
}));


function Alert(props) {
    return <MuiAlert elevation={5} variant="filled" {...props} />;
}


export default function Header(props) {
    // console.log(props)

    const total_cart_item = useSelector(state => state.UsercartlistReducer?.data?.data?.cart_data?.length)
    const token = useSelector(state => state.LoginReducer.token)

    // useEffect(() => {
    //     if (token) {

    //         if (!total_cart_item) {
    //             dispatch(Logout(props))
    //         }
    //     }
    // }, [0])
    const product_data = useSelector(state => state.GetallproductReducer.product_data)
    // console.log("filter_data",product_data)

    // store variable
    const user_id = useSelector(state => state.LoginReducer.id)
    const error = useSelector(state => state.LoginReducer?.error)
    const loginusername = useSelector(state => state.LoginReducer?.username)


    // login variable
    const [phone_number, setphone_number] = useState('');
    const [password, setpassword] = useState('');

    // sign-up variable
    const [phone_number2, setphone_number2] = useState('');
    const [password2, setpassword2] = useState('');
    const [email, setemail] = useState('');
    const [username, setusername] = useState('');
    const [confirmpassword, setconfirmpassword] = useState('');


    // redux variable
    const dispatch = useDispatch()

    const history = useHistory();


    const [opendrawer, setopendrawer] = useState(false)
    const [loginDialog, setloginDialog] = useState(false)
    const [registerDialog, setregisterDialog] = useState(false)
    const [open, setopen] = useState(true)
    const [btnmore, setbtnmore] = useState(null)
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    useEffect(() => {
        // setInterval(() => {
        //     console.log("caledddddd")
        //     dispatch(Logout(props))
        //   }, 60000);
        //   setTimeout(dispatch(Logout(props)),60000)
    }, [token])

  
    useEffect(() => {
        dispatch(Usercartlist(user_id, token));
        // dispatch(Get_user_data(user_id))
    }, [0])


    useEffect(() => {
        dispatch(Get_user_data(user_id))
    }, [user_id])

    useEffect(() => {
        if (error) {
            setopenalert(true)
        }
    }, [error])
    useEffect(() => {
        if (token) {
            setopenalertlogin(true)
        }
    }, [token])

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleregister = () => {
        setloginDialog(false)
        setregisterDialog(true)
    }
    const handlelogin = () => {
        setloginDialog(true)
        setregisterDialog(false)
    }
    const handledrawerloginclick = () => {
        setopendrawer(false)
        setloginDialog(true)
    }

    // call login api
    const handleLogin = () => {
        setphone_number('')
        setpassword('')
        setloginDialog(false)
        dispatch(Login(phone_number, password, props))

    }
    // call register api
    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(Register(phone_number2, password2, email, username, confirmpassword))
        setphone_number2('')
        setpassword2('')
        setemail('')
        setusername('')
        setconfirmpassword('')
        setregisterDialog(false)
    }
    const handlelogout = () => {
        dispatch(Logout(props))
        setopendrawer(false)
        setopenalertlogout(true)
        history.push("/");
    }
    const [openalertcart, setopenalertcart] = useState(false)
    useEffect(() => {
        if (total_cart_item == 0) {
            setopenalertcart(true)
        }
    }, [total_cart_item])

    const handlecart = () => {
        if (total_cart_item == 0) {
            setopenalertcart(true)
        }
        else {

            setopendrawer(false)
            history.push("/addtocart");
        }
    }
    const [openalert, setopenalert] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setopenalert(false);
        setopenalertlogin(false)
        setopenalertlogout(false)
        setopenalertcart(false)
    };

    const [openalertlogin, setopenalertlogin] = useState(false)
    const [openalertlogout, setopenalertlogout] = useState(false)

    const [showPassword, setshowPassword] = useState(false)
    console.log(showPassword)
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const [showPassword2, setshowPassword2] = useState(false)
    const [showPassword3, setshowPassword3] = useState(false)

    const [searchname, setsearchname] = useState()
    // const find_data = ca_data.cart_data.filter(d => d.product_id == id)

    const handlefilter = (name) => {
        setsearchname(name)
        console.log("name", searchname);
        const filter_data = product_data.data.filter(data => data.product_name == searchname)
        // if (filter_data) {
        console.log("filter data", filter_data)
        // }

    }

    const anchorRef = React.useRef(null);
    const [openmenu, setopenmenu] = useState(false)
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setopenmenu(false);
        }
    }
    const handlemenuClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setopenmenu(false);
    };


    return (
        <div style={{ marginBottom: "20px" }}>
            <AppBar position="static" className={classes.navbar} style={{}}>
                <Toolbar >
                    <div style={{ display: 'inline-flex', flexGrow: '1' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Link to="/">
                                <img width="75" src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png" alt="not found" />
                            </Link>
                        </div>
                        <div style={{ display: 'inline-flex' }} className={classes.search}>
                            <div style={{ display: 'inline-flex' }} className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search for product"
                                onChange={(e) => handlefilter(e.target.value)}
                                // onChange={(e) => console.log("aaa",e.target.value)}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                value={searchname}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                    </div>
                    <div className={classes.menu}>
                        <DehazeIcon onClick={() => setopendrawer(true)} />
                        <Drawer style={{}} anchor="right" open={opendrawer} onClose={() => setopendrawer(false)}>
                            <div style={{ width: "200px", display: 'flex' }}>
                                <List style={{ width: "100%", }}>
                                    {token ? <>
                                        <ListItem onClick={handlelogout} style={{ cursor: "pointer" }}>
                                            <ExitToAppIcon style={{ marginRight: '5px' }} /> logout
                                        </ListItem>
                                        <Divider fullWidth style={{ backgroundColor: "black" }} />
                                    </> :
                                        <>
                                            <ListItem style={{ cursor: "pointer" }} onClick={handledrawerloginclick}>
                                                <LockOpenIcon style={{ marginRight: '5px' }} /> login
                                            </ListItem>
                                            <Divider fullWidth style={{ backgroundColor: "black" }} />
                                        </>
                                    }
                                    {token ?
                                        <>
                                            <ListItem style={{ cursor: "pointer" }} onClick={handlecart} >
                                                <ShoppingCartIcon style={{ marginRight: '5px' }} />cart
                                            </ListItem>
                                            <Divider fullWidth style={{ backgroundColor: "black" }} />
                                        </>
                                        : <></>}
                                </List>
                            </div>
                        </Drawer>


                    </div>
                    <div className={classes.navigation} style={{}}>

                        <div style={{ display: 'inline-flex' }}>
                            {token ?
                                <Button onClick={handlelogout} variant="contained" style={{
                                    color: 'black', backgroundColor: 'white'
                                }} >Logout</Button>
                                :
                                <Button onClick={() => setloginDialog(true)} variant="contained" style={{
                                    color: 'black', backgroundColor: 'white'
                                }} >Login</Button>
                            }
                        </div>


                        {token &&
                            <div style={{ display: 'inline-flex', marginLeft: '40px' }}>
                                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <ShoppingCartIcon onClick={handlecart} />
                                </div>
                                {/* {token ? */}
                                <div className={classes.cartnumbericon}>
                                    {total_cart_item}
                                </div>
                                {/* // : <></>} */}
                                <div style={{ display: 'inline-flex', marginLeft: '5px', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography>Cart</Typography>
                                </div>
                                <div style={{ display: 'inline-flex', marginLeft: '25px', alignItems: 'center', justifyContent: 'center' }}>
                                    <Button
                                    ref={anchorRef}
                                    aria-controls={openmenu ? 'menu-list-grow' : undefined}
                                    onClick={()=> setopenmenu((prevopenmenu) => !prevopenmenu)}
                                    aria-haspopup="true" 
                                    style={{ color: 'white' }} 
                                    >
                                        My account

                                    </Button>

                                    <Popper open={openmenu} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                                        {({ TransitionProps, placement }) => (
                                            <Grow
                                                {...TransitionProps}
                                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                            >
                                                <Paper>
                                                    <ClickAwayListener onClickAway={handlemenuClose}>
                                                        <MenuList autoFocusItem={openmenu} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                                            <MenuItem onClick={(e)=>setopenmenu(false)} component={Link} to="/profile" >Profile</MenuItem>
                                                            {/* <MenuItem onClick={handlemenuClose}>My account</MenuItem> */}
                                                            {/* <MenuItem onClick={handlemenuClose}>Logout</MenuItem> */}
                                                        </MenuList>
                                                    </ClickAwayListener>
                                                </Paper>
                                            </Grow>
                                        )}
                                    </Popper>

                                </div>
                            </div>
                        }
                    </div>
                </Toolbar>
            </AppBar>

            <Snackbar open={openalert} autoHideDuration={3000} onClose={handleClose} >
                <Alert onClose={handleClose} severity="error" >
                    given information is not valid
                </Alert>
            </Snackbar>

            <Snackbar open={openalertlogin} autoHideDuration={3000} onClose={handleClose} >
                <Alert onClose={handleClose} severity="success">
                    login successfully
                </Alert>
            </Snackbar>


            <Snackbar open={openalertlogout} autoHideDuration={3000} onClose={handleClose} >
                <Alert onClose={handleClose} severity="info">
                    Logout successfully
                </Alert>
            </Snackbar>

            <Snackbar open={openalertcart} autoHideDuration={3000} onClose={handleClose} >
                <Alert onClose={handleClose} severity="info">
                    Your cart empty
                </Alert>
            </Snackbar>



            <Dialog open={loginDialog} onClose={() => setloginDialog(false)} TransitionComponent={Transition} keepMounted maxWidth='xs' fullWidth='true' >
                <div style={{ height: "400px", display: "flex", flexFlow: "column" }}>
                    <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }} >
                            <DialogTitle id="form-dialog-title">Sign-in</DialogTitle>
                        </div>
                        <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center', position: "absolute", right: "25px" }}>
                            <CloseIcon onClick={() => setloginDialog(false)} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
                        {/* <ValidatorForm onError={errors => console.log(errors)}> */}
                        <DialogContent style={{ padding: "auto" }}>
                            <TextField
                                autoFocus
                                // margin="dense"
                                id="name"
                                label="Enter Phone Number"
                                type="text"
                                fullWidth
                                value={phone_number}
                                validators={['required']}
                                errorMessages={['this field is required']}
                                onChange={(e) => setphone_number(e.target.value)}
                            />
                            <FormControl style={{ width: '100%' }} >
                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input
                                    // margin="dense"
                                    id="standard-adornment-password"
                                    label="Enter Password"
                                    type={showPassword ? 'text' : 'password'}
                                    fullWidth
                                    value={password}
                                    onChange={(e) => setpassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                // onClick={handleClickShowPassword}
                                                onClick={() => setshowPassword(showPassword => !showPassword)}
                                                // onClick={()=>alert("6545")}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }

                                />
                            </FormControl>
                        </DialogContent>
                        {/* </ValidatorForm> */}
                        {/* <VisibilityOffIcon style={{ position: "absolute", right: '30px', top: '160px' }} /> */}
                    </div>
                    <div style={{ padding: "0px 100px 0px 100px", marginTop: "20px", display: "flex", alignItems: "center", justifyContent: 'center' }}>
                        <Button onClick={handleLogin} fullWidth variant="contained" color="primary" >Login</Button>
                    </div>
                    <div style={{ padding: "0px 10px", textAlign: "center", marginTop: "25px", display: "flex", alignItems: "center", justifyContent: 'center' }}>

                        <Typography onClick={handleregister} component={Link} >New to Flipkart? Create an account</Typography>

                    </div>
                </div>

            </Dialog>


            <Dialog open={registerDialog} TransitionComponent={Transition2} onClose={() => setregisterDialog(false)} keepMounted maxWidth='sm' fullWidth='true'>
                <div style={{ height: "500px", display: "flex", flexFlow: "column" }}>
                    <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }} >
                            <DialogTitle id="form-dialog-title">Sign-up</DialogTitle>
                        </div>
                        <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center', position: "absolute", right: "25px" }}>
                            <CloseIcon onClick={() => setregisterDialog(false)} />
                        </div>
                    </div>
                    <form>
                        <div style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
                            <ValidatorForm>
                                <DialogContent className={classes.dialogcontent} style={{}}>

                                    <TextValidator
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Enter Email Address"
                                        type="text"
                                        required
                                        value={email}
                                        validators={['required', 'isEmail']}
                                        errorMessages={['this field is required', 'email is not valid']}
                                        fullWidth
                                        onChange={e => setemail(e.target.value)}
                                    />
                                    <TextValidator
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Enter User Name"
                                        type="text"
                                        fullWidth
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                        required
                                        value={username}
                                        onChange={e => setusername(e.target.value)}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Enter Phone Number"
                                        type="text"
                                        required
                                        value={phone_number2}
                                        fullWidth
                                        pattern="[1-9]{1}[0-9]{9}"
                                        maxlength="10"
                                        onChange={e => setphone_number2(e.target.value)}
                                    />
                                    <FormControl style={{ width: '100%' }} >
                                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                        <Input
                                            // margin="dense"
                                            id="standard-adornment-password"
                                            label="Enter Password"
                                            type={showPassword2 ? 'text' : 'password'}
                                            fullWidth
                                            value={password2}
                                            onChange={(e) => setpassword2(e.target.value)}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        // onClick={handleClickShowPassword}
                                                        onClick={() => setshowPassword2(showPassword2 => !showPassword2)}
                                                        // onClick={()=>alert("6545")}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {showPassword2 ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }

                                        />
                                    </FormControl>
                                    <FormControl style={{ width: '100%' }} >
                                        <InputLabel htmlFor="standard-adornment-password">Confirm-Password</InputLabel>
                                        <Input
                                            // margin="dense"
                                            id="standard-adornment-password"
                                            label="Enter Password"
                                            type={showPassword3 ? 'text' : 'password'}
                                            fullWidth
                                            value={confirmpassword}
                                            onChange={(e) => setconfirmpassword(e.target.value)}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        // onClick={handleClickShowPassword}
                                                        onClick={() => setshowPassword3(showPassword3 => !showPassword3)}
                                                        // onClick={()=>alert("6545")}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {showPassword3 ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }

                                        />
                                    </FormControl>

                                </DialogContent>
                            </ValidatorForm>

                        </div>
                        <div style={{ padding: "0px 100px 0px 100px", marginTop: "20px", display: "flex", alignItems: "center", justifyContent: 'center' }}>
                            <Button onClick={(e) => handleRegister(e)} fullWidth variant="contained" color="primary" >continue</Button>
                        </div>
                        <div style={{ padding: "0px 10px", textAlign: "center", marginTop: "25px", display: "flex", alignItems: "center", justifyContent: 'center' }}>
                            <Typography onClick={handlelogin} component={Link} >Existing User? Log in</Typography>
                        </div>
                    </form>

                </div>
            </Dialog>






        </div>
    )
}
