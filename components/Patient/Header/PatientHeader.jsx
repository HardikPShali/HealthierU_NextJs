import { Navbar, Container } from 'react-bootstrap'; //NavDropdown, Row, Col, Nav
import Link from 'next/link';
import Image from 'next/image';
import Nav from 'react-bootstrap/Nav';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../../lib/redux/userSlice';
import { useState, useEffect } from 'react';
import {
  getUnreadNotificationsCount,
  putMarkAsReadNotification,
} from '../../../lib/service/FrontendApiServices';
import styles from './PatientHeader.module.css';
import cls from 'classnames';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NotificationMenuPatient from '../NotificationsMenu/NotificationsMenuPatient';

const PatientHeader = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const currentUser = user?.profileDetails;

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElMyPortal, setAnchorElMyPortal] = useState(null);
  const [anchorNotifMenu, setAnchorNotifMenu] = useState(null);

  //NOTIFICATION BADGE COUNT LOGIC
  const [badgeCount, setBadgeCount] = useState(0);

  const handleMyPortalDropdown = (event) => {
    setAnchorElMyPortal(event.currentTarget);
  };

  const handleNotifMenuDropdown = (event) => {
    setAnchorNotifMenu(event.currentTarget);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElMyPortal(null);
    setAnchorNotifMenu(null);
  };

  const unreadNotificationCountHandler = async () => {
    const userId = currentUser.userId;
    const size = 10;

    const response = await getUnreadNotificationsCount(userId, size).catch(
      (err) => console.log({ err })
    );

    // console.log({ response });

    const notificationsCount = response?.data?.data;
    // console.log({ notificationCount });

    if (notificationsCount > 0) {
      setBadgeCount(notificationsCount);
    } else {
      setBadgeCount(0);
    }
  };

  useEffect(() => {
    unreadNotificationCountHandler();
    const interval = setInterval(() => {
      unreadNotificationCountHandler();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  //   //MARK AS READ NOTIFICATION LOGIC
  //   const markAsReadNotificationHandler = async () => {
  //     const user = cookies.get('profileDetails');
  //     const userId = user.userId;

  //     const response = await putMarkAsReadNotification(userId).catch((err) =>
  //       console.log({ err })
  //     );

  //     if (response.data.status === true) {
  //       setBadgeCount(0);
  //       // toast.success("Notification marked as read successfully");
  //     }
  //   };

  const handleLogout = () => {
    dispatch(logout());
  };

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
              <Link href="/">
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
                                  href="/patient/mydoctor"
                                  className="dropdown-item"
                                >
                                  <MenuItem>My Doctors</MenuItem>
                                </Link>
                                <Link
                                  href="/patient/myappointment"
                                  className="dropdown-item"
                                >
                                  <MenuItem>My Appointments</MenuItem>
                                </Link>
                                <Link
                                  href="/patient/document"
                                  className="dropdown-item"
                                >
                                  <MenuItem>My Records</MenuItem>
                                </Link>
                                <Link
                                  href="/patient/health-assessment"
                                  className="dropdown-item"
                                >
                                  <MenuItem>Health Assessment Report</MenuItem>
                                </Link>
                                <Link
                                  href="/patient/chat"
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
                                    <NotificationMenuPatient />
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
                                  href="/patient/profile"
                                  style={{ textDecoration: 'none' }}
                                >
                                  <MenuItem>Profile</MenuItem>
                                </Link>
                                <Link
                                  href="/patient/changepassword"
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
                <Link href="/patient/mydoctor" className="dropdown-item">
                  <MenuItem>My Doctors</MenuItem>
                </Link>
                <Link href="/patient/myappointment" className="dropdown-item">
                  <MenuItem>My Appointments</MenuItem>
                </Link>
                <Link href="/patient/document" className="dropdown-item">
                  <MenuItem>My Records</MenuItem>
                </Link>
                <Link
                  href="/patient/health-assessment"
                  className="dropdown-item"
                >
                  <MenuItem>Health Assessment Report</MenuItem>
                </Link>
                <Link href="/patient/chat" className="dropdown-item">
                  <MenuItem>Chat</MenuItem>
                </Link>
              </div>
            </Menu>
          </li>

          <li>
            <div className={cls(styles.navbarCollapse)}>
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
                    <NotificationMenuPatient />
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
                  href="/patient/profile"
                  style={{ textDecoration: 'none' }}
                >
                  <MenuItem>Profile</MenuItem>
                </Link>
                <Link
                  href="/patient/changepassword"
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
  );
};

export default PatientHeader;
