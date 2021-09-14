import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Button, Divider } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Getllproduct, Getspecificproduct } from '../store/actions/action';



const useStyles = makeStyles((theme) => ({
    div1: {
        display: "flex",
        border: "1px solid red",
        // height: ""

    },
    category_name: {
        display: "flex",
        // [theme.breakpoints.down('380')]: {
        //     // display: 'block',

        // },
    },
    productbar: {
        display: "flex",
        marginBottom:"10px",
        flexFlow: 'row',
        flexWrap: 'wrap',
        [theme.breakpoints.up(340)]: {
            justifyContent: "flex-start"
        },
        [theme.breakpoints.down(340)]: {
            alignItems: "center",
            justifyContent: "center"
        },
    },
    productdiv: {
        display: "inline-block",
        padding: "20px 20px",
        width: "12.5%",
        "&:hover": {
            transform: "scale(1.1)",
            transform: "scale(1.1)",
            transform: "scale(1.1)",
        },

        [theme.breakpoints.down('sm')]: {
            width: "25%"
        },
        [theme.breakpoints.down(600)]: {
            width: "50%"
        },
        [theme.breakpoints.down(250)]: {
            width: "100%"
        },
        // [theme.breakpoints.down('340')]: {
        //     display: 'flex',
        //     flexFlow:"column"
        // },

    },


}));

export default function Productlist(props) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const product_data = useSelector(state => state.ProductofsuccategoryReducer.data.data)
    const handleclickonproduct = (id) => {
        // alert(id)
        dispatch(Getspecificproduct(id, props))
    }
    return (
        <div>


            <div style={{ margin: '20px 20px 0 20px', height: "auto", boxShadow: "rgb(165 160 160) 0px 2px 4px 0px" }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: "space-between" }}>
                    <div className={classes.category_name}>
                        <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>Best Selling Phone</Typography>
                    </div>
                    {/* <div className={classes.viewbtn} style={{}}>

                        <Button component={Link} to='/productlist' style={{ backgroundColor: "#2874f0", color: "white" }} variant="contained">View all</Button>

                    </div> */}
                </div>


                <Divider style={{ backgroundColor: "black" }} />
                <div className={classes.productbar}   >

                    {/* style={{ display: "flex" }} */}
                    {/* <Link to="/productdetail"> */}
                    {product_data && product_data.data && product_data.data.length > 0 && product_data.data.map((data, i) => (
                        // <div style={{display:"flex" , flexWrap:'wrap',flexFlow:"row",justifyContent:"space-around"}}>
                        <div className={classes.productdiv} key={i} style={{}}>
                            <div onClick={() => handleclickonproduct(data.id)} style={{ cursor: "pointer", display: "flex", alignItems: 'center', justifyContent: 'center', height: "185px" }}>
                                <img src={data.product_image} height="100%" width="auto" />
                            </div>
                            <div style={{ display: "block", textAlign: "center", fontSize: '14px', fontWeight: '500', marginTop: '15px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {/* <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>Headphones</Typography> */}
                                {data.product_name}
                            </div>
                        </div>
                        // </div>
                    ))}
                    {/* </Link> */}
                </div>
            </div>


        </div>
    )
}

