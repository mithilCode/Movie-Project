import React from 'react'
import Sidebar from './Sidebar'

const View = ({ children }) => {
    return (
        <main className='main_crm_section'>
            <Sidebar />
            <section className='content_wraper'>
                {children}
            </section>
        </main>
    )
}

export default View