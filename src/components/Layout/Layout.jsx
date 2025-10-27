import React from 'react';
import Banner from '../Banner/Banner';

const Layout = ({ children }) => {
    return (
        <div>
            <Banner />
            <main>{children}</main>
        </div>
    );
};

export default Layout;