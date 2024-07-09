import * as React from 'react';

const OrderItem: React.FC = () => {
    return (
        <div className='card border-left-0 border-right-0 border-top-0 border-bottom-1 rounded-0'>
            {/* border-left: 3px solid var(--primary) !important; */}
            <div className="card-header bg-white d-flex justify-content-between border-0">
                <h6 className='mb-0 font-weight-normal'>Order ID: 45</h6>
                <span style={{
                    color: 'green'
                }} className='small font-weight-bold'>PAID</span>
            </div>
            <div className="card-body py-2">
                <span className='d-flex align-items-center'>
                    <label className='mb-0'>
                        <h5 className='mb-0' style={{
                            fontWeight: 600
                        }}>
                            Table 1
                        </h5>
                    </label>
                    &nbsp;&nbsp;
                    <div className='d-inline-block' style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '20px',
                        backgroundColor: 'var(--secondary)'
                    }}></div>
                    &nbsp;&nbsp;
                    <label className='mb-0'>Dine in</label>
                </span>
                <label style={{
                    color: 'orange',
                    fontWeight: 600,
                    fontSize: '14px'
                }} className='my-2'>Cooking</label>
            </div>
        </div>
    );
}

export default OrderItem;