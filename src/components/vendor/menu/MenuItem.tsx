import * as React from 'react';
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { ItemProps, MenuProps } from '../../../props/MenuProps';
import MenuItemDetails from './MenuItemDetails';
import { VendorProfileProps } from '../../../props/VendorProps';

type Props = {
    menuDetail: MenuProps,
    filterMenu: string,
    profile: VendorProfileProps,
    deleteMenu: (itemId: number) => void,
    updateHeading: (headingId: string, updatedHeading: string) => void,
    updateMenuItem: (itemDetails: ItemProps,
        headingId: number, headingTitle: string) => void,
    addSubMenuItem: (headingId: string) => void
}

const MenuItem: React.FC<Props> = (props) => {
    const [menuDetail, setMenuDetail] = React.useState({ ...props.menuDetail });
    const [editHeading, setEditHeading] = React.useState<boolean>(false);
    const menuItems = menuDetail.items;

    React.useEffect(() => {
        setMenuDetail({ ...props.menuDetail });
        setEditHeading(false);
    }, [props.menuDetail]);

    return (
        <div className='card border-0 my-2'>
            <div className='card-header border-0 d-flex justify-content-between align-items-center'>
                {
                    editHeading ?
                        <input type='text'
                            className='form-control w-25 border-bottom border-left-0 border-right-0 border-top-0'
                            value={menuDetail.heading_level}
                            onChange={(ev) => setMenuDetail({
                                ...menuDetail,
                                heading_level: ev.target.value
                            })} /> :
                        <h6 className='font-weight-bold mb-0'>
                            {menuDetail.heading_level}
                        </h6>
                }
                <div>
                    {!editHeading ? <React.Fragment>
                        {

                            <React.Fragment>
                                <FAIcon icon={faPencilAlt} style={{
                                    color: 'var(--dark)',
                                    cursor: 'pointer'
                                }} onClick={() => setEditHeading(true)} />
                                {menuDetail.heading_level_id !== -1 &&
                                    <button className="btn ml-2" type="button"
                                        style={{
                                            backgroundColor: 'rgb(231, 229, 242)',
                                            color: 'var(--dark)',
                                            fontWeight: 600
                                        }}
                                        onClick={() => props
                                            .addSubMenuItem(menuDetail.heading_level_id.toString())}>
                                        New Menu
                                    </button>}
                            </React.Fragment>
                        }
                    </React.Fragment> :
                        <React.Fragment>
                            <FAIcon icon={faSave} className='mx-2' style={{
                                color: 'var(--dark)',
                                cursor: 'pointer'
                            }} onClick={() => {
                                props.updateHeading(menuDetail.heading_level_id.toString(),
                                    menuDetail.heading_level as string)
                            }} />
                            <FAIcon icon={faTimesCircle} className='mx-2' style={{
                                color: 'var(--danger)',
                                cursor: 'pointer'
                            }} onClick={() => {
                                setMenuDetail({
                                    ...props.menuDetail
                                })
                                setEditHeading(false);
                            }} />
                        </React.Fragment>
                    }
                </div>
            </div>
            <div className='card-body row px-0 py-1'>
                <div className='col-md-12'>
                    {
                        menuItems.map((menuItem, menuItemIndex) =>
                            <MenuItemDetails
                                item={menuItem}
                                filterMenu={props.filterMenu}
                                deleteMenu={props.deleteMenu}
                                updateMenuItem={props.updateMenuItem}
                                key={menuItemIndex}
                                profile={props.profile} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default MenuItem;