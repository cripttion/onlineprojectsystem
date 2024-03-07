import React from 'react'
import Layouts from '../../../Layouts/Layouts'
function UpdateGuide() {
    const handleSerachClicked=()=>{
        
    }
  return (
    <Layouts>
      <div className='w-full flex justify-center items-center'>
        <div className='mt-10 flex flex-col p-4 bg-white w-fit gap-5'>
           <label>ProjectID</label> 
           <input  type='text' placeholder='BTxxxx' className='border border-gray-400 p-2'/>
           <button type='submit'  className="bg-bgBlueDark text-white rounded-md p-2" onClick={handleSerachClicked}>Search</button>
        </div>
        </div>
        </Layouts>
  )
}

export default UpdateGuide