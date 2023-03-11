import React from 'react'

const Chats = () => {
  return (
    <div className='chats'>
      <div className='userChat'>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg" alt="" />
          <div className="userChatInfo">
              <span>Elon</span>
              <p>Hello </p>
          </div>
      </div>
      <div className='userChat'>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg" alt="" />
          <div className="userChatInfo">
              <span>Elon</span>
              <p>Hello </p>
          </div>
      </div>
    </div>
  )
}

export default Chats
