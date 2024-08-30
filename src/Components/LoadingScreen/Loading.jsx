import React from 'react'
import Style from './LoadingScreen.module.css'


export default function Loading() {
    return (
        <div className='w-full min-h-[calc(100vh-128px-268.8px)] flex justify-center items-center'>
            <span className={`${Style.loading}`}></span>
        </div>
    )
}
