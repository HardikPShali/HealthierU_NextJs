import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { Container, Row, Col } from 'react-bootstrap';
import SearchBarComponent from '../../Common/SearchAndFilter/SearchBarComponent';
import FilterBoxComponent from '../../Common/SearchAndFilter/FilterBoxComponent';
import styles from './MyDoctor.module.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from 'next/link';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {
  getLikedDoctorByPatientId,
  getSearchDataAndFilter,
} from '../../../lib/service/FrontendApiServices';
import {
  doctorListLimit,
  doctorListLimitNonPaginated,
} from '../../../lib/utils/configurations';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../lib/redux/userSlice';

const rightArrow = <ArrowRightIcon />;

const MyDoctor = () => {
  const user = useSelector(selectUser);
  const patientId = user.profileDetails.id;

  const [users, setUser] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [filterData, setFilterData] = useState(users);
  const [offset, setOffset] = useState(0);
  const [likedOffset, setLikedOffset] = useState(0);
  const [searchText, setSearchText] = useState('');

  const [isFiltered, setIsFiltered] = useState(false);
  const [checkLoadMoreDoctors, setCheckLoadMoreDoctors] = useState(true);

  const [display, setDisplay] = useState({
    doctor: 'block',
    appointment: 'none',
    like: 'none',
    unlike: 'block',
    suggestion: 'none',
  });

  const loadDoctors = async (searchText) => {
    const data = {
      searchKeyword: searchText,
      specialitiesId: [],
      countryIds: [],
      languageName: [],
      gender: [],
      // docStartTime: new Date(),
      docEndTime: null,
      rateMin: 0.0,
      rateMax: null,
    };

    const result = await getSearchDataAndFilter(
      // patientId,
      data,
      0,
      doctorListLimit,
      patientId
    ).catch((err) => {
      if (err.response?.status === 500 || err.response?.status === 504) {
        setLoading(false);
      }
    });

    console.log({ result });

    if (result?.data.data.doctors && result?.data.data.doctors.length > 0) {
      setDoctor(result.data.data);
      setFilterData(result.data.data.doctors);
      setOffset(1);
    } else if (result?.data.data.doctors.length === 0) {
      setFilterData([]);
      setDoctor('');
      // setTransparentLoading(false);
    } else if (result.status === 204) {
      setFilterData([]);
      setDoctor('');
      // setTransparentLoading(false);
    }
  };

  const loadMore = async () => {
    if (searchText) {
      setTransparentLoading(true);
      const res = await getSearchData(searchText, offset, doctorListLimit);
      if (res.data.currentPage == res.data.totalPages) {
        setCheckLoadMoreDoctors(false);
      }
      if (
        res.status === 200 &&
        res.data?.doctors &&
        res.data?.doctors.length > 0
      ) {
        var existingUsersList = filterData;
        res.data &&
          res.data.doctors.map((newData) => {
            existingUsersList.push(newData);
            return newData;
          });
        setOffset(offset + 1);
        setFilterData(existingUsersList);
        setTransparentLoading(false);
      } else if (res.status === 204) {
        setTransparentLoading(false);
      }
    } else {
      const data = {
        searchKeyword: '',
        specialitiesId: [],
        countryIds: [],
        languageName: [],
        gender: [],
        // docStartTime: new Date(),
        docEndTime: null,
        rateMin: 0.0,
        rateMax: null,
      };

      const result = await getSearchDataAndFilter(
        // patientId,
        data,
        offset,
        doctorListLimit,
        patientId
      ).catch((err) => {
        if (err.response.status === 500 || err.response.status === 504) {
          setLoading(false);
        }
      });

      console.log({ result });

      if (result.data.data.doctors && result.data.data.doctors.length > 0) {
        let existingUsersList = users;
        result.data.data &&
          result.data.data.doctors.map((newData) => {
            existingUsersList.push(newData);
            return newData;
          });
        setDoctor(result.data.data);
        setFilterData(result.data.data.doctors);
        setOffset(offset + 1);
      }
    }
  };

  const getAllLikedDoctors = async () => {
    // console.log("getAllLikedDoctors trigerred");
    // setTransparentLoading(true);
    setDisplay({ ...display, like: 'block', unlike: 'none' });
    const res = await getLikedDoctorByPatientId(patientId, 0).catch((err) => {
      if (err.response.status === 500 || err.response.status === 504) {
        setTransparentLoading(false);
      }
    });
    console.log({ res });
    if (res && res.data) {
      const doctorArray = [];
      res.data.length > 0 &&
        res.data.map((value, index) => {
          if (value.doctor) {
            doctorArray.push(value.doctor);
          }
        });
      setFilterData(doctorArray);
      setIsFiltered(true);
      setLikedOffset(likedOffset + 1);
      // setTransparentLoading(false);
    }
  };

  const allDoctorData = () => {
    // console.log("allDoctorData trigerred");
    // history.go(0);
    if (history.go(0) === true) {
      setFilterData(users);
      setDoctor(users[0]);
      const docId = users[0].id;
      // getInValidAppointments(docId);
      setLikedOffset(0);
      setDisplay({ ...display, like: 'none', unlike: 'block' });
    }
  };

  // SEARCH DOCTOR
  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 700);
    };
  };

  const handleSearchInputChange = (searchValue) => {
    console.log('searchValue :::::::', searchValue);
    if (searchValue === '') {
      setSearchText('');
      setIsFiltered(false);
      setFilterData(users);
      // setAvailability([]);
      // setAppointmentSlot([]);
      setOffset(1);
      setDisplay({ ...display, suggestion: 'none' });
    } else {
      setSearchText(searchValue);
      setIsFiltered(true);
      setDisplay({ ...display, suggestion: 'block' });
    }
  };

  const handleSearchData = async (searchValue) => {
    // handleSearchInputChange(searchValue);
    loadDoctors(searchValue);
  };

  const handleDebounceSearch = debounce(handleSearchData);

  useEffect(() => {
    loadDoctors(searchText);
  }, []);

  return (
    <div>
      <Container>
        <Row>
          <Col md={6} lg={4}>
            <div className={styles.doctorList}>
              <div className={styles.toggleBar}>
                <SearchBarComponent
                  type="text"
                  placeholder="Search Doctor"
                  value={searchText}
                  onChange={(value) => {
                    handleSearchInputChange(value);
                  }}
                  onCancelSearch={() => handleSearchInputChange('')}
                  onRequestSearch={() => handleSearchData(false)}
                  onKeyDown={(e) =>
                    e.keyCode === 13 ? handleSearchData(true) : ''
                  }
                />
                <FilterBoxComponent />
                <IconButton
                  style={{ display: display.unlike }}
                  onClick={() => getAllLikedDoctors()}
                >
                  <FavoriteBorderIcon />
                </IconButton>
                <IconButton
                  style={{ display: display.like }}
                  onClick={() => allDoctorData()}
                >
                  <FavoriteIcon />
                </IconButton>
              </div>

              {/* <div>
                <Link href="/patient/myappointment" id="menuLinks">
                  <div id="card" className="card">
                    <div className="card-body">
                      My Appointments <span id="arrowright">{rightArrow}</span>
                    </div>
                  </div>
                </Link>
              </div> */}

              <div className={styles.cardList}>
                {filterData && filterData.length > 0 ? (
                  <ImageList
                    sx={{ width: 400, height: 420 }}
                    // style={{ overflowX: 'hidden' }}
                  >
                    {filterData.map(
                      (user, index) =>
                        user &&
                        user.activated && (
                          <ImageListItem
                            key={user.userId}
                            cols={1}
                            rows={1}
                            // style={{ width: '148px', marginLeft: 18 }}
                          >
                            {user.picture && (
                              <Image
                                src={
                                  user.picture.includes('https')
                                    ? user.picture
                                    : '/images/default_image.jpg'
                                }
                                alt="doc-image"
                                loading="lazy"
                                height={168}
                                width={188}
                              />
                            )}

                            <ImageListItemBar
                              title={
                                <span>
                                  {user.salutation} {user.firstName}
                                </span>
                              }
                              subtitle={
                                <ul className="list--tags">
                                  {user.specialities &&
                                    user.specialities.map(
                                      (speciality, index) => (
                                        <li key={index}>{speciality.name}</li>
                                      )
                                    )}
                                </ul>
                              }
                              actionIcon={
                                <IconButton
                                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                  aria-label={`info about`}
                                >
                                  <InfoIcon />
                                </IconButton>
                              }
                            />
                          </ImageListItem>
                        )
                    )}
                  </ImageList>
                ) : (
                  <div>
                    <center>No Doctor Found ...</center>
                  </div>
                )}
                {filterData && !isFiltered && checkLoadMoreDoctors && (
                  <>
                    <div
                      className="text-center"
                      style={{ display: display.unlike, marginTop: '5px' }}
                    >
                      <button
                        className="btn btn-outline-secondary"
                        onClick={loadMore}
                        style={{ boxShadow: 'none' }}
                      >
                        Load More
                      </button>
                    </div>
                    {/* <div
                      className="text-center"
                      style={{ display: display.like }}
                    >
                      <button
                        className="btn btn-outline-secondary"
                        onClick={loadMoreLike}
                      >
                        Load More
                      </button>
                    </div> */}
                  </>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MyDoctor;
