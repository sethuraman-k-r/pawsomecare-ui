import * as React from 'react';

import './Backdrop.css';

type BackdropProps = {
    message?: string
}

const Backdrop: React.FC<BackdropProps> = (props) => (
    <div className="screen-backdrop">
        <div className="loader-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        {
            props.message && <h3 className='text-white'>{props.message}</h3>
        }
    </div>
)

export default Backdrop;