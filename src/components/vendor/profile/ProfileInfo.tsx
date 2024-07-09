import React, { Fragment, useEffect, useState } from 'react'
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faPencilAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { connect, ConnectedProps } from 'react-redux';

/* TS Import */
import { VendorProfileProps } from '../../../props/VendorProps';
import { RootState } from '../../../store/reducers';
import { getImage, uploadImage } from '../../../services/s3.services';

const mapStateToProps = (state: RootState) => ({
    profile: state.profile as VendorProfileProps
})

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector> & {
    updateVendor: (updatedData: object) => void
};

const ProfileInfo: React.FC<Props> = (props) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [profileInfo, setProfileInfo] = useState<VendorProfileProps>(props.profile)
    const [imageUrl, setImageUrl] = useState('');
    const editImageRef = React.useRef(null);

    const moduleInfo = () => {
        const moduleName = [];
        if (props.profile.subs_dine_in) {
            moduleName.push('DINE')
        }
        if (props.profile.subs_in_store) {
            moduleName.push('STORE')
        }
        if (props.profile.subs_pick_up) {
            moduleName.push('PICK')
        }
        return moduleName.length > 0 ? moduleName.join(', ') : 'NA'
    }

    useEffect(() => {
        async function readProfileImage() {
            const url = await getImage(profileInfo.vendor_prfl_img_url as string, 'private');
            setImageUrl(url as string);
        }
        readProfileImage();
    })

    return (
        <div className='py-3 px-0 mb-3'>
            <div className='container-fluid border py-3 info-container'>
                <div className='row h-100'>
                    <div className='offset-md-3 col-md-9'>
                        <div className="form-row">
                            <div className="col-md-4 h-fit">
                                <div className="form-group mb-2">
                                    <label className='col col-form-label px-0 pb-0 info-section-name'>Restaurant ID : </label>
                                    <label className="form-control border-0 bg-transparent px-0 mb-0 info-section-value">{props?.profile?.vendor_id || 'NA'}</label>
                                </div>
                            </div>
                            <div className="col-md-4 h-fit">
                                <div className="form-group mb-2">
                                    <label className='col col-form-label px-0 pb-0 info-section-name'>Vendor Type : </label>
                                    <label className="form-control border-0 bg-transparent px-0 mb-0 info-section-value">{props?.profile?.vendor_type || 'NA'}</label>
                                </div>
                            </div>
                            <div className="col-md-4 h-fit">
                                <div className="form-group mb-2">
                                    <label className='col col-form-label px-0 pb-0 info-section-name'>Package : </label>
                                    <label className="form-control border-0 bg-transparent px-0 mb-0 info-section-value">{props?.profile?.vendor_package || 'NA'}</label>
                                </div>
                            </div>
                            <div className='col-md-4 h-fit'>
                                <div className="form-group mb-2">
                                    <label className='col col-form-label px-0 pb-0 info-section-name'>Module : </label>
                                    <label className="form-control border-0 bg-transparent px-0 mb-0 info-section-value">{moduleInfo() || 'NA'}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        <div className='d-flex flex-column justify-content-center align-items-center profile-image-box'>
                            <img src={imageUrl} className='img-fluid fit-cover h-100 w-100'
                                alt={'restaurant profile'} />
                            <form className='d-none'>
                                <input type='file' multiple={false}
                                    ref={editImageRef}
                                    accept='.jpg,.png,.jpeg,.bmp'
                                    onChange={async ev => {
                                        const files = ev.target.files;
                                        if (files?.length && files.length > 0) {
                                            const file = files[0];
                                            const key = await uploadImage({
                                                profileId: props.profile.vendor_id,
                                                file,
                                                level: 'private'
                                            });
                                            props.updateVendor({
                                                ...profileInfo,
                                                vendor_prfl_img_url: key as string
                                            });
                                        }
                                    }}
                                />
                            </form>
                            <div className='d-flex flex-column justify-content-center align-items-center position-absolute cursor-pointer profile-edit-button'
                                onClick={() => {
                                    const inputElem = editImageRef.current;
                                    if (inputElem !== null) {
                                        (inputElem as HTMLInputElement).click();
                                    }
                                }}>
                                <FAIcon icon={faPencilAlt} color='white' />
                            </div>
                        </div>
                    </div>
                    <div className='col-md-9'>
                        {!editMode ?
                            <Fragment>
                                <h4 className='d-inline-block my-3 mr-2'>{props.profile?.vendor_name}</h4>
                                <FAIcon icon={faPencilAlt} className='cursor-pointer'
                                    color={'#dadada'}
                                    onClick={() => setEditMode(true)} />
                            </Fragment> :
                            <Fragment>
                                <input type='text'
                                    value={profileInfo.vendor_name}
                                    className='form-control d-inline-block border-left-0 border-right-0 border-top-0 rounded-0 my-3'
                                    style={{
                                        maxWidth: '35%',
                                    }}
                                    onChange={ev =>
                                        setProfileInfo({
                                            ...profileInfo,
                                            vendor_name: ev.target.value
                                        })
                                    } />
                                <FAIcon icon={faCheckCircle} color={'#00cc7f'} className='cursor-pointer mx-2'
                                    onClick={() => {
                                        if (profileInfo.vendor_name &&
                                            profileInfo.vendor_name !== props.profile.vendor_name) {
                                            props.updateVendor(profileInfo);
                                            setEditMode(false)
                                        }
                                    }} />
                                <FAIcon icon={faTimesCircle} className='cursor-pointer' color={'#d93434'}
                                    onClick={() => setEditMode(false)} />
                            </Fragment>}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default connector(ProfileInfo);