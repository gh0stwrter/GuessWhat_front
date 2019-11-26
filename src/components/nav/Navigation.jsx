import React, {useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import {NavItem, NavLink, Nav, Navbar} from "reactstrap";
import apiVar from "../../_utils/api/apiVar";
import {Redirect} from 'react-router-dom'
import { FaChevronUp } from "react-icons/fa";

const Navigation = (props) => {
    const classes = useStyles();
    const [isLogged, logChanged] = useState(false);
    const [user, userChanged] = useState(apiVar.user);
    const [disconnect, changeDisconnect] = useState(false);
    const [showAccount, changeShowAccount] = useState(false);

    useEffect(() => {
        isLog().then(res => {

        })
    })

    const isLog = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            logChanged(true);
            return true;
        } else {
            logChanged(false);
            return false;
        }
    }

    const logout = (e) => {
        e.preventDefault();
        if (showAccount) {
            changeShowAccount(false)
        }
        if (isLogged) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            userChanged(null)
            changeDisconnect(true);
        } else {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            userChanged(null)
            changeDisconnect(true);
        }
    }

    return (
        <Navbar expand="md" color="light" light
                style={{position: 'fixed', width: '100%', backgroundColor: 'rgba(248, 249, 250, 0.6)'}}>
            {disconnect ? <Redirect to={'/connexion'}/> : null}
            <Nav className="" navbar>
                {isLogged ? null :
                    <NavItem className="">
                        <NavLink href='/connexion'>S'identifier</NavLink>
                    </NavItem>}
                {isLogged ? <NavItem className="">
                    <NavLink onClick={() => changeShowAccount(!showAccount)}>Mon Compte</NavLink>
                </NavItem> : null}
                <NavItem className="">
                    <NavLink href='/'>Acceuil</NavLink>
                </NavItem>
                <NavItem className="">
                    <NavLink href='/Classement'>Classement</NavLink>
                </NavItem>
            </Nav>
            {showAccount ?
                <div className={classes.accountContainer}>
                    <div className={classes.accountBloc}>
                        <div className={classes.icon} onClick={() => changeShowAccount(!showAccount)}>
                            <FaChevronUp />
                        </div>
                        <span className={classes.span}>Mon Profile</span>
                        <span className={classes.span}>Mes Parties</span>
                        <span className={classes.span}>Mes Salons</span>
                        <span className={classes.span} onClick={(event) => logout(event)}>Se déconnecter</span>
                    </div>
                </div> : null}
        </Navbar>
    );
};

const useStyles = makeStyles(theme => ({
    accountBloc: {
        left: 10,
        top: 55,
        width: 150,
        height: 270,
        display: 'flex',
        position: 'fixed',
        flexDirection: 'column',
        backgroundColor: 'rgba(250, 250, 250, 1)',
        border: '1px solid rgba(0, 0, 0)',
        borderRadius: 5,
        index: 999999,
    },
    accountContainer: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 20,
    },
    span: {
        fontWeight: 600,
        marginTop: 20,
        marginBottom: 20,
        cursor: 'pointer',
    },
    icon: {
        marginTop: 10,
        cursor: 'pointer',
    },
}));

export default Navigation;
