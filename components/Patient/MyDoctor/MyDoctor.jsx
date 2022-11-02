import React, { useState } from 'react';
import Image from 'next/image';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { Container, Row, Col } from 'react-bootstrap';
import PatientHeader from '../Header/PatientHeader';
import SearchBarComponent from '../../Common/SearchAndFilter/SearchBarComponent';
import FilterBoxComponent from '../../Common/SearchAndFilter/FilterBoxComponent';
import styles from './MyDoctor.module.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from 'next/link';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const rightArrow = <ArrowRightIcon />;

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    author: '@hjrc33',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    author: '@katie_wasserman',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    author: '@silverdalex',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    author: '@shelleypauls',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    author: '@peterlaster',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs',
    cols: 2,
  },
];

const MyDoctor = () => {
  const [display, setDisplay] = useState({
    doctor: 'block',
    appointment: 'none',
    like: 'none',
    unlike: 'block',
    suggestion: 'none',
  });

  const getAllLikedDoctors = () => {
    setDisplay({ ...display, like: 'block', unlike: 'none' });
  };

  const allDoctorData = () => {
    setDisplay({ ...display, like: 'none', unlike: 'block' });
  };

  return (
    <div>
      <Container>
        <Row>
          <Col md={6} lg={4}>
            <div className={styles.doctorList}>
              <div className={styles.toggleBar}>
                <SearchBarComponent />
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

              <div>
                <Link href="/patient/myappointment" id="menuLinks">
                  <div id="card" className="card">
                    <div className="card-body">
                      My Appointments <span id="arrowright">{rightArrow}</span>
                    </div>
                  </div>
                </Link>
              </div>

              <div className={styles.cardList}>
                <ImageList
                  sx={{ width: 400, height: 420 }}
                  style={{ overflowX: 'hidden' }}
                >
                  <ImageListItem
                    key="Subheader"
                    cols={2}
                    style={{ width: '148px' }}
                  >
                    {/* <ListSubheader component="div">December</ListSubheader> */}
                  </ImageListItem>
                  {itemData.map((item) => (
                    <ImageListItem
                      key={item.img}
                      style={{ width: '148px', marginLeft: 18 }}
                    >
                      <Image
                        src={`${item.img}?w=248&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                        height={148}
                        width={148}
                      />
                      <ImageListItemBar
                        title={item.title}
                        subtitle={item.author}
                        actionIcon={
                          <IconButton
                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            aria-label={`info about ${item.title}`}
                          >
                            <InfoIcon />
                          </IconButton>
                        }
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MyDoctor;
