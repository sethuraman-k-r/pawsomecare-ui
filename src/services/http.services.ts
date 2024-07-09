import axios from 'axios';
import { VendorProfileProps, CuisineType } from '../props/VendorProps';
import { ItemProps } from '../props/MenuProps';
import { generateMenus } from './menu.services';

export function getProfile(endpoint: string, email: string, token: string):
    Promise<VendorProfileProps | null> {
    return new Promise((resolve, reject) => {
        axios.get(`${endpoint}/${email}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => response.data)
            .then((value) => {
                const rest_food_type = value['rest_food_type']
                const vendor_type = value['vendor_type'].toUpperCase()
                value['rest_food_type'] = rest_food_type === 'Veg' ? CuisineType.VEGETARIAN :
                    rest_food_type === 'Non-Veg' ? CuisineType.NON_VEGETARIAN :
                        rest_food_type === 'both' ? CuisineType.BOTH : undefined;
                value['has_cuisine'] = vendor_type === 'RESTAURANT' || vendor_type === 'HOTEL'
                resolve(value as VendorProfileProps)
            }).catch(err => reject(err))
    })
}


export function updateProfile(endpoint: string, email: string,
    data: Partial<VendorProfileProps>, token: string): Promise<any> {
    return new Promise((resolve, reject) => {
        const requestData: any = {
            ...data,
            rest_food_type: data.rest_food_type === 0 ? 'Veg' : data.rest_food_type === 1 ? 'Non-Veg' : 'both'
        }
        axios.put(`${endpoint}/${email}`, requestData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => response.data)
            .then((value) => {
                resolve(value)
            }).catch(err => reject(err));
    });
}

export function getMenuItems(menuId: number,
    vendorBranchId: number,
    token: string): Promise<any> {
    return new Promise((resolve, reject) => {
        axios.get(`api/vendor/menu/${menuId}/${vendorBranchId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => response.data)
            .then((value: Array<ItemProps>) => resolve(generateMenus(value)))
            .catch(err => reject(err));
    });
}

export function updateHeading(headingId: number,
    headingTitle: string,
    token: string): Promise<any> {
    return new Promise((resolve, reject) => {
        axios.put(`api/vendor/header/${headingId}`, {
            heading_level: headingTitle
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.status)
            .then(value => resolve(value))
            .catch(err => reject(err));
    })
}

export function createHeading(
    menuId: number,
    headingTitle: string,
    vendorBranchId: number,
    token: string): Promise<any> {
    return new Promise((resolve, reject) => {
        axios.post(`api/vendor/header`, {
            heading_level: headingTitle,
            menu_id: menuId,
            vendor_branch_id: vendorBranchId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.data)
            .then(value => resolve(value))
            .catch(err => reject(err));
    })
}

export function updateMenu(
    method: 'POST' | 'PUT',
    itemId: number, data: ItemProps, token: string): Promise<any> {
    return new Promise((resolve, reject) => {
        const id = data.id;
        const updatedData: any = {
            ...data
        };
        if (id === -1) {
            delete updatedData.id;
            delete updatedData.menu_item_id;
        }
        delete updatedData.heading_level;
        let axiosInstance;
        if (method === 'POST') {
            axiosInstance = axios.post(`api/vendor/menu`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } else {
            axiosInstance = axios.put(`api/vendor/menu/${itemId}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }
        axiosInstance.then(response => response.data)
            .then(value => {
                resolve(value)
            }).catch(err => reject(err));
    });
}

export function deleteMenu(itemId: number, token: string): Promise<any> {
    return new Promise((resolve, reject) => {
        axios.delete(`api/vendor/menu/${itemId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => response.data)
            .then(value => resolve(value))
            .catch(err => reject(err));
    })
}