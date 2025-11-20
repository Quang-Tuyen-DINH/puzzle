import React, { useMemo } from 'react'
import Paragraph from '../components/Paragraph'
import "../styles/pages/Welcome.scss"
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'

function Welcome() {
  const navigate = useNavigate();
  const content = useMemo(() => ([
    {
      text: "Hi anh Hai!",
      key: "content-1"
    },
    {
      text: "Nice to meet you",
      key: "content-2"
    },
  ]), [])

  return (
    <div className="welcome-container">
      {content.map((c) => (
        <Paragraph key={c.key} text={c.text} />
      ))}
      <Button
        className='welcome-container__button-continue'
        label='Continue'
        onClick={() => navigate("/slide")}
      />
    </div>
  )
}

export default Welcome
