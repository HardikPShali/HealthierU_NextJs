import { Navbar, Container } from 'react-bootstrap'; //NavDropdown, Row, Col, Nav
import Link from 'next/link';
import Image from 'next/image';
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

const PatientHeader = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const currentUser = user?.profileDetails;

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElMyPortal, setAnchorElMyPortal] = useState(null);

  //NOTIFICATION BADGE COUNT LOGIC
  const [badgeCount, setBadgeCount] = useState(0);

  const handleMyPortalDropdown = (event) => {
    setAnchorElMyPortal(event.currentTarget);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElMyPortal(null);
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
    <div>
      <Navbar variant="dark" expand="lg" id="navbar" sticky="top">
        <Container className="p-0">
          <Link href="/patient" className="m-0 mr-auto">
            <Image
              src="/images/logo/logo-with-quote.png"
              id="icon"
              alt="HealthierU Logo"
              width={190}
              height={50}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {
              <>
                <Link href="/patient" style={{ margin: '5px' }}>
                  Home
                </Link>
                <Link href="#" onClick={handleMyPortalDropdown}>
                  My Portal
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
                    <Link
                      href="/patient/myappointment"
                      className="dropdown-item"
                    >
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
                {
                  <div>
                    <div className="dropdown headerNavbar notification-Navbar">
                      <IconButton
                        aria-label="show 17 new notifications"
                        color="inherit"
                        type="button"
                        data-toggle="dropdown"
                      >
                        <Badge badgeContent={badgeCount} color="secondary">
                          <NotificationsIcon />
                        </Badge>
                      </IconButton>
                      <div
                        className="dropdown-menu notification-Menu"
                        style={{ width: '350px', left: '-160px' }}
                      >
                        {/* <NotificationMenuPatient /> */}
                      </div>
                    </div>
                  </div>
                }
              </>
            }
            <Link href="#">
              {currentUser?.picture ? (
                <Image
                  id="profilePicId"
                  src={currentUser.picture}
                  alt=""
                  onClick={handleClick}
                  className="profile-icon"
                  width={35}
                  height={35}
                />
              ) : (
                <Image
                  src="/images/svg/profile.svg"
                  alt=""
                  onClick={handleClick}
                  className="profile-icon"
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
              // anchorOrigin={{
              //     vertical: 'bottom',
              //     horizontal: 'center',
              // }}
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
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default PatientHeader;
