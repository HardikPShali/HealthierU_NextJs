import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Container, NavLink } from "react-bootstrap"; //NavDropdown, Row, Col, Nav
import Image from 'next/image';
import styles from '../../Patient/Header/PatientHeader.module.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { getUnreadNotificationsCount, putMarkAsReadNotification } from "../../../lib/service/FrontendApiServices";
import NotificationMenuDoctor from '../../Common/NotificationsMenu/NotificationsMenu';
import { logout, selectUser } from '../../../lib/redux/userSlice';
import Nav from 'react-bootstrap/Nav';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import cls from 'classnames';
const DoctorHeader = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector(selectUser);
    const currentUser = user?.profileDetails;
    const handleLogout = () => {
        dispatch(logout())
        router.push('/')
    }
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElMyPortal, setAnchorElMyPortal] = useState(null);
    const [anchorNotifMenu, setAnchorNotifMenu] = useState(null);
    const handleMyPortalDropdown = (event) => {
        setAnchorElMyPortal(event.currentTarget);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleNotifMenuDropdown = (event) => {
        setAnchorNotifMenu(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setAnchorElMyPortal(null);
        setAnchorNotifMenu(null);
    };
    // const {
    //     patientDetailsList,
    //     unReadMessageList,
    //     currentDoctor: { picture = null },
    // } = props;
    // const unReadMessageCount =
    //     (unReadMessageList && Object.keys(unReadMessageList).length) || 0;

    //NOTIFICATION BADGE COUNT LOGIC
    const [badgeCount, setBadgeCount] = useState(0);
    const unreadNotificationCountHandler = async () => {
        const userId = currentUser.userId;
        const response = await getUnreadNotificationsCount(userId).catch(err => (console.log({ err })));
        const notificationsCount = response.data.data;
        if (notificationsCount > 0) {
            setBadgeCount(notificationsCount);
        }
        else {
            setBadgeCount(0);
        }
    }
    useEffect(() => {
        unreadNotificationCountHandler();
        const interval = setInterval(() => {
            unreadNotificationCountHandler();
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    //MARK AS READ NOTIFICATION LOGIC
    const markAsReadNotificationHandler = async () => {
        const userId = currentUser.userId;
        const response = await putMarkAsReadNotification(userId).catch(err => (console.log({ err })));
        if (response.data.status === true) {
            setBadgeCount(0);
            // toast.success("Notification marked as read successfully");
        }
    }
    return (
        <div className={styles.navigation_main_wrapper}>
            <div className={styles.web_navigation_wrapper}>
                <Navbar
                    variant="dark"
                    id="navbar"
                    sticky="top"
                    className={styles.nav_navbar}
                >
                    <div className={styles.web_navigation_main}>
                        <Container className={styles.web_navigation_content}>
                            <Link href="/doctor">
                                <Image
                                    className="header_logo-image"
                                    src="/images/logo/logo-with-quote.png"
                                    id="icon"
                                    alt="HealthierU Logo"
                                    width={190}
                                    height={50}
                                />
                            </Link>
                            <Nav>
                                {
                                    <div>
                                        <div className={styles.navMenuWrapper}>
                                            <div className={styles.navMenuContainer}>
                                                <ul className={styles.navMenuUl}>
                                                    <li>
                                                        <Link href="/doctor">Home</Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href="#"
                                                            onClick={handleMyPortalDropdown}
                                                            className={styles.myPortalLink}
                                                        >
                                                            My Portal
                                                            <ArrowDropDownIcon />
                                                        </Link>
                                                        <Menu
                                                            id="simple-menu"
                                                            anchorEl={anchorElMyPortal}
                                                            keepMounted
                                                            open={Boolean(anchorElMyPortal)}
                                                            onClose={handleClose}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'center',
                                                            }}
                                                            className="profile-menu"
                                                        >
                                                            <div onClick={handleClose}>
                                                                <Link
                                                                    href="/doctor/appointment"
                                                                    className="dropdown-item"
                                                                >
                                                                    <MenuItem>My Calendar</MenuItem>
                                                                </Link>
                                                                <Link
                                                                    href="/doctor/my-patients"
                                                                    className="dropdown-item"
                                                                >
                                                                    <MenuItem>My Patients</MenuItem>
                                                                </Link>
                                                                <Link
                                                                    href="/doctor/chat"
                                                                    className="dropdown-item"
                                                                >
                                                                    <MenuItem>Chat</MenuItem>
                                                                </Link>
                                                            </div>
                                                        </Menu>
                                                    </li>

                                                    <li>
                                                        <div className={cls(styles.navbarCollapse)}>
                                                            <div
                                                                className={cls(
                                                                    styles.headerNavbar,
                                                                    styles.notificationNavbar
                                                                )}
                                                            >
                                                                <IconButton
                                                                    aria-label="show 17 new notifications"
                                                                    color="inherit"
                                                                    type="button"
                                                                    data-toggle="dropdown"
                                                                >
                                                                    <Badge
                                                                        badgeContent={badgeCount}
                                                                        color="secondary"
                                                                        onClick={handleNotifMenuDropdown}
                                                                    >
                                                                        <NotificationsIcon />
                                                                    </Badge>
                                                                </IconButton>
                                                                <Menu
                                                                    id="simple-menu"
                                                                    anchorEl={anchorNotifMenu}
                                                                    keepMounted
                                                                    open={Boolean(anchorNotifMenu)}
                                                                    onClose={handleClose}
                                                                    transformOrigin={{
                                                                        vertical: 'top',
                                                                        horizontal: 'center',
                                                                    }}
                                                                    className="profile-menu"
                                                                >
                                                                    <div
                                                                        className={cls(styles.notificationMenu)}
                                                                        style={{ width: '350px', left: '-160px' }}
                                                                    >
                                                                        <NotificationMenuDoctor />
                                                                    </div>
                                                                </Menu>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <Link href="#">
                                                            {currentUser?.picture ? (
                                                                <Image
                                                                    id="profilePicId"
                                                                    src={currentUser.picture}
                                                                    alt=""
                                                                    onClick={handleClick}
                                                                    className={styles.profileIcon}
                                                                    width={35}
                                                                    height={35}
                                                                />
                                                            ) : (
                                                                <Image
                                                                    src="/images/svg/profile.svg"
                                                                    alt=""
                                                                    onClick={handleClick}
                                                                    className={styles.profileIcon}
                                                                    width={35}
                                                                    height={35}
                                                                />
                                                            )}
                                                        </Link>
                                                        <Menu
                                                            id="simple-menu"
                                                            anchorEl={anchorEl}
                                                            keepMounted
                                                            open={Boolean(anchorEl)}
                                                            onClose={handleClose}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'center',
                                                            }}
                                                            className="profile-menu"
                                                        >
                                                            <div onClick={handleClose}>
                                                                <Link
                                                                    href="/doctor/profile"
                                                                    style={{ textDecoration: 'none' }}
                                                                >
                                                                    <MenuItem>Profile</MenuItem>
                                                                </Link>
                                                                <Link
                                                                    href="/doctor/changepassword"
                                                                    style={{ textDecoration: 'none' }}
                                                                >
                                                                    <MenuItem>Change Password</MenuItem>
                                                                </Link>
                                                                <Link
                                                                    href="/"
                                                                    onClick={handleLogout}
                                                                    style={{ textDecoration: 'none' }}
                                                                >
                                                                    <MenuItem>Logout</MenuItem>
                                                                </Link>
                                                            </div>
                                                        </Menu>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </Nav>
                        </Container>
                    </div>
                </Navbar>
            </div>
            <div className={styles.mobileNavHeader}>
                <Link href="/" className={styles.mrAuto}>
                    <Image
                        src="/images/logo/logo-with-quote.png"
                        id="icon"
                        alt="HealthierU Logo"
                        width={70}
                        height={70}
                    />
                </Link>
                <input className={styles.menuBtn} type="checkbox" id="menu-btn" />
                <label className={styles.menuIcon} htmlFor="menu-btn">
                    <span className={styles.navicon}></span>
                </label>
                <ul className={styles.menu}>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            onClick={handleMyPortalDropdown}
                            className={styles.myPortalLink}
                        >
                            My Portal
                            <ArrowDropDownIcon />
                        </Link>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorElMyPortal}
                            keepMounted
                            open={Boolean(anchorElMyPortal)}
                            onClose={handleClose}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            className="profile-menu"
                        >
                            <div onClick={handleClose}>
                                <Link
                                    href="/doctor/appointment"
                                    className="dropdown-item"
                                >
                                    <MenuItem>My Calendar</MenuItem>
                                </Link>
                                <Link
                                    href="/doctor/my-patients"
                                    className="dropdown-item"
                                >
                                    <MenuItem>My Patients</MenuItem>
                                </Link>
                                <Link
                                    href="/doctor/chat"
                                    className="dropdown-item"
                                >
                                    <MenuItem>Chat</MenuItem>
                                </Link>
                            </div>
                        </Menu>
                    </li>

                    <li>
                        <div className={cls(styles.navbarCollapse)} onClick={() => markAsReadNotificationHandler()}>
                            <div
                                className={cls(styles.headerNavbar, styles.notificationNavbar)}
                            >
                                <IconButton
                                    aria-label="show 17 new notifications"
                                    color="inherit"
                                    type="button"
                                    data-toggle="dropdown"
                                >
                                    <Badge
                                        badgeContent={badgeCount}
                                        color="secondary"
                                        onClick={handleNotifMenuDropdown}
                                    >
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorNotifMenu}
                                    keepMounted
                                    open={Boolean(anchorNotifMenu)}
                                    onClose={handleClose}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                    className="profile-menu"
                                >
                                    <div
                                        className={cls(styles.notificationMenu)}
                                        style={{ width: '350px', left: '-160px' }}
                                    >
                                        <NotificationMenuDoctor />
                                    </div>
                                </Menu>
                            </div>
                        </div>
                    </li>
                    <li>
                        <Link href="#">
                            {currentUser?.picture ? (
                                <Image
                                    id="profilePicId"
                                    src={currentUser.picture}
                                    alt=""
                                    onClick={handleClick}
                                    className={styles.profileIcon}
                                    width={35}
                                    height={35}
                                />
                            ) : (
                                <Image
                                    src="/images/svg/profile.svg"
                                    alt=""
                                    onClick={handleClick}
                                    className={styles.profileIcon}
                                    width={35}
                                    height={35}
                                />
                            )}
                        </Link>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            className="profile-menu"
                        >
                            <div onClick={handleClose}>
                                <Link
                                    href="/doctor/profile"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <MenuItem>Profile</MenuItem>
                                </Link>
                                <Link
                                    href="/doctor/changepassword"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <MenuItem>Change Password</MenuItem>
                                </Link>
                                <Link
                                    href="/"
                                    onClick={handleLogout}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <MenuItem>Logout</MenuItem>
                                </Link>
                            </div>
                        </Menu>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default DoctorHeader