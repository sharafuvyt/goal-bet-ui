import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import Loader from '../Loader/Loader'
import './PredictionTable.scss'

const PredictionTable = () => {

    const [predictionList, setPredictionList] = useState([])
    const [isPageLoading, setLoading] = useState(true)

    useEffect(
        ()=>{
            const fetchMatch = async () =>{
                const response = await fetch('https://goal-bet-api.herokuapp.com/getPredictions')
                const data = await response.json()
                setPredictionList(data.data||[])
                setLoading(false)
            };
            fetchMatch()
         },[]
    );

    const getRow= (prediction) => {
        return<div className='row-container'key={prediction._id}>
            <div className="user">
                <span>{prediction.userId}</span>
            </div>
            <div className="user-prediction">
                <span>{`${prediction.teamGoals1} - ${prediction.teamGoals2}`}</span>
            </div>
        </div>
    }

    const getMatchPredictions = (predictions, match) => {
        return <React.Fragment key={match}>
            <div className="header">
                <span>{match}</span>
            </div>
            {predictions.map(prediction => getRow(prediction))}
        </React.Fragment>
    }

    const newList = _.groupBy(predictionList, 'matchId')
    const matches = Object.keys(newList)

    return<div className="prediction-table-container">
        {isPageLoading && <Loader/>}
        {matches.map(match => getMatchPredictions(newList[match], match))}
    </div>
}

export default PredictionTable