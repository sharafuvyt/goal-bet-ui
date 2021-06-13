import React, { useState, useEffect } from 'react';
import {Button} from 'antd'
import MatchCard from '../../components/MatchCard/MatchCard'
import PredictionTable from '../../components/PredictionTable/PredictionTable'
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal'
import Loader from '../../components/Loader/Loader'
import './Home.scss'

export const Home = () => {    
  const [matchDetails, setMatchDetails] = useState([])
  const [isTableVisible, setIsTableVisible] = useState(false)
  const [isModalVisible, setModalVisible] = useState(false)
  const [isPageLoading, setLoading] = useState(true)

  useEffect(
    ()=>{
        const fetchMatch = async () =>{
            const response = await fetch('https://goal-bet-api.herokuapp.com/getNextMatchDetails');
            const data = await response.json();
            setLoading(false)
            setMatchDetails(data.data||[]);
        };
        fetchMatch();
     },[]
  );

  const onConfirm = () => {
    setIsTableVisible(true)
    setModalVisible(false)
  }

  return (
    <div className="home-container">
      <div className="header-home">UEFA EURO 2020</div>
      {isPageLoading && <Loader/>}
      {!isTableVisible && <div className={`match-details${matchDetails.length === 1 ? ' single' : ''}`}>
        {matchDetails.map(match => <MatchCard match={match} key={match._id}/>)}
      </div>}
      <div className="table-container">
        {!isTableVisible && !isPageLoading&&  <Button type="primary" onClick={() => setModalVisible(true) }> View all predictions</Button>}
        {isTableVisible && <PredictionTable/>}
      </div>
      <ConfirmModal isModalVisible={isModalVisible} handleCancel={() => setModalVisible(false)} handleOk={onConfirm}/>
    </div>
  );
}