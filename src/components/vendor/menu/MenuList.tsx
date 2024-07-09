import * as React from 'react'
import MenuItem from './MenuItem';
import { ItemProps, MenuDataProps, MenuProps } from '../../../props/MenuProps';
import { useParams } from 'react-router-dom';
import { VendorProfileProps } from '../../../props/VendorProps';


type Props = {
    menus: MenuDataProps,
    filterMenu: string,
    profile: VendorProfileProps,
    deleteMenu: (itemId: number) => void,
    updateHeading: (headingId: string, updatedHeading: string) => void,
    updateMenuItem: (itemDetails: ItemProps,
        headingId: number, headingTitle: string) => void,
    addSubMenuItem: (headingId: string) => void
}

const MenuList: React.FC<Props> = (props) => {

    const params: {
        menuHash: string
    } = useParams();

    const [menus, setMenus] = React.useState(props.menus);

    React.useEffect(() => {
        setMenus(props.menus)
    }, [props.menus]);

    return (
        <React.Fragment>
            {
                Object.keys(menus).map((menuHeadingId: string, menuHeadingIndex: number) => {
                    const menuHeadingData = { ...menus[menuHeadingId as any] as MenuProps };
                    const headingTitle = menuHeadingData.heading_level || '';
                    const headingHash = menuHeadingData.heading_hash;
                    const menuUrl = headingTitle.split(" ").join("") + '-' + headingHash.substr(0, 10);
                    return (!params.menuHash || menuUrl === params.menuHash)
                        && <MenuItem
                            filterMenu={props.filterMenu}
                            menuDetail={menuHeadingData}
                            deleteMenu={props.deleteMenu}
                            updateHeading={props.updateHeading}
                            updateMenuItem={props.updateMenuItem}
                            addSubMenuItem={props.addSubMenuItem}
                            key={menuHeadingIndex}
                            profile={props.profile} />
                })
            }
        </React.Fragment>
    );
}

export default MenuList;