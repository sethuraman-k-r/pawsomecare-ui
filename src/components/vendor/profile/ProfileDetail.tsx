import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    faPencilAlt,
    faToggleOn,
    faToggleOff,
    faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
import { connect, ConnectedProps, Omit } from 'react-redux';

/* TS Import */
import { RootState } from '../../../store/reducers';
import { VendorProfileProps, CuisineType } from '../../../props/VendorProps';


const mapStateToProps = (state: RootState) => ({
    auth: state.auth,
    profile: state.profile as VendorProfileProps
})

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector> & {
    updateVendor: (updatedData: object) => void
};

const ProfileDetail: React.FC<Props> = (props) => {

    const [editRestaurant, setEditRestaurant] = useState<boolean>(false);
    const [editAddress, setEditAddress] = useState<boolean>(false);
    const [editCuisine, setEditCuisine] = useState<boolean>(false);

    const [vendorProfileDetail, updateVendorProfileDetail] = useState<VendorProfileProps>({ ...props.profile });

    useEffect(() => {
        updateVendorProfileDetail({ ...props.profile });
    }, [props.profile]);

    const updateField = (key: keyof VendorProfileProps, value: any) =>
        updateVendorProfileDetail({
            ...vendorProfileDetail,
            [key]: value
        });

    const doUpdateProfile = () => {
        type vendorProfileKeys = keyof VendorProfileProps;
        const keyNotToUpdate = ["vendor_id",
            "vendor_package",
            "vendor_type",
            "subs_dine_in",
            "subs_in_store",
            "subs_pick_up",
            "vendor_user_id",
            "vendor_branch_id",
            "has_cuisine",
            "id"];
        const allProfileKeys = Object.keys(vendorProfileDetail);
        type partialProfileType = Partial<Omit<VendorProfileProps, "vendor_id" |
            "vendor_package" |
            "vendor_type" |
            "subs_dine_in" |
            "subs_in_store" |
            "subs_pick_up" |
            "vendor_user_id" |
            "vendor_branch_id" |
            "has_cuisine" |
            "id">>;
        type partialProfileKeys = keyof partialProfileType;
        const dataToUpdate: partialProfileType = {}
        allProfileKeys.forEach((key: string) => {
            if (!keyNotToUpdate.includes(key)) {
                const newData: any = vendorProfileDetail[key as vendorProfileKeys];
                const oldData: any = props.profile[key as vendorProfileKeys];
                if (oldData !== newData) {
                    dataToUpdate[key as partialProfileKeys] = newData
                }
            }
        });
        props.updateVendor(dataToUpdate);
        setEditRestaurant(false);
    }


    return (
        <div className='container-fluid mt-2 mb-2 flex-grow-1 overflow-x-auto' >
            <div className="row">
                <div className='col-md-6'>
                    <motion.div className='card mb-3' animate={{
                        scale: [0, 1]
                    }}
                        transition={{
                            duration: 0.3
                        }}>
                        <div className='card-body'>
                            <div className='details-edit-button' style={{
                                backgroundColor: !editRestaurant ? '#DADADA' : '#00CC7F',
                            }} onClick={() => {
                                if (editRestaurant) {
                                    if (vendorProfileDetail.open_from !== props.profile.open_from
                                        || vendorProfileDetail.close_at !== props.profile.close_at
                                        || vendorProfileDetail.addr_landmark !== props.profile.addr_landmark
                                        || vendorProfileDetail.vendor_desc !== props.profile.vendor_desc
                                        || vendorProfileDetail.is_vendor_active !== props.profile.is_vendor_active) {
                                        doUpdateProfile();
                                    }
                                }
                                setEditRestaurant(!editRestaurant)
                            }}>
                                {
                                    !editRestaurant ?
                                        <FAIcon icon={faPencilAlt} color={'white'} />
                                        : <FAIcon icon={faCheckCircle} color={'white'} />
                                }
                            </div>
                            <div className='form-group'>
                                <label className='text-secondary small mb-0'>{vendorProfileDetail.vendor_type} Status</label>
                                <div className='form-control border-0 px-0'>
                                    {
                                        vendorProfileDetail.is_vendor_active ?
                                            <FAIcon icon={faToggleOn} size='2x' color={'#887EBC'}
                                                onClick={() => editRestaurant && updateField('is_vendor_active', false)} />
                                            : <FAIcon icon={faToggleOff} size='2x' color={'#DADADA'}
                                                onClick={() => editRestaurant && updateField('is_vendor_active', true)} />}
                                </div>
                            </div>
                            <div className='form-group'>
                                <label className='text-secondary small mb-0'>Timing</label>
                                <div className='form-control border-0 px-0'>
                                    {
                                        editRestaurant ?
                                            <input type='time'
                                                value={vendorProfileDetail?.open_from?.substr(0, 5) || '00:00'}
                                                onChange={ev => editRestaurant && updateField('open_from', ev.target.value)} />
                                            :
                                            <label className='font-weight-bold'>
                                                {vendorProfileDetail?.open_from?.substr(0, 5) || '-'}
                                            </label>
                                    }
                                    &nbsp; To &nbsp;
                                    {
                                        editRestaurant ?
                                            <input type='time'
                                                value={vendorProfileDetail?.close_at?.substr(0, 5) || '00:00'}
                                                onChange={ev => editRestaurant && updateField('close_at', ev.target.value)} />
                                            :
                                            <label className='font-weight-bold'>
                                                {vendorProfileDetail?.close_at?.substr(0, 5) || '-'}
                                            </label>
                                    }
                                </div>
                            </div>
                            <div className='form-group'>
                                <label className='text-secondary small mb-0'>Landmark</label>
                                <div className='form-control border-0 px-0 w-75'>
                                    {
                                        editRestaurant ? <input type='text'
                                            className='form-control border-right-0 border-left-0 border-top-0 rounded-0'
                                            value={vendorProfileDetail.addr_landmark as string}
                                            onChange={ev => editRestaurant && updateField('addr_landmark', ev.target.value)} /> :
                                            <label className='font-weight-bold'>{vendorProfileDetail?.addr_landmark}</label>
                                    }
                                </div>
                            </div>
                            <div className='form-group'>
                                <label className='text-secondary small mb-0'>Description</label>
                                <div className='form-control border-0 px-0'>
                                    {
                                        editRestaurant ? <textarea
                                            value={vendorProfileDetail.vendor_desc as string}
                                            className='form-control border-right-0 border-left-0 border-top-0 rounded-0'
                                            onChange={ev => editRestaurant && updateField('vendor_desc', ev.target.value)}></textarea> :
                                            <label className='font-weight-normal small'>{vendorProfileDetail?.vendor_desc}</label>
                                    }
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    {
                        vendorProfileDetail?.has_cuisine &&
                        <motion.div className='card' animate={{
                            scale: [0, 1]
                        }}
                            transition={{
                                duration: 0.3
                            }}>
                            <div className='card-body'>
                                <div className='details-edit-button' style={{
                                    backgroundColor: !editCuisine ? '#DADADA' : '#00CC7F'
                                }} onClick={() => {
                                    if (editCuisine) {
                                        if (vendorProfileDetail.rest_food_type !== props.profile.rest_food_type ||
                                            vendorProfileDetail.rest_ishalal !== props.profile.rest_ishalal ||
                                            vendorProfileDetail.rest_cuisine_desc !== props.profile.rest_cuisine_desc) {
                                            doUpdateProfile();
                                        }
                                    }
                                    setEditCuisine(!editCuisine)
                                }}>
                                    {
                                        !editCuisine ?
                                            <FAIcon icon={faPencilAlt} color={'white'} />
                                            : <FAIcon icon={faCheckCircle} color={'white'} />
                                    }
                                </div>
                                <div className='form-group'>
                                    <label className='text-secondary small mb-0'>
                                        Food type *
                                </label>
                                    <div className='form-control border-0 px-0'>
                                        <label className='mb-0 mr-2' onClick={() => {
                                            if (editCuisine) {
                                                if (vendorProfileDetail.rest_food_type === CuisineType.BOTH) {
                                                    updateField('rest_food_type', CuisineType.NON_VEGETARIAN)
                                                } else if (vendorProfileDetail.rest_food_type === CuisineType.NON_VEGETARIAN) {
                                                    updateField('rest_food_type', CuisineType.BOTH)
                                                } else {
                                                    updateField('rest_food_type', CuisineType.VEGETARIAN)
                                                }
                                            }
                                        }}>
                                            <FAIcon icon={faCheckCircle} size='1x' color=
                                                {vendorProfileDetail.rest_food_type === CuisineType.BOTH ||
                                                    vendorProfileDetail.rest_food_type === CuisineType.VEGETARIAN ? '#00CC7F' : '#DADADA'}
                                            /> Veg
                                        </label>
                                        <label className='mb-0' onClick={() => {
                                            if (editCuisine) {
                                                if (vendorProfileDetail.rest_food_type === CuisineType.BOTH) {
                                                    updateField('rest_food_type', CuisineType.VEGETARIAN)
                                                } else if (vendorProfileDetail.rest_food_type === CuisineType.VEGETARIAN) {
                                                    updateField('rest_food_type', CuisineType.BOTH)
                                                } else {
                                                    updateField('rest_food_type', CuisineType.NON_VEGETARIAN)
                                                }
                                            }
                                        }}>
                                            <FAIcon icon={faCheckCircle} size='1x' color=
                                                {vendorProfileDetail.rest_food_type === CuisineType.BOTH ||
                                                    vendorProfileDetail.rest_food_type === CuisineType.NON_VEGETARIAN ? '#00CC7F' : '#DADADA'}
                                            /> Non Veg
                                        </label>
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <label className='text-secondary small mb-0'>Cuisines *</label>
                                    <div className='form-control border-0 px-0'>
                                        {
                                            editCuisine ? <input type='text'
                                                className='form-control border-right-0 border-left-0 border-top-0 rounded-0'
                                                value={vendorProfileDetail.rest_cuisine_desc as string}
                                                onChange={ev => editCuisine && updateField('rest_cuisine_desc', ev.target.value)} /> :
                                                <label className='font-weight-bold'>{vendorProfileDetail?.rest_cuisine_desc}</label>
                                        }
                                    </div>
                                </div>
                                <div className='dropdown-divider'></div>
                                <div className="d-flex flex-row form-group justify-content-between align-items-center mb-0">
                                    <label className='text-secondary font-weight-bold mb-0'>Halal</label>
                                    {
                                        vendorProfileDetail.rest_ishalal ?
                                            <FAIcon icon={faToggleOn} size='2x' color={'#887EBC'}
                                                onClick={() => editCuisine && updateField('rest_ishalal', false)} />
                                            : <FAIcon icon={faToggleOff} size='2x' color={'#DADADA'}
                                                onClick={() => editCuisine && updateField('rest_ishalal', true)} />}
                                </div>
                            </div>
                        </motion.div>
                    }
                </div>
                <div className='col-md-6'>
                    <motion.div className='card' animate={{
                        scale: [0, 1]
                    }}
                        transition={{
                            duration: 0.3
                        }}>
                        <div className='card-body'>
                            <div className='details-edit-button' style={{
                                backgroundColor: !editAddress ? '#DADADA' : '#00CC7F'
                            }} onClick={() => {
                                if (editAddress) {
                                    if (vendorProfileDetail.addr_line_1 !== props.profile.addr_line_1 ||
                                        vendorProfileDetail.addr_line_2 !== props.profile.addr_line_2 ||
                                        vendorProfileDetail.addr_line_3 !== props.profile.addr_line_3 ||
                                        vendorProfileDetail.city !== props.profile.city ||
                                        vendorProfileDetail.state !== props.profile.state ||
                                        vendorProfileDetail.country !== props.profile.country ||
                                        vendorProfileDetail.postal_code !== props.profile.postal_code) {
                                        doUpdateProfile();
                                    }
                                }
                                setEditAddress(!editAddress)
                            }}>
                                {
                                    !editAddress ?
                                        <FAIcon icon={faPencilAlt} color={'white'} />
                                        : <FAIcon icon={faCheckCircle} color={'white'} />
                                }
                            </div>
                            <h6 className='small mb-3' style={{ fontWeight: 600 }}>ADDRESS DETAILS</h6>
                            <div className='form-group mb-1'>
                                <label className='text-secondary small mb-0'>Address Line 1</label>
                                <div className='form-control border-0 px-0'>
                                    {
                                        editAddress ? <input type='text'
                                            className='form-control border-right-0 border-left-0 border-top-0 rounded-0 w-75'
                                            value={vendorProfileDetail.addr_line_1 as string}
                                            onChange={ev => editAddress && updateField('addr_line_1', ev.target.value)} /> :
                                            <label className='font-weight-bold'>{vendorProfileDetail?.addr_line_1 || '-'}</label>
                                    }
                                </div>
                            </div>
                            <div className='form-group mb-1'>
                                <label className='text-secondary small mb-0'>Address Line 2</label>
                                <div className='form-control border-0 px-0'>
                                    {
                                        editAddress ? <input type='text'
                                            className='form-control border-right-0 border-left-0 border-top-0 rounded-0 w-75'
                                            value={vendorProfileDetail.addr_line_2 as string}
                                            onChange={ev => editAddress && updateField('addr_line_2', ev.target.value)} /> :
                                            <label className='font-weight-bold'>{vendorProfileDetail?.addr_line_2 || '-'}</label>
                                    }
                                </div>
                            </div>
                            <div className='form-group mb-1'>
                                <label className='text-secondary small mb-0'>Address Line 3</label>
                                <div className='form-control border-0 px-0'>
                                    {
                                        editAddress ? <input type='text'
                                            className='form-control border-right-0 border-left-0 border-top-0 rounded-0 w-75'
                                            value={vendorProfileDetail.addr_line_3 as string}
                                            onChange={ev => editAddress && updateField('addr_line_3', ev.target.value)} /> :
                                            <label className='font-weight-bold'>{vendorProfileDetail?.addr_line_3 || '-'}</label>
                                    }
                                </div>
                            </div>
                            <div className='form-group mb-1'>
                                <label className='text-secondary small mb-0'>City</label>
                                <div className='form-control border-0 px-0'>
                                    {
                                        editAddress ? <input type='text'
                                            className='form-control border-right-0 border-left-0 border-top-0 rounded-0 w-75'
                                            value={vendorProfileDetail.city as string}
                                            onChange={ev => editAddress && updateField('city', ev.target.value)} /> :
                                            <label className='font-weight-bold'>{vendorProfileDetail?.city || '-'}</label>
                                    }
                                </div>
                            </div>
                            <div className='form-group mb-1'>
                                <label className='text-secondary small mb-0'>State</label>
                                <div className='form-control border-0 px-0'>
                                    {
                                        editAddress ? <input type='text'
                                            className='form-control border-right-0 border-left-0 border-top-0 rounded-0 w-75'
                                            value={vendorProfileDetail.state as string}
                                            onChange={ev => editAddress && updateField('state', ev.target.value)} /> :
                                            <label className='font-weight-bold'>{vendorProfileDetail?.state || '-'}</label>
                                    }
                                </div>
                            </div>
                            <div className='form-group mb-1'>
                                <label className='text-secondary small mb-0'>Country</label>
                                <div className='form-control border-0 px-0'>
                                    {
                                        editAddress ? <input type='text'
                                            className='form-control border-right-0 border-left-0 border-top-0 rounded-0 w-75'
                                            value={vendorProfileDetail.country as string}
                                            onChange={ev => editAddress && updateField('country', ev.target.value)} /> :
                                            <label className='font-weight-bold'>{vendorProfileDetail?.country || '-'}</label>
                                    }
                                </div>
                            </div>
                            <div className='form-group mb-1'>
                                <label className='text-secondary small mb-0'>Pincode</label>
                                <div className='form-control border-0 px-0'>
                                    {
                                        editAddress ? <input type='number'
                                            className='form-control border-right-0 border-left-0 border-top-0 rounded-0 w-75'
                                            value={vendorProfileDetail?.postal_code || 100001}
                                            maxLength={6}
                                            minLength={6}
                                            onChange={ev => editAddress && updateField('postal_code', ev.target.value)} /> :
                                            <label className='font-weight-bold'>{vendorProfileDetail?.postal_code || '-'}</label>
                                    }
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div >
    )
}

export default connector(ProfileDetail);