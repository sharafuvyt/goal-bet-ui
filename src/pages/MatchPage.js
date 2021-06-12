import { React, useEffect, useState } from 'react';
import {Button, message} from 'antd'
import { MatchDetailCard } from '../components/MatchDetailCard';
import './MatchPage.css'
import { UserDetailCard } from '../components/UserDetailCard';
import { UserSmallCard } from '../components/UserSmallCard';

export const MatchPage = () => {    
 
    const [match, setMatch] = useState({});
    const [username, setUsername] = useState('');
    const [score1, setScore1] = useState('');
    const [score2, setScore2] = useState('');
    const [isLoading, setLoading] = useState(false);

    const onSubmit = () => {
      setLoading(true)
      const body = {
        matchId: 1,
        userId: username,
        teamGoals1:score1,
        teamGoals2:score2
      }
      fetch("https://goal-bet-api.herokuapp.com/predictGoal", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(body)
    }).then(() => {
      message.success('Submitted your prediction')
      setLoading(false)
      setUsername('')
      setScore1('')
      setScore2('')
    }).catch(() => {
      message.error('Something went wrong')
      setLoading(false)
    })
    }
    // useEffect(
    //     ()=>{
    //         const fetchMatch = async () =>{
    //             const response = await fetch('https://goal-bet-api.herokuapp.com/getNextMatchDetails');
    //             const data = await response.json();
    //             setMatch(data);
    //         };
    //         fetchMatch();
    //      },[]
    // );
  

  return (
    <div className="MatchPage">
      <div className="header">UEFA EURO 2020</div>
      <div className="macth">Turkey vs Italy</div>
      <input placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <div className="score-container">
        <input className="match-iput" value={score1} onChange={(e) => setScore1(e.target.value)} placeholder='Score 1' type="number"/>
        <input className="match-iput" value={score2} onChange={(e) => setScore2(e.target.value)} placeholder='Score 2' type="number"/>
      </div>
      <Button type='primary' onClick={onSubmit} disabled={!(username && score1 && score2) || isLoading} loading={isLoading}>Send</Button>
    </div>
  );
}

