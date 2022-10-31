import React from 'react';
import styles from './Loader.module.css';

const TransparentLoader = () => {
  return (
    <div id="transparent-loader" className="lds-css ng-scope">
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
export default TransparentLoader;
