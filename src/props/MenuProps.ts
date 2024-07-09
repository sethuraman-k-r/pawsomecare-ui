export interface ItemProps {
    vendor_branch_id: number;
    menu_item_id: number;
    menu_type: string;
    item_name: string;
    item_desc: string;
    item_price: number;
    curr: string;
    item_start_time: string;
    item_end_time: string;
    item_menu_type?: any;
    item_img_url: string;
    inactive_date?: any;
    creation_date?: any;
    created_by?: any;
    last_updated_date?: any;
    last_updated_by?: any;
    id: number;
    menu_id: number;
    is_recommended: boolean;
    item_status: boolean;
    item_food_type?: 'Veg' | 'Non-Veg';
    heading_level_id: number;
    heading_level: string;
}

export interface MenuProps {
    heading_level_id: number,
    heading_level?: string,
    heading_hash: string;
    items: Array<ItemProps>
}

export type MenuDataProps = {
    [string: number]: MenuProps
}