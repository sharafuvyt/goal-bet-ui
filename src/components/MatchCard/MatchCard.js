import { Button } from 'antd'
import React, { useState } from 'react'
import moment from 'moment'
import { findFlagUrlByCountryName } from "country-flags-svg";
import walesFlag from '../../../src/assets/Wales.png'
import scotlandFlag from '../../assets/Scotland.png'
import PredictModal from '../PredictModal/PredictModal'
import './MatchCard.scss'

const MatchCard = ({match}) => {

    const [isModalVisible, setIsModalVisible] = useState(false)

    const onPredict = () => {
        setIsModalVisible(true)
    }

    const getFlag = (country) => {
        let countryName = country
        if(country === 'England') {
            countryName = 'United Kingdom'
        } else if(country === 'Wales') {
            return walesFlag
        } else if(country === 'Scotland') {
            return scotlandFlag
        }
        return findFlagUrlByCountryName(countryName)
    }

    const flag1 = getFlag(match.team1)
    const flag2 = getFlag(match.team2)

    return <div className="match-card-container">
        <PredictModal isModalVisible={isModalVisible} handleCancel={() => setIsModalVisible(false)} matchDetails={match} flag1={flag1} flag2={flag2}/>
        <div className="details">
            <div className="team-details">
                <div className="team">
                    <div>
                        <img alt="" src={flag1}/>
                    </div>
                    <span>{match.team1}</span>
                </div>
                <div className="team">
                    <div>
                        <img alt="" src={flag2}/>
                    </div>
                    <span>{match.team2}</span>
                </div>
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