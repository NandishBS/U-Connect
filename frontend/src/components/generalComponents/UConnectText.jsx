import React from 'react'

function UConnectText({className}) {
  const style = {
    background: "linear-gradient(90deg, #ff0000, #ff5100, #ff9431)",
    WebkitBackgroundClip: "text",
    backgroundClip : "text",
    WebkitTextFillColor : "transparent",
}         
    return (
    <span style={style} className={className}>
        U-Connect
    </span>
  )
}

export default UConnectText
