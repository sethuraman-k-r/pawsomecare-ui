import * as React from 'react';
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown, faCircle } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons'

const OrderSummary: React.FC = () => {
    return (
        <div className='card h-100'>
            <div className="card-header bg-white d-flex justify-content-between align-items-center border-bottom-1 border-left-0 border-right-0 border-top-0">
                <div>
                    <span className='d-flex align-items-center'>
                        <label className='mb-0'>
                            Order ID: 45
                    </label>
                    &nbsp;&nbsp;
                    <div className='d-inline-block' style={{
                            width: '4px',
                            height: '4px',
                            borderRadius: '20px',
                            backgroundColor: 'var(--secondary)'
                        }}></div>
                    &nbsp;&nbsp;
                    <label className='mb-0'>Table 4</label>
                    </span>
                    <h6 className='text-uppercase font-weight-bold'>
                        George Washington
                    </h6>
                </div>
                <div>
                    <button className='btn text-success text-uppercase font-weight-bold shadow-none'
                        style={{
                            backgroundColor: 'rgb(40 167 69 / 33%)'
                        }}>
                        Paid
                    </button>
                </div>
            </div>
            <div className='card-body'>
                <div className="d-flex flex-column h-100">
                    <div className="flex-grow-1 overflow-x-hidden overflow-y-auto">
                        <dl className="row mb-0">
                            <dt className="col-sm-3 font-weight-normal">
                                <span className="fa-layers fa-fw">
                                    <FAIcon icon={faSquare} size='lg' color='red' />
                                    <FAIcon icon={faCircle} size='xs' color='red' />
                                </span>
                                &nbsp;
                                Chicken
                            </dt>
                            <dd className="col-sm-9 text-right">2 Qty</dd>

                            <dt className="col-sm-3 font-weight-normal">
                                <span className="fa-layers fa-fw">
                                    <FAIcon icon={faSquare} size='lg' color='green' />
                                    <FAIcon icon={faCircle} size='xs' color='green' />
                                </span>
                                &nbsp;
                                Mutton</dt>
                            <dd className="col-sm-9 text-right">2 Qty</dd>

                            <dt className="col-sm-3 font-weight-normal">
                                <span className="fa-layers fa-fw">
                                    <FAIcon icon={faSquare} size='lg' color='green' />
                                    <FAIcon icon={faCircle} size='xs' color='green' />
                                </span>
                                &nbsp;
                                Idly</dt>
                            <dd className="col-sm-9 text-right">Rs. 630</dd>

                            <dt className="col-sm-3 font-weight-normal">
                                <span className="fa-layers fa-fw">
                                    <FAIcon icon={faSquare} size='lg' color='red' />
                                    <FAIcon icon={faCircle} size='xs' color='red' />
                                </span>
                                &nbsp;
                                Dosa</dt>
                            <dd className="col-sm-9 text-right">Rs. 630</dd>

                            <dt className="col-sm-3 font-weight-normal">
                                <span className="fa-layers fa-fw">
                                    <FAIcon icon={faSquare} size='lg' color='red' />
                                    <FAIcon icon={faCircle} size='xs' color='red' />
                                </span>
                                &nbsp;
                                Icecream Shake</dt>
                            <dd className="col-sm-9 text-right">Rs. 630</dd>
                        </dl>
                    </div>
                    <div className='flex-grow-1'>
                        <div>
                            <hr className='my-2' />
                            <dl className="row mb-0">
                                <dt className="col-sm-3">Total</dt>
                                <dd className="col-sm-9 font-weight-bold text-right">Rs. 630</dd>

                                <dt className="col-sm-3 small">Detail summary</dt>
                                <dd className="col-sm-9 text-right">
                                    <FAIcon icon={faChevronCircleDown} color="var(--dark)" />
                                </dd>
                            </dl>
                            <hr className='my-2' />
                            <dl className="row mb-0">
                                <dt className="col-sm-3 small text-secondary">Coupon</dt>
                                <dd className="col-sm-9 text-right">- Rs. 630</dd>

                                <dt className="col-sm-3 small text-secondary">Subtotal</dt>
                                <dd className="col-sm-9 text-right">Rs. 670</dd>

                                <dt className="col-sm-3 small text-secondary">Tax</dt>
                                <dd className="col-sm-9 text-right">Rs. 20</dd>

                                <dt className="col-sm-3 small text-secondary">Shipping</dt>
                                <dd className="col-sm-9 text-right">Free</dd>
                            </dl>
                            <hr className='my-2' />
                        </div>
                        <div className='text-center'>
                            <button className='btn text-white' style={{
                                backgroundColor: 'var(--primary)'
                            }}>Order Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderSummary;