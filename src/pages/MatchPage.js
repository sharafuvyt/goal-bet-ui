import { React, useEffect } from 'react';
import { UserDetailCard } from '../components/UserDetailCard';
import { UserSmallCard } from '../components/UserSmallCard';

export const MatchPage = () => {    
 
    useEffect(
        ()=>{
            const fetchUsers = async ()=>{
                const response = await fetch('');
                const data = await response.json();
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

