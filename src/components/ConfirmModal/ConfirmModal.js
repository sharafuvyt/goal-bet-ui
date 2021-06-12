import React, {useState} from 'react'
import {Modal} from 'antd'
import './ConfirmModal.scss'

const ConfirmModal = ({isModalVisible, handleOk, handleCancel}) => {

    const [username, setUsername] = useState('') 
    const [isLoading, setLoading] = useState(false)
    
    const onConfirm = () => {
        setLoading(true)
        handleOk()
    }

    const getModalContainer = () => {
        return <div className="confirm-modal-body">
            <div className="userName">User ID</div>
            <input placeholder='Enter User ID' value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
    }

    const clearState = () => {
        setLoading(false)
        setUsername('')
    }

    return <Modal 
        title="Please verify your ID" 
        visible={isModalVisible} 
        onOk={onConfirm} 
        onCancel={handleCancel} 
        okText="Confirm"
        className="confirm-modal"
        closable={false}
        centered
        destroyOnClose
        afterClose={clearState}
        okButtonProps={{disabled: !username, loading:isLoading}}
        getContainer={document.getElementById('root')}>
            {getModalContainer()}
  </Modal>
}

export default ConfirmModal