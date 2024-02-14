import React from 'react'

function UpdateGuide() {
    const handleSerachClicked=()=>{
        
    }
  return (
    <div>
        <div>
           <lable>ProjectID</lable> 
           <input  type='text' placeholder='BTxxxx'/>
           <button type='submit' onClick={handleSerachClicked}>Search</button>
        </div>
    </div>
  )
}

export default UpdateGuide