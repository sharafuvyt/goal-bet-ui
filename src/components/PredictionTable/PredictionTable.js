import React, { useEffect, useState } from 'react'
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
                setPredictionList(data||[])
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
        return <React.Fragment key={match._id}>
            <div className="header">
                <span>{`${match.team1} vs ${match.team2}`}</span>
            </div>
            {predictions.map(prediction => getRow(prediction))}
        </React.Fragment>
    }

    return<div className="prediction-table-container">
        {isPageLoading && <Loader/>}
        {predictionList.map(prediction => getMatchPredictions(prediction.predictions, prediction.match))}
        {(!(predictionList && predictionList.length) && !isPageLoading) && <div className="empty">No predictions yet</div>}
    </div>
}

export default PredictionTable