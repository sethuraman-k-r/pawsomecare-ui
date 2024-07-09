import React from 'react'
import { Link } from 'react-router-dom'

/* JS Import */
import { joinArrayToString } from '../../utils/array.utils';

/* CSS Import */
import classes from './Error.module.css'

function error() {
    return (
        <div className={classes['error-container']}>
            <div className={classes['error-banner']}>
                <h1>404</h1>
                <span>Page not found</span>
            </div>
            <Link to='/login'>
                <button className={joinArrayToString(
                    [classes['error-button'], 'btn', 'bg-white', 'mt-4']
                )}>
                    Back to login
                </button>
            </Link>
        </div>
    )
}

export default error;