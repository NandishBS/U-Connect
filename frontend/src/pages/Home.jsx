import React, { useState } from 'react'
import Modal from '../components/generalComponents/Modal'

function Home() {
  const [edit, setEdit] = useState(false)
  const closeModal = ()=>{
    setEdit(false)
  }
  return (
    <div>
      this is home
      <button onClick={()=>{setEdit(true)}}>clickhere</button>
      {edit && <Modal close={closeModal} />}
    </div>
  )
}

export default Home