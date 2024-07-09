import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faTh, faList } from '@fortawesome/free-solid-svg-icons';

import OrderSummary from './OrderSummary';
import OrderList from './OrderList';
import { ORDER_STATUS, ORDER_VIEW } from '../../../props/OrderProps';
import { URL_VENDOR_ORDER } from '../../../config/UrlRoute';
import { joinArrayToString } from '../../../utils/array.utils';

const Order: React.FC = () => {

    const [orderStatus, setOrderStatus] = useState<ORDER_STATUS>(ORDER_STATUS.ACTIVE)
    const [orderView, setOrderView] = useState<ORDER_VIEW>(ORDER_VIEW.LIST)

    return (
        <div className='d-flex flex-column h-100'>
            <div className='container-fluid px-0'>
                <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom p-0">
                    <div className="navbar-collapse">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className={joinArrayToString(['nav-item cursor-pointer',
                                (orderStatus === ORDER_STATUS.ACTIVE ? 'active' : '')])}
                                onClick={() => setOrderStatus(ORDER_STATUS.ACTIVE)}>
                                <span className="nav-link">Active</span>
                            </li>
                            <li className={joinArrayToString(['nav-item cursor-pointer',
                                (orderStatus === ORDER_STATUS.CANCELLED ? 'active' : '')])}
                                onClick={() => setOrderStatus(ORDER_STATUS.CANCELLED)}>
                                <span className="nav-link">Cancelled</span>
                            </li>
                            <li className={joinArrayToString(['nav-item cursor-pointer',
                                (orderStatus === ORDER_STATUS.PASTORDER ? 'active' : '')])}
                                onClick={() => setOrderStatus(ORDER_STATUS.PASTORDER)}>
                                <span className="nav-link">Past Order</span>
                            </li>
                        </ul>
                    </div>
                    <div className='pr-2'>
                        <div className="btn-toolbar" role="toolbar" >
                            <div className="btn-group" role="group" >
                                <button type="button" className="btn shadow-none"
                                    style={{
                                        color: orderView === ORDER_VIEW.LIST ? 'var(--dark)' : 'var(--secondary)'
                                    }}
                                    onClick={() => setOrderView(ORDER_VIEW.LIST)}>
                                    <FAIcon icon={faList} />
                                </button>
                            </div>
                            <div className="btn-group" role="group" >
                                <button type="button" className="btn shadow-none"
                                    style={{
                                        color: orderView === ORDER_VIEW.GRID ? 'var(--dark)' : 'var(--secondary)'
                                    }}
                                    onClick={() => setOrderView(ORDER_VIEW.GRID)}>
                                    <FAIcon icon={faTh} />
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div className='container-fluid flex-grow-1 overflow-hidden'>
                <div className='row h-100'>
                    <div className='col-md-4 py-2 pr-0 h-100'>
                        <div className='card h-100'>
                            <div className="card-header d-flex align-items-center justify-content-between py-3 bg-white">
                                <h6 className="mb-0 font-weight-bold">
                                    Today
                                </h6>
                                <div className='form-inline'>
                                    <section className='mx-1' style={{
                                        width: '25px',
                                        height: '25px',
                                        background: 'var(--dark)',
                                        borderRadius: '25px',
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }} >
                                        <FAIcon icon={faSearch} className='mx-1' style={{
                                            fontSize: '12px'
                                        }} /></section>
                                    <section className='mx-1' style={{
                                        width: '25px',
                                        height: '25px',
                                        background: 'var(--dark)',
                                        borderRadius: '25px',
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }} >
                                        <FAIcon icon={faFilter} className='mx-1' style={{
                                            fontSize: '12px'
                                        }} /></section>
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div className='d-flex flex-column h-100'>
                                    <div className='flex-grow-1 overflow-auto'>
                                        <OrderList />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 py-2 h-100">
                        <OrderSummary />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order;