import React, { useState, useRef, useEffect } from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import IconButton from '@mui/material/IconButton';
import { ValidatorForm } from 'react-material-ui-form-validator';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import moment from 'moment';
const FilterComponent = (props) => {
    const ref = useRef();

    const [filter, setFilter] = useState('');

    const [filterValues, setFilterValues] = useState({
        resultType: '',
        startTime: '',
        endTime: '',
        labName: '',
        doctorName: ''
    });

    const {
        resultType,
        startTime,
        endTime,
        labName,
        doctorName
    } = filterValues;

    const [endtimeChecked, setEndTimeChecked] = useState(false);

    const toggleFilterBox = () => {
        setFilter(filter ? false : true);
    };

    const handleCheckbox = (checked) => {
        if (checked === false) {
            setFilterValues({ ...filterValues, endTime: '' });
            setEndTimeChecked(checked);
        } else {
            setEndTimeChecked(checked);
        }
    };

    const clearFilter = () => {
        setFilterValues({

            startTime: '',
            endTime: '',
            resultType: ''
        });
        props.updatedFilter({});
    };


    // useEffect(() => {
    //     props.updatedFilter(filterValues);
    //     console.log("filterValues", filterValues);
    // }, [filterValues])

    return (
        <div style={{ marginRight: '15px' }}>
            <IconButton
                onClick={() => toggleFilterBox()}
                style={{
                    backgroundColor: `${startTime || endTime
                        ? '#F6CEB4'
                        : ''
                        }`,
                    color: `${startTime || endTime
                        ? '#00d0cc'
                        : ''
                        }`,
                }}
            >
                <TuneIcon />
            </IconButton>
            {filter && (
                <div className="medicalrecord-filter-box" ref={ref}>
                    <ValidatorForm
                        onSubmit={() => {props.updatedFilter(filterValues);setFilter(false)}}
                        onError={(error) => console.log(error)}
                    >
                        <div className="medicalrecord-filter-body">
                            <div className="row m-0">
                                <div className="col-md-12 col-xs-12">
                                    <p>Prescription Date:</p>
                                    <div className="row">
                                        <div className="col-md-6 col-xs-6 pr-1">
                                            <TextField
                                                type="date"
                                                variant="filled"
                                                onChange={(e) =>
                                                    setFilterValues({
                                                        ...filterValues,
                                                        startTime: e.target.value === '' ? '' : new Date(e.target.value),
                                                    })
                                                }
                                                className="filterDate"
                                                // inputProps={{
                                                //     min: moment(new Date()).format('YYYY-MM-DD'),
                                                // }}
                                                value={moment(new Date(startTime)).format(
                                                    'YYYY-MM-DD'
                                                )}
                                                onKeyDown={(e) => e.preventDefault()}
                                            />
                                        </div>
                                        <div className="col-md-6 col-xs-6 pl-1">
                                            <TextField
                                                type="date"
                                                variant="filled"
                                                onChange={(e) =>
                                                    setFilterValues({
                                                        ...filterValues,
                                                        endTime: e.target.value === '' ? '' : new Date(e.target.value),
                                                    })
                                                }
                                                className="filterDate"
                                                inputProps={{
                                                    min: moment(new Date(startTime)).format(
                                                        'YYYY-MM-DD'
                                                    ),
                                                }}
                                                value={moment(new Date(endTime)).format(
                                                    'YYYY-MM-DD'
                                                )}
                                                disabled={endtimeChecked ? false : true}
                                                onKeyDown={(e) => e.preventDefault()}
                                            />
                                        </div>
                                        <div className="col-md-12 col-xs-12">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        color="primary"
                                                        checked={endtimeChecked}
                                                        disabled={startTime ? false : true}
                                                        onChange={(e) => handleCheckbox(e.target.checked)}
                                                        name="checkedA"
                                                    />
                                                }
                                                label="Include End Date."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="filter-action">
                            <div className="row m-0 mt-1">
                                <div className="col-md-6 col-6">
                                    <button
                                        type="button"
                                        onClick={() => clearFilter()}
                                        className="btn btn-primary reset-btn"
                                    >
                                        Clear All
                                    </button>
                                </div>
                                <div className="col-md-6 col-6">
                                    <button type="submit" className="btn btn-primary apply-btn">
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                    </ValidatorForm>
                </div>
            )}
        </div>
    );
};

export default FilterComponent;
