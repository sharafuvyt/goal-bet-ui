import { React, useEffect } from 'react';
import { UserDetailCard } from '../components/UserDetailCard';
import { UserSmallCard } from '../components/UserSmallCard';

export const MatchPage = () => {    
 
    useEffect(
        ()=>{
            const fetchUsers = async () =>{
                const response = await fetch('https://goal-bet-api.herokuapp.com/getUserDetails');
                const data = await response.json();
                console.log(data);
            };
            fetchUsers();
         }
    );
  

  return (
    <div className="MatchPage">
      <h1>Match</h1>
      <UserDetailCard />
      <UserSmallCard/>
      <UserSmallCard/>
      <UserSmallCard/>

    </div>
  );
}

