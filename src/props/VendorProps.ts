export enum CuisineType {
    VEGETARIAN = 0,
    NON_VEGETARIAN = 1,
    BOTH = 2
}

export interface UserProfileProps {
    id: number,
    email: string,
    firstname: string,
    lastname: string | null,
    username: string,
    role: string,
    dob: string | null,
    address: string | null,
    contact: string | null,
    annualIncome: number
}

export interface VendorProfileProps {
    vendor_branch_id: number;
    vendor_branch_name: string;
    vendor_user_id: number;
    vendor_id: string;
    vendor_name: string;
    vendor_desc: string;
    vendor_type: string;
    vendor_package: string;
    vendor_prfl_img_url: string | null;
    subs_in_store?: string | null;
    addr_line_1: string | null;
    addr_line_2: string | null;
    addr_line_3?: string | null;
    addr_landmark?: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    rest_cuisine_desc?: string | null;
    rest_food_type?: CuisineType;
    open_from: string | null;
    close_at: string | null;
    inactive_date: string;
    creation_date: string;
    created_by: number;
    last_updated_date: string;
    last_updated_by: number;
    id: string;
    is_vendor_active: boolean;
    postal_code?: number | null;
    subs_pick_up: boolean;
    subs_dine_in: boolean;
    rest_ishalal?: boolean;
    has_cuisine: boolean
}

interface Item {
    itemId: number,
    itemImageUrl: string,
    itemName: string,
    itemDesc: string,
    itemPrice: number,
    availStatus: boolean
}

export interface Restaurant extends Item {
    itemCategory?: CuisineType,
    startTime?: number,
    endTime?: number,
    itemType?: string
}

export interface Store extends Item { }

export interface MenuDataProps {
    menuId: number,
    menuName: string,
    menuItems: Array<Restaurant & Store>
}
