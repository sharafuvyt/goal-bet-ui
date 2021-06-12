import { Button } from 'antd'
import React, { useState } from 'react'
import moment from 'moment'

import PredictModal from '../PredictModal/PredictModal'
import './MatchCard.scss'

const MatchCard = ({match}) => {

    const [isModalVisible, setIsModalVisible] = useState(false)

    const onPredict = () => {
        setIsModalVisible(true)
    }

    return <div className="match-card-container">
        <PredictModal isModalVisible={isModalVisible} handleCancel={() => setIsModalVisible(false)} matchDetails={match}/>
        <div className="details">
            <div className="team-details">
                <span>{match.team1}</span>
                <span>{match.team2}</span>
            </div>
            <div className="time-details">
                <span>{moment(match.Date).format('ddd, MM')}</span>
                <span>{match.time}</span>
            </div>
        </div>
        <div className="time-mobile">{`${moment(match.Date).format('ddd, MM')} ${match.time}`}</div>
        <div className="predict-button">
            <Button type="primary" onClick={onPredict}>Predict</Button>
        </div>
    </div>
}

export default MatchCard