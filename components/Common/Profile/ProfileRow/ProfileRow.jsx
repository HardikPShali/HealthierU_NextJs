import React from 'react';
import styles from './ProfileRow.module.css';
import Image from 'next/image';
const ProfileRow = ({ icon, title, value }) => {
  return (
    <div className="d-flex align-items-start mb-3">
      <Image src={icon} alt="icons" className={styles.profile_column_icon} />
      <div className="d-flex flex-column align-items-start">
        <div className={styles.profile_column_title}>{title}</div>
        <div className={styles.profile_column_value}>{value}</div>
      </div>
    </div>
  );
};

export default ProfileRow;
