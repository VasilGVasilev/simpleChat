import React from 'react'

import Cam from '../../img/camera.png'
import Add from '../../img/addUser.png'
import More from '../../img/more.png'


const Chat = () => {
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>Billy</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Chat
