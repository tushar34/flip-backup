import { Divider, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom';
import React from 'react'
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
// import { Button } from 'bootstrap';
import { Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { AddtoCart, RemovetoCart, Usercartlist, Deletecartitem } from '../store/actions/action';
import BlockIcon from '@material-ui/icons/Block';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Home from './Home';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
const useStyles = makeStyles((theme) => ({
    outerdiv: {
        display: "flex",
        flexFlow: 'row',
        [theme.breakpoints.down('sm')]: {
            // display: 'block',
            // // backgroundColor:'red'
            // height: "auto",
            // width: "auto"
            flexFlow: 'column',
        },
    },
    inerdiv1: {
        display: "flex",
        flexFlow: 'column',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        },
    },
    inerdiv2: {
        display: "flex",
        flexFlow: 'column',
        padding: '0px 0px 0px 16px',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
            padding: '0px 15px',
        },
    },
    maindiv: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "1260px",
        margin: "0 auto",
        boxSizing: 'border-box',
        // border: "1px solid red",
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        },
    },
    name: {
        display: "flex",
        [theme.breakpoints.down('sm')]: {
            flexFlow: "column",
            alignItems: "center",
            justifyContent: "center",

        },
    },
    maindiv2: {
        width: '100%',
        position: 'relative',
        margin: '0 auto',
        minWidth: '978px',
        maxWidth: '1680px',
        padding: '8px',
        boxSizing: 'border-box',
        [theme.breakpoints.down('sm')]: {
            minWidth: '0',
        },
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
            display: "flex",
            margin: "10px 0 0 0"
        },
    },
    btn1: {
        display: "inline-block",
        // [theme.breakpoints.down('sm')]: {
        //     display: "flex",        
        // },
    },
    price: {
        display: "block",
        width: "100%",
        [theme.breakpoints.down('sm')]: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
            // margin: "10px 0 0 0"
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
    placeorder2: {
        position: 'sticky',
        top: '64px',
        bottom: '0',
        zIndex: '2',
        alignSelf: 'flex-start',
        width: "100%",
        // display:"block",
        [theme.breakpoints.up('sm')]: {
            display: "none"
        },
        [theme.breakpoints.down('sm')]: {
            display: "block"
        },
    },
    productname: {
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
    delinfo: {
        paddingLeft: "10px",
        display: 'block',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: "0",
            display: "flex",
            flexFlow: "column",
            justifyContent: "center",
            alignItems: "center"

        },

    }


}));

function Alert(props) {
    return <MuiAlert elevation={5} variant="filled" {...props} />;
}

export default function Addtocart(props) {
    const history = useHistory()
    console.log(history)
    const dispatch = useDispatch()
    const user_id = useSelector(state => state.LoginReducer.id)
    const token = useSelector(state => state.LoginReducer.token)
    const ca_data = useSelector(state => state.UsercartlistReducer?.data?.data)
    console.log(ca_data)
    useEffect(() => {
        if (token) {
            dispatch(Usercartlist(user_id, token));
        }
        else{
            history.push("/")
        }
    }, [0])

    const [openalertcart, setopenalertcart] = useState(false)
    useEffect(() => {
        if (ca_data?.cart_data?.length == 0) {
            setopenalertcart(true)
            history.push("/")

        }

    }, [ca_data])

    const classes = useStyles();
    // const user_id = useSelector(state => state.LoginReducer.id)

    // const ca_data = useSelector(state => state.AddtocartReducer.data.data)

    const product_data = useSelector(state => state.GetallproductReducer?.product_data)

    const total_cart_item = useSelector(state => state.UsercartlistReducer?.data?.data?.cart_data?.length)
    // console.log(total_cart_item)

    const total_cart_price = useSelector(state => state.UsercartlistReducer?.data?.data?.total_cart_price)
    // console.log(total_cart_price)

    // .cart_data
    // console.log(ca_data)
    // console.log(product_data)
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setaddtocartalert(false)
        setremovealert(false)
    };

    const [addtocartalert, setaddtocartalert] = useState(false)
    const handleaddtocart = (id) => {
        dispatch(AddtoCart(id, user_id, token, props))
        setaddtocartalert(true)

    }
    const handleremovetocart = (id) => {
        dispatch(RemovetoCart(id, user_id, token, props))
        setaddtocartalert(true)
    }
    const [removealert, setremovealert] = useState(false)
    const handledeleteitem = (id) => {
        setremovealert(true)
        dispatch(Deletecartitem(user_id, id, token, props))

    }
    const [openbackdrop, setopenbackdrop] = useState(false)
    return (
        <div>
            <div className={classes.maindiv} style={{}}>
                <div className={classes.maindiv2} style={{}}>
                    <div className={classes.outerdiv} style={{}}>

                        {/* firs div */}

                        <div className={classes.inerdiv1} style={{}}>

                            <div style={{ display: "flex", width: "100%", boxShadow: "rgb(0 0 0 / 20%) 0px 1px 2px 0px" }}>
                                <div style={{ display: "flex", width: '100%', flexFlow: "row" }}>
                                    <div style={{ display: "block" }}>
                                        <Typography>My Cart</Typography>
                                    </div>
                                </div>
                                {/* <Divider style={{ backgroundColor: 'black' }} /> */}
                            </div>

                            <div style={{ display: "block", width: "100%" }}>


                                {ca_data && ca_data.cart_data && ca_data.cart_data.length > 0 && ca_data.cart_data.map((c_data, i) => (

                                    <>
                                        {product_data && product_data.data && product_data.data.length > 0 && product_data.data.map((p_data, j) => (
                                            <>
                                                {c_data.product_id == p_data.id ?

                                                    <div style={{ borderTop: '1px solid #f0f0f0!important', padding: '24px', position: 'relative', maxWidth: '950px' }}>
                                                        <div className={classes.name} style={{}}>
                                                            <div style={{ height: '112px', width: '112px', position: 'relative', margin: '0 auto', }}>
                                                                <img style={{
                                                                    position: 'absolute',
                                                                    bottom: 0,
                                                                    left: 0,
                                                                    right: 0,
                                                                    top: 0,
                                                                    margin: 'auto',
                                                                    maxWidth: '100%',
                                                                    maxHeight: '100%'
                                                                }}
                                                                    // src="https://rukminim1.flixcart.com/image/224/224/kg8avm80/mobile/u/c/d/apple-iphone-12-pro-dummyapplefsn-original-imafwgbrzhcushwk.jpeg?q=90" 
                                                                    src={p_data.product_image}
                                                                />
                                                            </div>

                                                            <div className={classes.productname} >

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

                                                            <div className={classes.delinfo}>
                                                                <div>
                                                                    {/* <Typography style={{fontSize:"14px",fontFamily: 'Roboto,Arial,sans-serif',color:'#212121'}}>Delivery in 2 days, Sat | Free</Typography> */}
                                                                    {/* <Typography style={{textDecoration: 'line-through'}}>₹40</Typography> */}

                                                                    <span style={{ fontSize: "14px", fontFamily: 'Roboto,Arial,sans-serif', color: '#212121' }} >Delivery in 2 days, Sat | Free</span>
                                                                    <span style={{ paddingLeft: "5px", fontSize: "14px", textDecoration: 'line-through', fontFamily: 'Roboto,Arial,sans-serif', color: '#212121', }}>₹40</span>
                                                                </div>
                                                                <div>
                                                                    <Typography style={{ fontSize: '12px', color: '#878787' }} >7 Days Replacement Policy</Typography>

                                                                </div>
                                                            </div>



                                                        </div>
                                                        <div className={classes.btns} style={{}}>
                                                            <div className={classes.btn1} style={{}}>
                                                                <div style={{ display: "flex", color: '#212121', alignItems: "center" }}>
                                                                    {c_data.quantity > 1 ?
                                                                        <div style={{ display: "inline-block" }}>
                                                                            {/* <Button size="small"  variant="contained" color="secondary" disabled> */}
                                                                            <RemoveIcon onClick={() => handleremovetocart(c_data.product_id)} />
                                                                            {/* </Button> */}
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



                                {/* onClick={() => setopenbackdrop(openbackdrop => !openbackdrop)} */}
                                <div className={classes.placeorder}>
                                    <div style={{ borderTop: '1px solid #f0f0f0', background: '#fff', padding: '16px 22px', boxShadow: '0 -2px 10px 0 rgb(0 0 0 / 10%)', textAlign: 'right' }}>
                                        <Button component={Link} to='/checkout' style={{ width: 'auto', background: '#fb641b', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 20%)', border: "none", color: '#fff' }}>
                                            <span>Place Order</span>
                                            {/* component={Link} to='/checkout' */}
                                        </Button>
                                    </div>


                                </div>

                            </div>



                        </div>

                        {/* second div */}

                        <div className={classes.inerdiv2} style={{}}>
                            <div className={classes.price} style={{}}>

                                {/* {ca_data && ca_data.cart_data && ca_data.cart_data.length > 0 && ca_data.cart_data.map((c_data, i) => ( */}

                                <div style={{ boxShadow: '0 1px 1px 0 rgb(0 0 0 / 20%)', borderRadius: '2px', position: 'relative', width: '255px', display: 'inline-block', verticalAlign: 'top' }}>
                                    <div style={{
                                        display: "block", background: 'var(--color-white-bg)', borderRadius: '2px', minHeight: '47px', boxShadow: '0 1px 1px 0 rgb(0 0 0 / 20 %)'
                                    }}>
                                        <span style={{ borderBottom: '1px solid var(--color-grey-grade1)', fontSize: 'var(--font-size-16)', display: 'block', textTransform: 'uppercase', padding: '13px 24px', fontWeight: 'var(--font-medium)', color: '#878787', minHeight: '47px', fontFamily: 'Roboto,Arial,sans-serif', borderRadius: '2px 2px 0 0', textAlign: "center" }}>Price details</span>
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

                                {/* ))} */}

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



                        <div className={classes.placeorder2}>
                            <div style={{ borderTop: '1px solid #f0f0f0', background: '#fff', padding: '16px 22px', boxShadow: '0 -2px 10px 0 rgb(0 0 0 / 10%)', textAlign: 'right' }}>
                                <Button component={Link} to='/checkout' style={{ width: 'auto', background: '#fb641b', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 20%)', border: "none", color: '#fff' }}>
                                    <span>
                                        Place Order
                                    </span>
                                </Button>
                            </div>

                        </div>

                    </div>
                </div>

            </div>


            <Backdrop open={openbackdrop} onClick={() => setopenbackdrop(false)} transitionDuration >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div >

    )
}
