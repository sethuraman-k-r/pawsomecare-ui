import * as React from 'react';
import { motion } from 'framer-motion'
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faSave, faToggleOff, faToggleOn, faTrash, faTimes, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { ItemProps } from '../../../props/MenuProps';
import { joinArrayToString } from '../../../utils/array.utils';

import './Menu.css'
import { VendorProfileProps } from '../../../props/VendorProps';
import { getImage, uploadImage } from '../../../services/s3.services';

type Props = {
    item: ItemProps,
    filterMenu: string,
    profile: VendorProfileProps,
    deleteMenu: (itemId: number) => void,
    updateMenuItem: (itemDetails: ItemProps,
        headingId: number, headingTitle: string) => void,
}

const MenuItemDetails: React.FC<Props> = (props) => {
    const [menuItem, setMenuItem] = React.useState(props.item);
    const [editMenu, setEditMenu] = React.useState<boolean>(false);
    const editImageRef = React.useRef(null)
    const [imageUrl, setImageUrl] = React.useState('');

    React.useEffect(() => {
        setMenuItem({ ...props.item });
        setEditMenu(menuItem.id === -1);
        async function readMenuImage() {
            const url = await getImage(menuItem.item_img_url as string, 'protected');
            setImageUrl(url as string);
        }
        readMenuImage()
    }, [props.item, menuItem.id, menuItem.item_img_url]);

    const updateItemField = (key: keyof ItemProps, value: any) =>
        setMenuItem({
            ...menuItem,
            [key]: value
        });

    const doFilter = (): boolean => {
        const lowercaseFilterValue = props.filterMenu.toLowerCase();
        return (props.filterMenu === '' ||
            menuItem.item_name.toLowerCase().includes(lowercaseFilterValue) ||
            menuItem.item_desc.toLowerCase().includes(lowercaseFilterValue) ||
            menuItem.heading_level.toLowerCase().includes(lowercaseFilterValue));
    }

    return doFilter() ?
        <motion.div className='col-md-6 py-3 pl-0 d-inline-block mb-3' transition={{
            duration: 0.3
        }} animate={{
            scale: [0.3, 1]
        }}>
            <div className={joinArrayToString([editMenu ? 'shadow' : '', 'card p-3'])} style={{
                maxHeight: '270px',
                height: '270px'
            }}>
                <div className='row' >
                    <div className='col-md-4 d-flex align-items-center justify-content-center menu-image-box'>
                        <img src={
                            !menuItem.item_img_url ?
                                'https://via.placeholder.com/150?text=No Image'
                                : imageUrl} alt='menu' className='img-fluid' />
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
                                            forMenu: true,
                                            menuId: menuItem.id,
                                            level: 'protected'
                                        })
                                        props.updateMenuItem({
                                            ...menuItem,
                                            item_img_url: key as string
                                        }, menuItem.heading_level_id,
                                            menuItem.heading_level)
                                    }
                                }}
                            />
                        </form>
                        <div className='d-flex flex-column justify-content-center align-items-center position-absolute cursor-pointer menu-edit-button'
                            onClick={() => {
                                const inputElem = editImageRef.current;
                                if (inputElem !== null) {
                                    (inputElem as HTMLInputElement).click();
                                }
                            }}>
                            <FAIcon icon={faPencilAlt} color='white' />
                        </div>
                    </div>
                    <div className='col-md-8 pl-0'>
                        <div className='row'>
                            <div className="col-md-12">
                                {
                                    editMenu ?
                                        <input type='text'
                                            className='form-control border-bottom border-left-0 border-right-0 border-top-0 rounded-0'
                                            style={{
                                                fontSize: '80%',
                                                fontWeight: 400
                                            }}
                                            value={menuItem.item_name}
                                            onChange={(ev) => updateItemField('item_name', ev.target.value)} /> :
                                        <h5 className='font-weight-bold'>{menuItem.item_name}</h5>
                                }
                                {
                                    editMenu ?
                                        <textarea rows={2}
                                            className='form-control border-bottom border-left-0 border-right-0 border-top-0 rounded-0'
                                            style={{
                                                fontSize: '80%',
                                                fontWeight: 400
                                            }}
                                            value={menuItem.item_desc}
                                            onChange={(ev) => updateItemField('item_desc', ev.target.value)}></textarea> :
                                        <label className='small'>{menuItem.item_desc}</label>
                                }

                            </div>
                        </div>
                        {editMenu && <div className="dropdown-divider"></div>}
                        <div className='row'>
                            <div className="col-md-6">
                                <div className="form-group mb-0">
                                    <label className='text-secondary small mb-0'>Timing</label>
                                    <div className='form-control border-0 px-0'>
                                        {
                                            editMenu ?
                                                <input type='time'
                                                    value={menuItem.item_start_time.substr(0, 5)}
                                                    style={{ width: '35%', fontSize: '10px' }}
                                                    onChange={ev => updateItemField('item_start_time', ev.target.value)} />
                                                : <label style={{
                                                    fontWeight: 600
                                                }}>{menuItem.item_start_time.substr(0, 5)}</label>
                                        }
                                        &nbsp; To &nbsp;
                                        {
                                            editMenu ?
                                                <input type='time'
                                                    value={menuItem.item_end_time.substr(0, 5)}
                                                    style={{ width: '35%', fontSize: '10px' }}
                                                    onChange={ev => updateItemField('item_end_time', ev.target.value)} />
                                                : <label style={{
                                                    fontWeight: 600
                                                }}>{menuItem.item_end_time.substr(0, 5)}</label>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-0">
                                    <label className='text-secondary small mb-0'>Cuisine</label>
                                    <div className='form-control border-0 px-0'>
                                        <span className='font-weight-bold' onClick={() => editMenu &&
                                            updateItemField('item_food_type', 'Veg')}>
                                            <FAIcon icon={faCheckCircle} color={
                                                menuItem.item_food_type === 'Veg' ? '#00CC7F' : '#E8E8E8'
                                            } />
                                            &nbsp; Veg</span>
                                        &nbsp;&nbsp;
                                        <span className='font-weight-bold' onClick={() => editMenu &&
                                            updateItemField('item_food_type', 'Non-Veg')}>
                                            <FAIcon icon={faCheckCircle} color={
                                                menuItem.item_food_type === 'Non-Veg' ? '#00CC7F' : '#E8E8E8'
                                            } />
                                            &nbsp; Non Veg</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='dropdown-divider'></div>
                <div className='row'>
                    <div className={editMenu ? 'col-md-9' : 'col-md-10'}>
                        <div className="form-row">
                            <div className="col-md-4 form-group mb-0">
                                <label className='text-secondary small mb-0'>Recommended</label>
                                <div className='form-control border-0 px-0'>
                                    <FAIcon icon={menuItem.is_recommended ? faToggleOn : faToggleOff}
                                        size='2x' color={menuItem.is_recommended ? '#887EBC' : '#DADADA'}
                                        onClick={() => editMenu && updateItemField('is_recommended', !menuItem.is_recommended)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4 form-group mb-0">
                                <label className='text-secondary small mb-0'>Status</label>
                                <div className='form-control border-0 px-0'>
                                    <FAIcon icon={menuItem.item_status ? faToggleOn : faToggleOff}
                                        size='2x' color={menuItem.item_status ? '#887EBC' : '#DADADA'}
                                        onClick={() => editMenu && updateItemField('item_status', !menuItem.item_status)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4 form-group mb-0">
                                <label className='text-secondary small mb-0'>Price</label>
                                <div className={joinArrayToString([editMenu ? 'py-0' : '', 'form-control border-0 px-0'])}>
                                    {
                                        editMenu ?
                                            <input type='number'
                                                className='form-control border-bottom border-left-0 border-right-0 border-top-0 rounded-0 py-0 pl-0'
                                                value={menuItem.item_price}
                                                onChange={(ev) => updateItemField('item_price', ev.target.value)} /> :
                                            <span className='font-weight-bold'>Rs: {menuItem.item_price}</span>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={joinArrayToString([editMenu ? 'col-md-3 align-items-center' : 'col-md-2 align-items-end',
                        'd-flex justify-content-around'])}>
                        {
                            !editMenu ?
                                <div>
                                    <button className='btn' style={{
                                        backgroundColor: 'var(--dark)',
                                        color: 'white'
                                    }} onClick={() => setEditMenu(true)}>Edit</button>
                                </div>
                                : <React.Fragment>
                                    <button className='btn' style={{
                                        backgroundColor: 'var(--primary)',
                                        color: 'white',
                                        padding: '5px 10px',
                                        margin: '0 2px'
                                    }} title={menuItem.id !== -1 ? 'Update item' : 'Save item'}
                                        onClick={() => {
                                            props.updateMenuItem({
                                                ...menuItem
                                            }, menuItem.heading_level_id,
                                                menuItem.heading_level)
                                        }}>
                                        <FAIcon icon={faSave} />
                                    </button>
                                    {menuItem.id !== -1 &&
                                        <button className='btn' style={{
                                            backgroundColor: 'white',
                                            color: 'var(--danger)',
                                            padding: '5px 10px',
                                            margin: '0 2px'
                                        }} title={'Cancel edit'}
                                            onClick={async () => {
                                                setMenuItem({
                                                    ...props.item
                                                })
                                                setEditMenu(false);
                                            }}>
                                            <FAIcon icon={faTimes} />
                                        </button>
                                    }
                                    <button className='btn' style={{
                                        backgroundColor: 'var(--danger)',
                                        color: 'white',
                                        padding: '5px 10px',
                                        margin: '0 2px'
                                    }} title={'Delete item'}
                                        onClick={async () => {
                                            await props.deleteMenu(menuItem.id)
                                        }}>
                                        <FAIcon icon={faTrash} />
                                    </button>
                                </React.Fragment>
                        }
                    </div>
                </div>
            </div>
        </motion.div> : null
}

export default MenuItemDetails;