import Image from 'next/image';
import React from 'react';
import styles from './Signup.module.css';
import cls from 'classnames'

const SelectRole = (props) => {
    return (
        <div className={styles.wrapper} style={props.style}>
            <div className={styles.userType}>
                {/* <!-- Tabs Titles --> */}
                <h2 className={styles.userTitle}>Who are you?</h2>
                <br />
                {/* <!-- Login Form --> */}

                <div className={styles.userRoleFormBox}>
                    <div className="row">
                        <div className="col-md-4">
                            <br />
                            <button
                                className={cls("btn", "no-outline", styles.role)}
                                onClick={() => props.handleDoctorClick()}
                            >
                                <Image
                                    src='/images/svg/doctorSVG.svg'
                                    alt=""
                                    className="sub nopadd"
                                    width={50}
                                    height={50}
                                />
                                <br />
                                Provider
                            </button>
                        </div>
                        <div className="col-md-4">
                            <br />
                            <button
                                className={cls("btn", "no-outline", styles.role)}
                                onClick={() => props.handlePatientClick()}
                            >
                                <Image
                                    src='/images/svg/patientSVG.svg'
                                    alt=""
                                    className="sub nopadd"
                                    width={50}
                                    height={50}
                                />
                                <br />
                                Individual
                            </button>
                        </div>
                        <div className="col-md-4">
                            <br />
                            <button
                                className={cls("btn", "no-outline", styles.role)}
                                onClick={() => props.handlePhysicaltrainerClick()}
                            >
                                <Image
                                    src='/images/svg/physicaltrainerSVG.svg'
                                    alt=""
                                    className="sub nopadd"
                                    width={50}
                                    height={50}
                                />
                                <br />
                                Employer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SelectRole;
