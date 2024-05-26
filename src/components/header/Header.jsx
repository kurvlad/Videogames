import {NavLink, useNavigate} from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import HomeIcon from '@mui/icons-material/Home';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import List from '@mui/material/List';
import {ListItem} from "@mui/material";
import styles from './Header.module.css';
import {useEffect, useState} from "react";
import {store} from "../../store/store";
import { logout } from "../../store/userSlice";

export default function Header(){
    const userSlice = store.getState().user;
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();
    const onClickOut = ()=>{
        store.dispatch(logout());
        navigate('/');
    }
    useEffect(() => {
        setIsAuth(userSlice.isAuthenticated)
       const unsub = store.subscribe(()=> {
           setIsAuth(() => userSlice?.isAuthenticated || null);
       });
        return () => unsub();
    }, [userSlice.isAuthenticated]);

    return (
        <nav>
            <List  className={styles.navList}
                   style={{justifyContent: !isAuth ? 'space-between': 'center'}}
                   component="nav"
                   aria-labelledby="nested-list-subheader">
                <ListItem>
                    <NavLink to='/' className={styles.navLink}
                             style={{margin: !isAuth ? '0 70px' : '0 auto'}}>
                        <HomeIcon/>
                        <span>Home</span>
                    </NavLink>
                </ListItem>
                {isAuth ?
                <>
                    <ListItem>
                        <NavLink to='/favorites' className={styles.navLink}>
                            <FavoriteIcon/>
                            <span>Favorites</span>
                        </NavLink>
                    </ListItem>
                    <ListItem>
                        <NavLink to='/history' className={styles.navLink}>
                            <QueryBuilderIcon/>
                            <span>History</span>
                        </NavLink>
                    </ListItem>
                    <ListItem onClick={onClickOut}>
                        <div className={styles.navLink}>
                            <LogoutIcon/>
                            <span>Logout</span>
                        </div>
                    </ListItem>
                </> :
                <div className={styles.notAuth}>
                    <ListItem>
                        <NavLink to='/signin' className={styles.navLink}>
                            <PersonOutlineIcon/>
                            <span>Login</span>
                        </NavLink>
                    </ListItem>
                    <ListItem>
                        <NavLink to='/signup' className={styles.navLink}>
                            <PersonAddAltIcon/>
                            <span>Sign Up</span>
                        </NavLink>
                    </ListItem>
                </div>
                }
            </List>
        </nav>
    );
};