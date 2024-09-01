"use client";

import init from '@/utils/init';
import React, { Fragment, useEffect } from 'react';

export default function AppProvider({ children }) {
    
    useEffect(() => {
        init()
    }, []);

    return (
        <Fragment>
            {children}
        </Fragment>
    );
}
