import React, { useState } from 'react'
import { Modal, message } from 'antd';
import './PredictModal.scss'

const PredictModal = ({isModalVisible, handleCancel, matchDetails}) => {

    const [username, setUsername] = useState('') 
    const [score1, setScore1] = useState() 
    const [score2, setScore2] = useState() 
    const [isLoading, setLoading] = useState(false)

    const handleErrors = (response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }
    
    const handleOk = () => {
        setLoading(true)
        const body = {
          matchId: matchDetails.id,
          userId: username,
          teamGoals1:Number(score1),
          teamGoals2:Number(score2)
        }
        fetch("https://goal-bet-api.herokuapp.com/predictGoal", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(body)
      }).then(handleErrors).then(() => {
        message.success('Submitted your prediction')
        handleCancel()
      }).catch(() => {
        message.error('Something went wrong')
        setLoading(false)
      })
        
    }

    const getModalContainer = () => {
        return <div className="predic-modal-body">
            <div className="user-container">
                <div className="userName">User ID</div>
                <input placeholder='Enter User ID' value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="prediction-container">
                <div className="home-team">
                    <span>{matchDetails.team1}</span>
                    <input type='number' value={score1}  onChange={(e) => setScore1(e.target.value)}/>
                </div>
                <div className="away-team">
                    <span>{matchDetails.team2}</span>
                    <input type='number' value={score2}  onChange={(e) => setScore2(e.target.value)}/>
                </div>
            </div>
        </div>
    }

    const clearState = () => {
        setScore1('')
        setScore2('')
        setUsername('')
        setLoading(false)
    }
    
    return <Modal 
        title="Predict your score" 
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel} 
        okText="Confirm"
        className="predict-modal"
        closable={false}
        centered
        destroyOnClose
        afterClose={clearState}
        okButtonProps={{disabled: !(username && score1 && score2), loading:isLoading}}
        getContainer={document.getElementById('root')}>
            {getModalContainer()}
      </Modal>
}

export default PredictModal