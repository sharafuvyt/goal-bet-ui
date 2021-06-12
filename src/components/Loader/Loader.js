import {LoadingOutlined} from '@ant-design/icons';
import React from 'react'
import './Loader.scss'

const Loader = () => {
    return <div className="overlay">
        <LoadingOutlined className="loader"/>
    </div>
}

export default Loader