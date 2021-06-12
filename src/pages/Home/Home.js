import React, { useState, useEffect } from 'react';
import MatchCard from '../../components/MatchCard/MatchCard'
import './Home.scss'

export const Home = () => {    
  const [matchDetails, setMatchDetails] = useState([])

  useEffect(
    ()=>{
        const fetchMatch = async () =>{
            const response = await fetch('https://goal-bet-api.herokuapp.com/getNextMatchDetails');
            const data = await response.json();
            setMatchDetails(data.data||[]);
        };
        fetchMatch();
     },[]
);

  return (
    <div className="home-container">
      <div className="header-home">UEFA EURO 2020</div>
      <div className="match-details">
        {matchDetails.map(match => <MatchCard match={match} key={match._id}/>)}
      </div>
    </div>
  );
}