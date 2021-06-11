import { React, useEffect, useState } from 'react';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { UserDetailCard } from '../components/UserDetailCard';
import { UserSmallCard } from '../components/UserSmallCard';

export const MatchPage = () => {    
 
    const [match, setMatch] = useState({});
    useEffect(
        ()=>{
            const fetchMatch = async () =>{
                const response = await fetch('https://goal-bet-api.herokuapp.com/getNextMatchDetails');
                const data = await response.json();
                setMatch(data);
            };
            fetchMatch();
         },[]
    );
  

  return (
    <div className="MatchPage">
      <h1>Match</h1>
      <MatchDetailCard />
    </div>
  );
}

