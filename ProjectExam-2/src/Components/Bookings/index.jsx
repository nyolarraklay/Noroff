import React, { useEffect, useState } from 'react'
import useStore from '../Store'
import styled from 'styled-components';

const Container = styled.div`
  background-image: url(${props => props.url});
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 2rem;`;


function MyBookings() {
const apiKey = localStorage.getItem('apiKey')
const userName = localStorage.getItem('user')
const [user, setUser] = useState([])


  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/${userName}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            "X-Noroff-API-Key": apiKey,
          }
        });
        const json = await response.json();
        const user = json.data
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }
  , []);
const banner = user.banner
const { url:url, alt:alt } = banner || {};
const fullBanner = [];
if (url) fullBanner.push(url);
if (alt) fullBanner.push(alt);

const avatar = user.avatar

const { url: avatarUrl, alt: avatarAlt } = avatar || {};
const fullAvatar = [];
if (avatarUrl) fullAvatar.push(avatarUrl);
if (avatarAlt) fullAvatar.push(avatarAlt);

console.log(url);

  return (
    <div className='relative p-8'>
      <Container url={url}> 
        <div className="ml-20 ">
          <p className="text-white font-semibold">{user.name}</p>
          <p className="text-white text-sm">{user.email}</p>
        </div>
      </Container>
      <div className='absolute -bottom-0 left-8'>
        <div className='flex-shrink-0 h-20 w-20 rounded-full overflow-hidden' >
        <img className="h-full w-full object-cover" src={avatarUrl} alt={avatarAlt}/>
        </div>
       
      </div>
    </div>

    

  
  
  )
}

export default MyBookings