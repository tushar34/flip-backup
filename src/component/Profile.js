import React from 'react'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Button } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { makeStyles } from '@material-ui/core/styles';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ShopIcon from '@material-ui/icons/Shop';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";
import history from '../history';
import Userprofile from './Userprofile'
import Myorder from './Myorder';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,

    },
    // toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        marginTop: '65px'
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        marginLeft: "200px"
    },
}));


export default function Profile() {
    const classes = useStyles();
    const { path, url } = useRouteMatch();
    // console.log(path)
    // console.log(url)

    return (
        <div>
            <Router history={history}>

                <Drawer variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    className={classes.drawer}
                >
                    <div>
                        <List>
                            {/* <Link to="/userprofile"> */}
                            <ListItem component={Link} to="/profile" >
                                <Button>
                                    <ListItemIcon><AccountBoxIcon /> </ListItemIcon>
                                    <ListItemText primary={"Profile"} />
                                </Button>
                            </ListItem>
                            {/* </Link> */}
                            {/* <Link to={`${url}/myorder`}> */}
                            <ListItem component={Link} to={`${url}/myorder`}>
                                <Button>

                                    <ListItemIcon><ShopIcon /> </ListItemIcon>
                                    <ListItemText primary={"My Order"} />
                                </Button>

                            </ListItem>
                            {/* </Link> */}
                        </List>
                    </div>
                </Drawer>

                <Switch>
                    <Route exact path='/profile' component={Userprofile} />

                    {/* <Route path={`${path}/myorder`} component={Myorder} /> */}
                    <Route exact path={`${url}/myorder`} component={Myorder} />

                </Switch>
            </Router>

        </div >
    )
}
