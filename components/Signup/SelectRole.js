import Image from 'next/image';
import React from 'react';


const SelectRole = (props) => {
    return (
        <div className="wrapper" style={props.style}>
            <div id="user-type">
                {/* <!-- Tabs Titles --> */}
                <h2 className="user-title">Who are you?</h2>
                <br />
                {/* <!-- Login Form --> */}

                <div className="wyr-form-box">
                    <div className="row">
                        <div className="col-md-4">
                            <br />
                            <button
                                className="btn no-outline role"
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
                                className="btn no-outline role"
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
                                className="btn no-outline role"
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
