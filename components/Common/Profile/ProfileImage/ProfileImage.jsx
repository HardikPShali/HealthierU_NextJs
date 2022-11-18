import React from 'react';
import Image from 'next/image';
import styles from './ProfileImage.module.css';
import cls from 'classnames';

const ProfileImage = ({ currentPatient, onEdit }) => {
  return (
    <div className="d-flex flex-column align-items-center text-center mt-5 mb-3">
      {currentPatient && currentPatient.picture ? (
        <Image
          src={currentPatient.picture}
          alt=""
          id="profile-pic"
          width={150}
          height={150}
        />
      ) : (
        <Image
          src="/images/default_image.jpg"
          alt=""
          id="profile-pic"
          width={150}
          height={150}
        />
      )}
      <div className="d-flex flex-column mt-4">
        <div className={styles.profileName}>
          {currentPatient && currentPatient.firstName}
        </div>
        <p id="description">{currentPatient.email}</p>
        <div className="mt-1">
          <button
            className={cls('btn', 'btn-primary', styles.requestEdit)}
            onClick={() => {
              // setDisplay({ ...display, profile: 'none', editProfile: 'block' })
              onEdit();
              //   setToggleProfile({ ...toggleProfile, editProfile: true });
            }}
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* <br /> */}

      <br />
    </div>
  );
};

export default ProfileImage;
