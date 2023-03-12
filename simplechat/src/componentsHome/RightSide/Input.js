import React from 'react'
import Img from '../../img/addImage.png'
import Attach from '../../img/attach.png'

const Input = () => {
  return (
    <div className='input'>
      <input type="text" placeholder='Type something...' />
      <div className="send">
        <img src={Attach} alt="" />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <input type="text" style={{display:'none'}} id='file' />
        <button>Send</button>
      </div>
    </div>
  )
}

export default Input
