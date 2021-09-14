import React, { useState, useEffect } from 'react';
import CheckIcon from '@material-ui/icons/Check';
import { Button, Typography } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { useSelector } from 'react-redux';
import { AddtoCart, RemovetoCart, Usercartlist, Deletecartitem, City, Address, Get_address, Edit_address } from '../store/actions/action';
import { useDispatch } from 'react-redux';
import BlockIcon from '@material-ui/icons/Block';
import Header from "./Header";
import TextField from '@material-ui/core/TextField';
import { Link, withRouter } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';

import Select from '@material-ui/core/Select';
import axios from "axios";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeContainer from './StripeContainer'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useHistory } from 'react-router';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
// import { CardElement, Elements, injectStripe, StripeProvider } from "react-stripe-elements";

const stripePromise = loadStripe('pk_test_51Ibk4KSGafLm2PSq84YA7Kn99WYEANFwxWuLrCJ5R4tZogmUmsfIQ9DV5oATk8MNs3b2gPN2LqrI36LqNYFuEnvf00n84GmYNG');

function Alert(props) {
    return <MuiAlert elevation={5} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({

    name: {
        display: "flex",
        [theme.breakpoints.down('sm')]: {
            flexFlow: "column",
            alignItems: "center",
            justifyContent: "center",

        },
    },
    div1: {
        display: "inline-block",
        alignItems: "flex-start",
        // border: "1px solid red",
        [theme.breakpoints.down('sm')]: {
            display: "block"
        },
    },
    div2: {
        display: "inline-block",
        height: "auto",
        width: 'auto',
        marginLeft: "16px",
        [theme.breakpoints.down('sm')]: {
            display: "block",
            // display: "none"
        },
    },

    maindiv: {
        margin: "0 auto",
        minWidth: '1128px',
        display: 'flex',
        justifyContent: "center",
        [theme.breakpoints.down('sm')]: {
            display: "block",
            minWidth: "auto",
        },
        // [theme.breakpoints.down(600)]: {
        //     // backgroundColor:"red"
        //     display:"none"
        // },
    },
    btns: {
        display: "block",
        paddingTop: "10px",
        [theme.breakpoints.down('sm')]: {
            display: "flex",
            flexFlow: "column",
            alignItems: "center",
            justifyContent: "center",

        },
    },
    btn2: {
        paddingLeft: "24px",
        display: "inline-block",
        [theme.breakpoints.down('sm')]: {
            display: "none",
            margin: "10px 0 0 0"
        },
    },
    btn1: {
        display: "inline-block",
        // [theme.breakpoints.down('sm')]: {
        //     display: "flex",        
        // },
    },
    pricedetail: {
        borderBottom: '1px solid var(--color-grey-grade1)',
        fontSize: 'var(--font-size-16)',
        display: 'block',
        textTransform: 'uppercase',
        padding: '13px 24px',
        fontWeight: 'var(--font-medium)',
        color: '#878787',
        minHeight: '47px',
        fontFamily: 'Roboto,Arial,sans-serif',
        borderRadius: '2px 2px 0 0',
        textAlign: "center",
        [theme.breakpoints.down('sm')]: {
            textAlign: "start",
            paddingLeft: '0'
        },
    },
    placeorder: {
        position: 'sticky',
        top: '64px',
        bottom: '0',
        zIndex: '2',
        alignSelf: 'flex-start',
        [theme.breakpoints.down('sm')]: {
            display: "none"
        },
    },
    card: {
        width: '380px',
        [theme.breakpoints.down(440)]: {
            width: "260px"
        },
    },
    imagediv: {
        height: '112px',
        width: '112px',
        position: 'relative',
        margin: '0 auto',
        [theme.breakpoints.down(350)]: {
            margin: '0',
        },
    },
    nameandpricediv: {
        padding: '0 24px 12px',
        verticalAlign: 'top',
        minHeight: '112px',
        flex: '1 1',
        overflow: 'hidden',
        maxWidth: '460px',
        [theme.breakpoints.down('sm')]: {
            display: "flex",
            flexFlow: "column",
            justifyContent: "center",
            alignItems: "center"

        },
    },
    editbutton: {
        padding: '0 32px',
        height: '40px',
        borderRadius: '2px',
        border: '1px solid #e0e0e0',
        color: '#2874f0',
        fontSize: '14px',
        fontWeight: '500',
        background: '#fff',
        marginLeft: 'auto',
        cursor: 'pointer',
        textTransform: 'uppercase',
        [theme.breakpoints.down(340)]: {
            padding: '0',
        },

    },
    hideandshowbtn: {
        padding: '0 32px',
        height: '40px',
        borderRadius: '2px',
        border: '1px solid #e0e0e0',
        color: '#2874f0',
        fontSize: '12px',
        fontWeight: '500',
        background: '#fff',
        marginLeft: 'auto',
        cursor: 'pointer',
        textTransform: 'uppercase',
        [theme.breakpoints.down(340)]: {
            padding: '0',
        },
    },
    ordersummarydiv: {
        display: "inline-block",
        width: "600px",
        [theme.breakpoints.down(340)]: {
            width: '145px',
        },

    }



}));
export default function Checkout(props) {

    // const user_address = useSelector(state => state.LoginReducer.user_address)

    const classes = useStyles();
    const [loginedit, setloginedit] = useState(false)
    const dispatch = useDispatch()

    const token = useSelector(state => state.LoginReducer?.token)
    const user_id = useSelector(state => state.LoginReducer?.id)
    const phone_number = useSelector(state => state.LoginReducer?.phone_number)

    const [addtocartalert, setaddtocartalert] = useState(false)
    const [removealert, setremovealert] = useState(false)

    useEffect(() => {
        dispatch(Usercartlist(user_id, token));
        dispatch(City());
        dispatch(Get_address(user_id, token))
    }, [0])

    const history = useHistory()
    const ca_data = useSelector(state => state.UsercartlistReducer?.data?.data)

    useEffect(() => {
        if (!token) {
            // setopenalertcart(true)
            history.push("/")

        }

    }, [0])



    useEffect(() => {
        if (ca_data?.cart_data?.length == 0) {
            // setopenalertcart(true)
            history.push("/")

        }

    }, [ca_data])

    const [address, setaddress] = useState()
    const [pincode, setpincode] = useState()
    const [city, setcity] = useState()

    // console.log(address)
    // console.log(pincode)
    // console.log(city)



    const city_data = useSelector(state => state.CityReducer?.data)


    // const [u_address, setu_address] = useState()
    // console.log(u_address)
    // const s_address = u_address?.data?.address[0]['address']

    // console.log(u_address)
    const u_address = useSelector(state => state.AddressReducer?.data?.data?.address)
    console.log(u_address)



    const [ad_pincode, setad_pincodee] = useState(u_address && u_address[0]['pincode'])
    const [city_id, setcity_id] = useState(u_address && u_address[0]['city_id'])
    const [street_address, setstreet_address] = useState(u_address && u_address[0]['address'])
    useEffect(() => {
        console.log("add-useaddress", u_address)
        setad_pincodee(u_address && u_address[0]['pincode'])
        setcity_id(u_address && u_address[0]['city_id'])
        setstreet_address(u_address && u_address[0]['address'])
    }, [u_address])

    // console.log(street_address)
    // console.log(ad_pincode)
    // console.log(city_id)
    // const [street_address,setstreet_address] = useState(s_address)
    // console.log(street_address)


    const product_data = useSelector(state => state.GetallproductReducer?.product_data)
    const total_cart_item = useSelector(state => state.UsercartlistReducer?.data?.data?.cart_data?.length)
    const total_cart_price = useSelector(state => state.UsercartlistReducer?.data?.data?.total_cart_price)

    const [summarybtn, setsummarybtn] = useState(true)


    const handleaddtocart = (id) => {
        dispatch(AddtoCart(id, user_id, token, props))
        setaddtocartalert(true)
    }
    const handleremovetocart = (id) => {
        dispatch(RemovetoCart(id, user_id, token, props))
        setaddtocartalert(true)
    }

    const handledeleteitem = (id) => {
        setremovealert(true)
        dispatch(Deletecartitem(user_id, id, token, props))
    }

    const [edit_btn, setedit_btn] = useState(false)

    const handleaddress = () => {
        dispatch(Address(user_id, address, pincode, city, token))
        setedit_btn(false)
    }
    const [editaddressalert, seteditaddressalert] = useState(false)
    const handleeditaddress = () => {
        dispatch(Edit_address(user_id, street_address, ad_pincode, city_id, token))
        setedit_btn(false)
        seteditaddressalert(true)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setaddtocartalert(false)
        setremovealert(false)
        seteditaddressalert(false)
    };


    return (
        <div>
            <div className={classes.maindiv} style={{}}>
                {/* first div */}
                <div className={classes.div1} style={{}}>
                    {/* 1 div */}
                    {/* <CircularProgress variant="determinate" value={progress} /> */}
                    <div style={{ display: "flex", alignItems: "flex-start" }}>
                        <div style={{ marginBottom: '16px', position: 'relative', display: 'inline-block', boxShadow: '0 1px 1px 0 rgb(0 0 0 / 20%)', width: '100%', backgroundColor: '#fff', borderRadius: '2px' }}>
                            <div style={{ padding: "16px 24px", minHeight: "72px", display: "flex", alignItems: "flex-start" }}>
                                <h3 style={{ padding: "0", height: '48px', textTransform: 'uppercase', color: '#878787', fontSize: '16px', fontWeight: '500', borderRadius: '2px 2px 0 0' }}>
                                    <span style={{ fontSize: '12px', color: '#2874f0', backgroundColor: '#f0f0f0', borderRadius: '2px', padding: '3px 7px', verticalAlign: 'baseline', marginRight: '17px' }}>1</span>
                                </h3>
                                <div style={{ display: "inline-block" }}>
                                    <div style={{ color: '#878787', fontSize: '16px', fontWeight: '500', marginBottom: '6px', textTransform: 'uppercase' }}>
                                        Login
                                        {/* <CheckIcon style={{ marginLeft: '15px' }} /> */}
                                    </div>
                                    <div style={{ fontSize: '14px', maxWidth: '630px' }}>
                                        <div>
                                            <span style={{ marginLeft: '6px' }}>+91{phone_number}</span>
                                        </div>
                                    </div>
                                    <div style={{ display: loginedit ? "block" : "none" }}>
                                        <span style={{ marginLeft: '6px', color: "#2874f0", cursor: 'pointer' }}>Logout & sign in to another account</span>
                                    </div>
                                </div>

                                {/* <Button onClick={() => setloginedit(true)} style={{
                                    padding: '0 32px',
                                    height: '40px',
                                    borderRadius: '2px',
                                    border: '1px solid #e0e0e0',
                                    color: '#2874f0',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    background: '#fff',
                                    marginLeft: 'auto',
                                    cursor: 'pointer',
                                    textTransform: 'uppercase'
                                }}>change</Button> */}
                            </div>
                        </div>



                    </div>

                    {/* 2 div */}
                    <div style={{ display: "flex", alignItems: "flex-start" }} >
                        <div style={{ marginBottom: '16px', position: 'relative', display: 'inline-block', boxShadow: '0 1px 1px 0 rgb(0 0 0 / 20%)', width: '100%', backgroundColor: '#fff', borderRadius: '2px' }}>
                            <div style={{ padding: "16px 24px", minHeight: "72px", display: "flex", alignItems: "flex-start" }}>
                                <h3 style={{ padding: "0", height: '48px', textTransform: 'uppercase', color: '#878787', fontSize: '16px', fontWeight: '500', borderRadius: '2px 2px 0 0' }}>
                                    <span style={{ fontSize: '12px', color: '#2874f0', backgroundColor: '#f0f0f0', borderRadius: '2px', padding: '3px 7px', verticalAlign: 'baseline', marginRight: '17px' }}>2</span>
                                </h3>
                                <div style={{ display: "inline-block" }}>
                                    <div style={{ color: '#878787', fontSize: '16px', fontWeight: '500', marginBottom: '6px', textTransform: 'uppercase' }}>
                                        Delivery address
                                        {/* <CheckIcon style={{ marginLeft: '15px' }} /> */}
                                    </div>
                                    {u_address != null ?
                                        <div style={{ display: edit_btn ? 'none' : 'block', fontSize: '14px', maxWidth: '630px' }}>
                                            {/* <div> */}
                                            <span style={{ marginLeft: '6px' }}>{street_address}</span>
                                            {/* </div> */}
                                        </div>
                                        :

                                        <div>
                                            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", marginTop: '10px' }}>
                                                <div style={{ display: "block", marginRight: "35px" }}>
                                                    <TextField
                                                        id="filled-multiline-flexible"
                                                        label="Address(full address)"
                                                        multiline
                                                        maxRows={4}
                                                        variant="filled"
                                                        value={address}
                                                        onChange={e => setaddress(e.target.value)}
                                                    />
                                                </div>
                                                <div style={{ display: "block" }}>
                                                    <TextField id="filled-basic" label="Pin code" variant="filled" value={pincode} onChange={e => setpincode(e.target.value)} />
                                                </div>
                                            </div>

                                            <div style={{ display: "flex", flexWrap: "wrap", flexFlow: "column", justifyContent: "space-between", marginTop: '10px' }}>
                                                {/* <div style={{ display: "block", marginRight: "35px" }}>
                                                    <TextField id="filled-basic" label="City" variant="filled" />
                                                </div> */}
                                                <div style={{ display: "flex" }}>
                                                    <FormControl variant="filled" className={classes.formControl}>
                                                        <InputLabel htmlFor="filled-age-native-simple">city-state-country</InputLabel>
                                                        <Select
                                                            native
                                                            // fullWidth="true"
                                                            value={city}
                                                            onChange={(e) => setcity(e.target.value)}
                                                            inputProps={{
                                                                name: 'city-state-country',
                                                                id: 'filled-age-native-simple',
                                                            }}
                                                        >
                                                            <option aria-label="None" value="" />
                                                            {city_data && city_data.data && city_data.data.length > 0 && city_data.data.map((data, i) => (
                                                                <>
                                                                    <option key={i} value={data.id}>{data.display_name}</option>

                                                                </>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                                <div style={{ display: "flex", marginTop: "10px", justifyContent: 'flex-end' }}>
                                                    <Button variant="contained" color="primary" onClick={handleaddress} >Add</Button>
                                                </div>
                                            </div>
                                        </div>


                                    }

                                    {edit_btn &&

                                        <div>

                                            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", marginTop: '10px' }}>
                                                <div style={{ display: "block", marginRight: "35px" }}>
                                                    <TextField
                                                        id="filled-multiline-flexible"
                                                        label="Address(full address)"
                                                        multiline
                                                        maxRows={4}
                                                        variant="filled"
                                                        value={street_address}
                                                        autoFocus
                                                        onChange={e => setstreet_address(e.target.value)}
                                                    />
                                                </div>
                                                <div style={{ display: "block" }}>
                                                    <TextField autoFocus id="filled-basic" label="Pin code" variant="filled"
                                                        value={ad_pincode}
                                                        onChange={e => setad_pincodee(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div style={{ display: "flex", flexWrap: "wrap", flexFlow: "column", justifyContent: "space-between", marginTop: '10px' }}>
                                                <div style={{ display: "flex" }}>
                                                    <FormControl variant="filled" className={classes.formControl}>
                                                        <InputLabel htmlFor="filled-age-native-simple">city-state-country</InputLabel>
                                                        <Select
                                                            native

                                                            value={city_id}
                                                            onChange={(e) => setcity_id(e.target.value)}
                                                            inputProps={{
                                                                name: 'city-state-country',
                                                                id: 'filled-age-native-simple',
                                                            }}
                                                        >
                                                            <option aria-label="None" value="" />
                                                            {city_data && city_data.data && city_data.data.length > 0 && city_data.data.map((data, i) => (
                                                                <>
                                                                    <option key={i} value={data.id} selected={data.id == city_id}>{data.display_name}</option>
                                                                </>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                    <div style={{ display: "flex", marginTop: "10px", justifyContent: 'flex-end' }}>
                                                        <Button variant="contained" color="secondary" onClick={() => setedit_btn(false)}  >cancel</Button>
                                                    </div>

                                                    <div style={{ display: "flex", marginTop: "10px", marginLeft: '5px', justifyContent: 'flex-end' }}>
                                                        <Button variant="contained" color="primary" onClick={handleeditaddress} >Done</Button>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>

                                    }
                                </div>
                                {u_address &&
                                    <Button Button className={classes.editbutton} style={{ display: edit_btn ? "none" : "block" }} onClick={() => setedit_btn(true)}   >Edit</Button>
                                }
                            </div>
                        </div>


                    </div>

                    {/* 3 div */}
                    <div style={{ display: "flex", alignItems: "flex-start", width: '100%' }}>
                        <div style={{ marginBottom: '16px', position: 'relative', display: 'inline-block', boxShadow: '0 1px 1px 0 rgb(0 0 0 / 20%)', width: '100%', backgroundColor: '#fff', borderRadius: '2px' }}>
                            <div style={{ width: "100%", padding: "16px 24px", minHeight: "72px", display: "flex", alignItems: "flex-start" }}>
                                <h3 style={{ padding: "0", height: '48px', textTransform: 'uppercase', color: '#878787', fontSize: '16px', fontWeight: '500', borderRadius: '2px 2px 0 0' }}>
                                    <span style={{ fontSize: '12px', color: '#2874f0', backgroundColor: '#f0f0f0', borderRadius: '2px', padding: '3px 7px', verticalAlign: 'baseline', marginRight: '17px' }}>3</span>
                                </h3>
                                <div className={classes.ordersummarydiv}  >
                                    <div style={{ color: '#878787', fontSize: '16px', fontWeight: '500', marginBottom: '6px', textTransform: 'uppercase' }}>
                                        order summary
                                        {/* <CheckIcon style={{ marginLeft: '15px' }} /> */}
                                    </div>
                                    {/* <div style={{ fontSize: '14px', maxWidth: '630px' }}>
                                        <div>
                                            <span style={{ marginLeft: '6px' }}>order summary</span>
                                        </div>
                                    </div> */}
                                    <div style={{ display: summarybtn ? 'block' : 'none', width: "100%" }}>

                                        {ca_data && ca_data.cart_data && ca_data.cart_data.length > 0 && ca_data.cart_data.map((c_data, i) => (
                                            <>
                                                {product_data && product_data.data && product_data.data.length > 0 && product_data.data.map((p_data, j) => (
                                                    <>
                                                        {c_data.product_id == p_data.id ?


                                                            <div style={{ borderTop: '1px solid #f0f0f0!important', padding: '24px', position: 'relative', maxWidth: '950px' }}>

                                                                <div className={classes.name} style={{}}>
                                                                    <div className={classes.imagediv} style={{}}>
                                                                        <img style={{
                                                                            position: 'absolute',
                                                                            bottom: 0,
                                                                            left: 0,
                                                                            right: 0,
                                                                            top: 0,
                                                                            margin: 'auto',
                                                                            maxWidth: '100%',
                                                                            maxHeight: '100%'
                                                                        }} src={p_data.product_image}
                                                                        />
                                                                    </div>

                                                                    <div className={classes.nameandpricediv}>

                                                                        <div style={{ display: "block" }}>
                                                                            <Typography style={{ fontSize: '16px', color: '#212121', }} >{p_data.product_name}</Typography>
                                                                        </div>
                                                                        <div style={{ display: "block", paddingTop: "10px" }}>
                                                                            <Typography style={{ fontSize: '14px', color: '#878787', height: '20px' }}>Seller:TrueComRetail</Typography>
                                                                        </div>
                                                                        <div style={{ paddingTop: '10px' }}>
                                                                            <Typography style={{ fontWeight: "bold" }}>₹{p_data.product_price}</Typography>
                                                                        </div>
                                                                    </div>

                                                                    {/* <div style={{ paddingLeft: "10px", display: 'block' }}>
                                                                        <div>

                                                                            <span style={{ fontSize: "14px", fontFamily: 'Roboto,Arial,sans-serif', color: '#212121' }} >Delivery in 2 days, Sat | Free</span>
                                                                            <span style={{ paddingLeft: "5px", fontSize: "14px", textDecoration: 'line-through', fontFamily: 'Roboto,Arial,sans-serif', color: '#212121', }}>₹40</span>
                                                                        </div>
                                                                        <div>
                                                                            <Typography style={{ fontSize: '12px', color: '#878787' }} >7 Days Replacement Policy</Typography>

                                                                        </div>
                                                                    </div> */}



                                                                </div>

                                                                <div className={classes.btns} style={{}}>
                                                                    <div className={classes.btn1} style={{}}>
                                                                        <div style={{ display: "flex", color: '#212121', alignItems: "center" }}>
                                                                            {c_data.quantity > 1 ?
                                                                                <div style={{ display: "inline-block" }}>
                                                                                    <RemoveIcon onClick={() => handleremovetocart(c_data.product_id)} />

                                                                                </div>
                                                                                :
                                                                                <div style={{ display: "inline-block" }}>
                                                                                    <BlockIcon fontSize="small" />
                                                                                </div>
                                                                            }
                                                                            <div style={{
                                                                                display: "inline-block", padding: '3px 6px', width: '46px',
                                                                                height: '34px', borderRadius: '2px',
                                                                                backgroundColor: '#fff',
                                                                                border: '1px solid #c2c2c2',
                                                                                margin: '0 10px'
                                                                            }}>
                                                                                <input style={{
                                                                                    border: 'none',
                                                                                    width: '100%',
                                                                                    fontSize: '14px',
                                                                                    fontWeight: '500',
                                                                                    verticalSlign: 'middle',
                                                                                    textAlign: 'center'
                                                                                }} type="text" value={c_data.quantity} />
                                                                            </div>
                                                                            <div style={{ paddingLeft: "", display: "inline-block" }}>
                                                                                <AddIcon onClick={() => handleaddtocart(c_data.product_id)} />
                                                                            </div>
                                                                        </div>
                                                                    </div>


                                                                    <div className={classes.btn2} style={{}}>
                                                                        <div style={{
                                                                            display: "inline-block",
                                                                            textTransform: 'uppercase',
                                                                            boxShadow: 'none',
                                                                            outline: '0',
                                                                            fontSize: '16px',
                                                                            fontWeight: '500',
                                                                            cursor: 'pointer',
                                                                            marginRight: '25px', color: '#212121'
                                                                        }}>
                                                                            <Typography>Save for later</Typography>

                                                                        </div>
                                                                        <div style={{
                                                                            display: "inline-block",
                                                                            textTransform: 'uppercase',
                                                                            boxShadow: 'none',
                                                                            outline: '0',
                                                                            fontSize: '16px',
                                                                            fontWeight: '500',
                                                                            cursor: 'pointer',
                                                                            marginRight: '25px', color: '#212121'
                                                                        }}>
                                                                            <Typography onClick={() => handledeleteitem(c_data.id)}>Remove</Typography>

                                                                        </div>
                                                                    </div>
                                                                </div>


                                                            </div>

                                                            : <></>}

                                                    </>
                                                ))}

                                            </>

                                        ))

                                        }


                                    </div>
                                </div>
                                <Button className={classes.hideandshowbtn} onClick={() => setsummarybtn(summarybtn => !summarybtn)}
                                > {summarybtn ? "Hide" : "Show"} </Button>
                            </div>
                        </div>
                    </div>

                    {/* 4 div */}

                    <div style={{ display: u_address ? "flex" : 'none', alignItems: "flex-start" }} >
                        <div style={{ marginBottom: '16px', position: 'relative', display: 'inline-block', boxShadow: '0 1px 1px 0 rgb(0 0 0 / 20%)', width: '100%', backgroundColor: '#fff', borderRadius: '2px' }}>
                            <div style={{ padding: "16px 24px", minHeight: "72px", display: "flex", alignItems: "flex-start" }}>
                                <h3 style={{ padding: "0", height: '48px', textTransform: 'uppercase', color: '#878787', fontSize: '16px', fontWeight: '500', borderRadius: '2px 2px 0 0' }}>
                                    <span style={{ fontSize: '12px', color: '#2874f0', backgroundColor: '#f0f0f0', borderRadius: '2px', padding: '3px 7px', verticalAlign: 'baseline', marginRight: '17px' }}>4</span>
                                </h3>
                                <div style={{ display: "inline-block" }}>
                                    <div style={{ color: '#878787', fontSize: '16px', fontWeight: '500', marginBottom: '6px', textTransform: 'uppercase' }}>
                                        payment
                                        {/* <CheckIcon style={{ marginLeft: '15px' }} /> */}
                                    </div>
                                    <div style={{ fontSize: '14px', maxWidth: '630px', marginTop: '30px' }}>
                                        <div className={classes.card} >
                                            <StripeContainer />
                                        </div>
                                    </div>

                                </div>
                                {/* <Button style={{
                                    padding: '0 32px',
                                    height: '40px',
                                    borderRadius: '2px',
                                    border: '1px solid #e0e0e0',
                                    color: '#2874f0',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    background: '#fff',
                                    marginLeft: 'auto',
                                    cursor: 'pointer',
                                    textTransform: 'uppercase'
                                }}>Edit</Button> */}
                            </div>
                        </div>
                    </div>

                </div>


                {/* alert section */}
                <Snackbar open={addtocartalert} autoHideDuration={1000} onClose={handleClose} >
                    <Alert onClose={handleClose} severity="info">
                        quantity-update
                    </Alert>
                </Snackbar>
                <Snackbar open={removealert} autoHideDuration={2000} onClose={handleClose} >
                    <Alert onClose={handleClose} severity="info">
                        remove item from your cart
                    </Alert>
                </Snackbar>
                <Snackbar open={editaddressalert} autoHideDuration={2000} onClose={handleClose} >
                    <Alert onClose={handleClose} severity="info">
                        address updated
                    </Alert>
                </Snackbar>





                {/* second div */}
                <div className={classes.div2} style={{}}>

                    {/* ???? */}
                    <div style={{ boxShadow: '0 1px 1px 0 rgb(0 0 0 / 20%)', borderRadius: '2px', position: 'relative', width: '255px', display: 'inline-block', verticalAlign: 'top' }}>
                        <div style={{
                            display: "block", background: 'var(--color-white-bg)', borderRadius: '2px', minHeight: '47px', boxShadow: '0 1px 1px 0 rgb(0 0 0 / 20 %)'
                        }}>
                            <span className={classes.pricedetail}>Price details</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", margin: "20px 0", alignItems: "flex-start" }}>
                            <div>
                                <span>Price ({total_cart_item} items)</span>
                            </div>
                            <div>
                                <span>₹{total_cart_price}</span>
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", margin: "20px 0", alignItems: "flex-start" }}>
                            <div>
                                <span>Discount</span>
                            </div>
                            <div>
                                <span>₹0</span>
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", margin: "20px 0", alignItems: "flex-start" }}>
                            <div>
                                <span>Delivery Charges</span>
                            </div>
                            <div>
                                <span>FREE</span>
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", margin: "20px 0", alignItems: "flex-start" }}>
                            <div>
                                <span>Total Amount</span>
                            </div>
                            <div>
                                <span>₹{total_cart_price}</span>
                            </div>
                        </div>
                    </div>

                    {/* ????? */}
                </div>

            </div>
        </div >
    )
}

