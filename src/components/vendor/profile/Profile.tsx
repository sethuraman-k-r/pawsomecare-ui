import React, { Fragment, useEffect, useState } from 'react';

/* COMPONENT Import */
import ProfileInfo from './ProfileInfo'
import ProfileDetail from './ProfileDetail';
import Backdrop from '../../../hoc-components/UI/backdrop/Backdrop';

/* TS Import */
import { RootState } from '../../../store/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { addVendorProfileInfo } from '../../../store/actions';
import { getProfile, updateProfile } from '../../../services/http.services';

/* CSS Import */
import './Profile.css'


const mapStateToProps = (state: RootState) => ({
    auth: state.auth,
    profile: state.profile
})

const connector = connect(mapStateToProps, {
    addVendorProfileInfo
});

type Props = ConnectedProps<typeof connector>;

const Profile: React.FC<Props> = (props) => {

    const [backdropMsg, setBackdropMsg] = useState<string>("Please wait while we load...");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const readProfile = () => {
        setIsLoading(true);
        setBackdropMsg('Please wait while we refreshing...')
        getProfile('api/vendor/profile', props.auth.email,
            props.auth.accessToken).then(value => {
                setIsLoading(false);
                if (value) {
                    props.addVendorProfileInfo({ ...value })
                }
            }).catch(() => setIsLoading(false))
    }

    const updateVendorProfile = (updatedData: object) => {
        setIsLoading(true);
        setBackdropMsg('Please wait while we updating...')
        updateProfile('api/vendor/profile', props.auth.email,
            updatedData, props.auth.accessToken).then(response => {
                setIsLoading(false);
                readProfile();
            }).catch(() => setIsLoading(false))
    }

    useEffect(() => {
        if (!props.profile) {
            readProfile();
        }
    })

    return (
        <Fragment>
            {isLoading && <Backdrop message={backdropMsg} />}
            {!props.profile ? <Backdrop message={backdropMsg} /> :
                <div className='d-flex flex-column h-100 px-3'>
                    <ProfileInfo updateVendor={updateVendorProfile} />
                    <ProfileDetail updateVendor={updateVendorProfile} />
                </div>
            }
        </Fragment>
    )
}

export default connector(Profile);