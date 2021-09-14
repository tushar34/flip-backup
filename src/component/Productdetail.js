import React, { useState, useEffect } from 'react'
import { Button, Divider, Typography } from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import ReactImageMagnify from 'react-image-magnify';
import StarRateIcon from '@material-ui/icons/StarRate';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { AddtoCart, Usercartlist } from '../store/actions/action';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router';
import clsx from 'clsx';
// import 
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    productdetail: {
        // display: "inline-block",
        display: "flex",
        width: "60%",
        height: "auto",
        [theme.breakpoints.down('sm')]: {
            display: 'block',
            // backgroundColor:'red'
            height: "auto",
            width: "auto"
        },
    },
    specification: {
        display: "flex",
        flexFlow: "column",
        marginTop: "10px",
        marginLeft: "10px",
        marginRight: "10px",
        marginBottom: "10px",
        boxShadow: "rgb(165 160 160) 0px 2px 4px 0px",
        width: "auto",
        height: "auto",
        [theme.breakpoints.down('md')]: {
            display: 'block',
            // backgroundColor: 'red',
            width: "auto",
            height: "auto",
        },
    },
    image: {
        // display: "inline-block",
        display: "flex",
        flexFlow: 'column',
        width: "40%",
        height: "500px",
        alignItems: "center",
        justifyContent: "center",
        [theme.breakpoints.down('sm')]: {
            display: 'block',
            marginLeft: "auto",
            marginRight: "auto",
            width: '40%',
            height: "auto",
            marginBottom: "15px"
            // backgroundColor: "red"
            // margin: "auto",
        },
        [theme.breakpoints.down('350')]: {
            width: '55%',
        },

    },
    maindiv: {
        // height: "800px",
        display: 'flex',
        flexFlow: "row",
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: "center",
        [theme.breakpoints.down('sm')]: {
            // height: "auto",
            // width: "auto"
            display: "block"
        },
    },
    inerdiv: {
        display: "flex",
        height: "auto",
        margin: "10px 200px 50px 200px",
        // border: "1px solid red",
        boxShadow: "rgb(165 160 160) 0px 2px 4px 0px",
        [theme.breakpoints.down('sm')]: {
            height: "auto",
            width: "auto",
            margin: 0,
            // border: "1px solid black",
            display: "block"
        },
    },
    innerimage: {
        display: "inline-block",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "10px",
        // height:'100%',
        // width:'50%',
        // position:"absolute",
        [theme.breakpoints.down('sm')]: {
            display: "flex",
        },
    },
    btn: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "10px",
        [theme.breakpoints.down('600')]: {
            // display: "block",
            flexFlow: "column"
        },
    },
    cartbtn: {
        display: "inline-flex",
        [theme.breakpoints.down('sm')]: {
            marginBottom: "15px",
        },


    },
    btngroup1: {
        backgroundColor: "#ff9f00",
        marginRight: "10px",
        [theme.breakpoints.down('600')]: {
            // display: "block",
            marginRight: "0"
        },
    },
    btngroup2: {
        backgroundColor: "#fb641b",
        marginRight: "10px",
        [theme.breakpoints.down('600')]: {
            // display: "block",
            marginRight: "0"
        },
    }

}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Productdetail(props) {
    const history = useHistory()
    const ca_data = useSelector(state => state.UsercartlistReducer?.data?.data)
    console.log(ca_data)
    useEffect(() => {
        console.log(ca_data)
    }, [ca_data])
    const token = useSelector(state => state.LoginReducer.token)
    const msg = useSelector(state => state.AddtocartReducer?.data?.data?.msg);
    const [snackbaropen1, setsnackbaropen1] = useState(false)
    const [snackbaropen2, setsnackbaropen2] = useState(false)


    const handlesnackbarClose1 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setsnackbaropen1(false);
    }
    const handlesnackbarClose2 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setsnackbaropen2(false);
        setloginalert(false)
    }

    const user_id = useSelector(state => state.LoginReducer.id)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(Usercartlist(user_id, token));
    }, [0])

    const classes = useStyles();
    const [expanded, setexpanded] = useState(false)
    const product_data = useSelector(state => state.GetspecificproductReducer.data.data)
    const id = product_data[0]['id']
    console.log(id)
    const image_url = product_data[0]['product_image']
    const image_product_url = product_data[0]['product_detail_image']

    const name = product_data[0]['product_name']
    const price = product_data[0]['product_price']
    const category = product_data[0]['product_category_id']
    const sub_category = product_data[0]['product_subcategory_id']
    const specification = product_data[0]['product_specification']

    const key = Object.keys(specification).map(keydata => keydata)
    const value = Object.values(specification).map(keydata => keydata)
    const [loginalert, setloginalert] = useState(false)
    const handleaddtocart = () => {

        if (token) {
            if (ca_data?.cart_data?.length > 0) {
                const le = ca_data.cart_data.length
                // console.log(le)
                const find_data = ca_data.cart_data.filter(d => d.product_id == id)
                // console.log(find_data)
                // console.log(id)
                if (find_data.length != 0) {
                    setsnackbaropen2(true)
                }
                else {
                    setsnackbaropen1(true)
                }
            }
            else {
                setsnackbaropen1(true)
            }
            dispatch(AddtoCart(id, user_id, token, props))
        }
        else {
            setloginalert(true)
        }
    }
    const handlebuynow = () => {
        if (token) {
            if (ca_data?.cart_data?.length > 0) {
                const le = ca_data.cart_data.length
                // console.log(le)
                const find_data = ca_data.cart_data.filter(d => d.product_id == id)
                // console.log(find_data)
                // console.log(id)
                if (find_data.length != 0) {
                    setsnackbaropen2(true)
                }
                else {
                    setsnackbaropen1(true)
                }
                // dispatch(AddtoCart(id, user_id, token, props))
                // history.push('/checkout')
            }
            else {
                setsnackbaropen1(true)

            }
            dispatch(AddtoCart(id, user_id, token, props))
            history.push('/checkout')

        }
        else {
            setloginalert(true)
        }

    }

    return (
        <div className={classes.maindiv} style={{}}>
            <div className={classes.inerdiv} style={{}}>


                <div className={classes.image} style={{}}>

                    <div className={classes.innerimage} style={{}}>
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: 'Wristwatch by Ted Baker London',
                                isFluidWidth: true,
                                // src: "https://rukminim1.flixcart.com/image/416/416/kg8avm80/mobile/5/z/w/apple-iphone-12-pro-max-dummyapplefsn-original-imafwgcy4h9c9rcm.jpeg?q=70"
                                src: (image_product_url)
                            },
                            largeImage: {
                                // src: "https://rukminim1.flixcart.com/image/416/416/kg8avm80/mobile/5/z/w/apple-iphone-12-pro-max-dummyapplefsn-original-imafwgcy4h9c9rcm.jpeg?q=70",
                                src: (image_product_url),
                                width: 1200,
                                height: 1800
                            },
                            enlargedImageContainerDimensions: {
                                width: '200%',
                                height: '100%'
                            }
                        }} />
                    </div>

                    <div className={classes.btn} style={{}}>
                        <div className={classes.cartbtn} style={{}}>
                            <Button className={classes.btngroup1} onClick={handleaddtocart} variant="contained">
                                <ShoppingCartIcon />
                                <Typography style={{ marginLeft: "5px" }}>ADD TO CART</Typography>
                            </Button>
                        </div>
                        <div className={classes.cartbtn}  >
                            {/* style={{ display: "inline-flex" }} */}
                            <Button className={classes.btngroup2} onClick={handlebuynow} variant="contained">
                                <FlashOnIcon />
                                <Typography style={{ marginLeft: "5px" }}>BUY NOW</Typography>
                            </Button>
                        </div>
                    </div>
                    {/* open={snackbaropen1} */}
                    <Snackbar open={snackbaropen1} autoHideDuration={3000} onClose={handlesnackbarClose1}>
                        <Alert onClose={handlesnackbarClose1} severity="success">
                            add to cart
                        </Alert>
                    </Snackbar>

                    {/* open={snackbaropen2} */}
                    <Snackbar open={snackbaropen2} autoHideDuration={3000} onClose={handlesnackbarClose2}>
                        <Alert onClose={handlesnackbarClose2} severity="success">
                            update quantity
                        </Alert>
                    </Snackbar>


                    <Snackbar open={loginalert} autoHideDuration={3000} onClose={handlesnackbarClose2}>
                        <Alert onClose={handlesnackbarClose2} severity="info">
                            you are not valid user. please sign-up or sign-in.
                        </Alert>
                    </Snackbar>




                </div>

                <div className={classes.productdetail} style={{}}>
                    <div style={{ display: "block" }}>
                        <div style={{ display: "block", padding: "0 15px" }}>
                            <Typography variant="h6">{name}</Typography>
                        </div>
                        <div style={{ margin: "15px", backgroundColor: "green", width: "55px", height: '23px', borderRadius: "3px", marginTop: "10px" }}>
                            <Typography style={{ color: "white", marginLeft: '5px' }} >4.5<StarRateIcon style={{ color: "white" }} /></Typography>

                        </div>
                        <div style={{ padding: "0 15px", display: "inline-flex", alignItems: "center", justifyContent: 'center', marginTop: "10px" }}>
                            <div style={{ display: "inline-flex" }}>
                                <img height="25px" src="https://icon2.cleanpng.com/20180404/ize/kisspng-currency-symbol-thai-baht-indian-rupee-sign-comput-rupee-5ac554ad076026.3820412515228817090302.jpg" />
                            </div>

                            <div style={{ display: "inline-flex" }}>
                                <Typography variant="h5">{price}</Typography>
                            </div>
                        </div>


                        <div style={{ marginTop: "10px", marginBottom: '10px', height: "auto", padding: "0 15px" }}>
                            <div style={{ display: "block" }}>
                                <Typography style={{ fontWeight: "bold" }}  >Available offers</Typography>
                            </div>
                            <div style={{ display: "flex" }}>
                                <div style={{ display: "inline-block" }}>
                                    <img width="18px" aspect-ratio="auto 18 / 18" height="18px" src="https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" />
                                </div>
                                <div style={{ display: "inline-block", marginLeft: "5px" }}>
                                    <Typography style={{ fontSize: "14px", fontFamily: "Roboto,Arial,sans-serif" }}  >Bank Offer10% off on Axis Bank Credit Cards, up to ₹1000. On orders of ₹5000 and above</Typography>
                                </div>
                            </div>
                            <div style={{ display: "flex" }}>
                                <div style={{ display: "inline-block" }}>
                                    <img width="18px" aspect-ratio="auto 18 / 18" height="18px" src="https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" />
                                </div>
                                <div style={{ display: "inline-block", marginLeft: "5px" }}>
                                    <Typography style={{ fontSize: "14px", fontFamily: "Roboto,Arial,sans-serif" }}  >Bank Offer10% off on ICICI Bank Credit Cards, up to ₹1000. On orders of ₹5000 and above</Typography>
                                </div>
                            </div>
                            <div style={{ display: "flex" }}>
                                <div style={{ display: "inline-block" }}>
                                    <img width="18px" aspect-ratio="auto 18 / 18" height="18px" src="https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" />
                                </div>
                                <div style={{ display: "inline-block", marginLeft: "5px" }}>
                                    <Typography style={{ fontSize: "14px", fontFamily: "Roboto,Arial,sans-serif" }}  >Bank Offer10% off on Axis Bank Debit Cards, up to ₹750. On orders of ₹5000 and above</Typography>
                                </div>
                            </div>
                            <div style={{ display: "flex" }}>
                                <div style={{ display: "inline-block" }}>
                                    <img width="18px" aspect-ratio="auto 18 / 18" height="18px" src="https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" />
                                </div>
                                <div style={{ display: "inline-block", marginLeft: "5px" }}>
                                    <Typography style={{ fontSize: "14px", fontFamily: "Roboto,Arial,sans-serif" }}  >Special PriceExtra ₹4000 off (price inclusive of discount)</Typography>
                                </div>
                            </div>
                        </div>


                        <div className={classes.specification} style={{}}>

                            <div style={{ display: "flex", padding: "10px 0 10px 5px" }}>
                                <Typography style={{ fontWeight: "500", fontSize: "24px" }} >Specifications</Typography>
                            </div>
                            <Divider style={{ backgroundColor: "black" }} />
                            <div style={{ display: "flex", padding: "10px 0 10px 5px" }}>
                                <Typography >General</Typography>
                            </div>

                            <div style={{ display: "flex" }}>
                                <table width='100%'>
                                    <tbody>


                                        {value.map((valuedata, i) => (
                                            <tr key={i}>
                                                <td style={{ color: '#878787', width: "50%", paddingRight: '10px', paddingLeft: "5px" }}>{key[i]}</td>
                                                <td>{valuedata}</td>
                                            </tr>
                                        ))}


                                        {/* <Collapse in={expanded} timeout="auto" unmountOnExit>

                                            <tr>
                                                <td style={{ color: '#878787', width: "35%", paddingRight: '90px', paddingLeft: "5px" }}>SIM Type</td>
                                                <td>Dual Sim</td>
                                            </tr>
                                            <tr>
                                                <td style={{ color: '#878787', width: "35%", paddingRight: '90px', paddingLeft: "5px" }}>Hybrid Sim Slot</td>
                                                <td>No</td>
                                            </tr>
                                        </Collapse> */}
                                    </tbody>
                                    {/* <IconButton
                                        className={clsx(classes.expand, {
                                            [classes.expandOpen]: expanded,
                                        })}
                                        onClick={() => setexpanded(!expanded)}
                                        aria-expanded={expanded}
                                        aria-label="show more"
                                    >
                                        <ExpandMoreIcon />
                                    </IconButton> */}
                                    {/* <Button onClick={() => setexpanded(!expanded)} style={{ color: "blue" }}>Read more</Button> */}
                                </table>
                            </div>


                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}
