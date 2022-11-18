import React from 'react';
import styles from './ProfileRow.module.css';
import Image from 'next/image';

const ProfileRow = ({ icon, title, value }) => {
  return (
    <div className="d-flex align-items-start mb-3">
      <Image
        src={icon}
        alt="icons"
        className={styles.profileColumnIcon}
        width={50}
        height={50}
      />
      <div className="d-flex flex-column align-items-start">
        <div className={styles.profileColumnTitle}>{title}</div>
        <div className={styles.profileColumnValue}>{value}</div>
      </div>
    </div>
  );
};

export default ProfileRow;
