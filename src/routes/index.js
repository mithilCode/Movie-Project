import React from 'react'
import { appRoute } from './appRoute'
import { Route, Routes } from 'react-router-dom';
const index = () => {
    return (
        <>
            <Routes>
                {appRoute?.map((item, index) => {
                    return (
                        <Route key={index} path={item?.path} element={item.element} />
                    )
                })}
            </Routes>
        </>
    )
}

export default index