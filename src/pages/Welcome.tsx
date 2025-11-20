import React from 'react'
import Paragraph from '../components/Paragraph'
import "../styles/pages/Welcome.scss"
import ButtonExample from '../examples/ButtonExample'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <Paragraph text="Hi anh Hai!" />
      <Paragraph text="Nice to meet you." />
      <Button
        className='welcome-container__button-continue'
        label='Continue'
        onClick={() => navigate("/puzzle")}
      />
    </div>
  )
}

export default Welcome
