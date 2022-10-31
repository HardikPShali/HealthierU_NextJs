import React from 'react';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div id="loader" className="lds-css ng-scope">
      <div
        style={{ width: '100%', height: '100%' }}
        className={styles.ldsDoubleRing}
      >
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
export default Loader;
