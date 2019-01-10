import React from 'react';
import './UserInfo.css';

import 'tachyons';

const UserInfo = ({ name, entries }) => {

    return (
        <div className="mt4 tc mh4">
            <div className='f4'>
            {`${name}, times you have used the app:`}

            </div>
            <div className='f2 mt3'>          
                {entries}
            </div>
        </div>
    )
}

export default UserInfo;