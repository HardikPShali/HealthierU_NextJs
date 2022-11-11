import React, { useState, useCallback } from 'react' //Component, useEffect
import Cropper from "react-easy-crop";
import { Modal } from 'react-bootstrap';
import * as imageConversion from 'image-conversion';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider'
import { withStyles } from '@mui/styles'
import getCroppedImg from './cropImage'
import { styles } from './styles'
import Image from 'next/Image'
import TransparentLoader from '../Loader/TransparentLoader';
import previewImg from '../../../public/images/default_image.jpg';
import profileEdit from '../../../public/images/icons used/profile_edit.svg'
import '../Landing/LandingPage.module.css'
const ImageCropper = (props) => {
    const { imageUrl, setProfilePicture, classes } = props;
    const [transparentLoading, setTransparentLoading] = useState(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [rotation, setRotation] = useState(0)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [show, setModel] = useState(false);
    const [uploadImageUrlBase64, setUploadImageUrlBase64] = useState(null);
    const [preview, setPreview] = useState()
    const uniqueId = parseInt(Date.now() + Math.random());

    const onSaveImageCrop = (imageCrop) => {
        setModel(false)
        setTransparentLoading(true);

        imageConversion.compressAccurately(imageCrop, 300).then(res => {
            var compressdImageFile = new File([res], imageCrop.name || 'Profile.jpg');
            setTransparentLoading(false);
            setErrorMsg({ ...errorMsg, msg: '' });
            setProfilePicture(compressdImageFile);
            const objectUrl = URL.createObjectURL(compressdImageFile)
            setPreview(objectUrl)
        }).catch(function (_error) {
            setErrorMsg({ ...errorMsg, msg: 'Something went wrong in compression.' });
        });
    }

    const [errorMsg, setErrorMsg] = useState({
        msg: ''
    });
    const { msg } = errorMsg;



    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const handleImageChange = (e) => {
        e.stopPropagation();
        setTransparentLoading(true);
        const imageFile = e.target.files[0];
        if (!imageFile) return setTransparentLoading(false);
        if (!imageFile.name.match(/\.(jpg|jpeg|png|PNG|JPG|JPEG)$/)) {
            setErrorMsg({ ...errorMsg, msg: 'Image can only be PNG or JPG' });
            setTimeout(() => setTransparentLoading(false), 1000);
        }
        else {
            if (e.target.files && e.target.files.length > 0) {
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.addEventListener("load", () => {
                    setUploadImageUrlBase64(reader.result);
                    setTransparentLoading(false);
                    setModel(true);
                });
            }
        }
    }


    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                uploadImageUrlBase64,
                croppedAreaPixels,
                rotation
            )
            onSaveImageCrop(croppedImage)
        } catch (e) {
            console.error(e)
        }
    }, [croppedAreaPixels, rotation])





    return (
        <>
            <div className="small-12 medium-2 large-2 columns m-auto">
                <div className="circle upload-button" style={{ cursor: 'pointer' }}>
                    {/* <!-- User Profile Image --> */}
                    <img className="profile-pic" src={preview ? preview : imageUrl ? imageUrl : previewImg} alt="" />
                </div>
            </div>
            {props.role === 'Doctor' ? <div className='profile-edit-icon-doctor profile-edit-icon-doctor-safari'>
                <label htmlFor={uniqueId}>
                    <span className="p-image">
                        <Image src={profileEdit} />
                        {/* <AddAPhotoIcon className="upload-button" /> */}
                        <input id={uniqueId} className="file-upload" type="file" accept="image/*" onChange={e => handleImageChange(e)}
                            variant="filled" onClick={(e) => e.stopPropagation()} />
                    </span>
                </label>
            </div>
                :
                props.role === 'Admin' ? <div className='profile-edit-icon-admin'>
                    <label htmlFor={uniqueId}>
                        <span className="p-image">
                            <img src={profileEdit} />
                            {/* <AddAPhotoIcon className="upload-button" /> */}
                            <input id={uniqueId} className="file-upload" type="file" accept="image/*" onChange={e => handleImageChange(e)}
                                variant="filled" onClick={(e) => e.stopPropagation()} />
                        </span>
                    </label>
                </div>
                    :
                    props.role === 'Patient' ? <div className='profile-edit-icon-patient'>
                        <label htmlFor={uniqueId}>
                            <span className="p-image">
                                <img src={profileEdit} />
                                {/* <AddAPhotoIcon className="upload-button" /> */}
                                <input id={uniqueId} className="file-upload" type="file" accept="image/*" onChange={e => handleImageChange(e)}
                                    variant="filled" onClick={(e) => e.stopPropagation()} />
                            </span>
                        </label>
                    </div>
                        :
                        <div className='profile-edit-icon-welcome'>
                            <label htmlFor={uniqueId}>
                                <span className="p-image">
                                    <img src={profileEdit} />
                                    {/* <AddAPhotoIcon className="upload-button" /> */}
                                    <input id={uniqueId} className="file-upload" type="file" accept="image/*" onChange={e => handleImageChange(e)}
                                        variant="filled" onClick={(e) => e.stopPropagation()} />
                                </span>
                            </label>
                        </div>}

            <div style={{ fontSize: '12px', color: 'red', textAlign: 'center' }}>{msg}</div>
            <br />
            <Modal dialogClassName={classes.top} show={show} onHide={() => setModel(false)}>
                {transparentLoading && (
                    <TransparentLoader />
                )}
                <Modal.Header closeButton>
                    <Modal.Title>Crop Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={classes.cropContainer}>
                        <Cropper
                            image={uploadImageUrlBase64}
                            crop={crop}
                            rotation={rotation}
                            zoom={zoom}
                            aspect={1 / 1}
                            onCropChange={setCrop}
                            onRotationChange={setRotation}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                            id="cropper_1"
                        />
                    </div>
                    <div className={classes.controls}>
                        <div className={classes.sliderContainer}>
                            <Typography
                                variant="overline"
                                classes={{ root: classes.sliderLabel }}
                            >
                                Zoom
                            </Typography>
                            <Slider
                                value={zoom}
                                min={1}
                                max={3}
                                step={0.1}
                                aria-labelledby="Zoom"
                                classes={{ root: classes.slider }}
                                onChange={(e, zoom) => setZoom(zoom)}
                            />
                        </div>
                        <div className={classes.sliderContainer}>
                            <Typography
                                variant="overline"
                                classes={{ root: classes.sliderLabel }}
                            >
                                Rotation
                            </Typography>
                            <Slider
                                value={rotation}
                                min={-180}
                                max={180}
                                step={1}
                                aria-labelledby="Rotation"
                                classes={{ root: classes.slider }}
                                onChange={(e, rotation) => setRotation(rotation)}
                            />
                        </div>
                        <Button
                            onClick={showCroppedImage}
                            variant="contained"
                            color="primary"
                            classes={{ root: classes.cropButton }}
                        >
                            Save
                        </Button>
                    </div>

                </Modal.Body>
            </Modal>
        </>

    )
}
export default withStyles(styles)(ImageCropper)