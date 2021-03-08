import { useState, useEffect } from "react"
import "./App.css"
import SelectDestination from "./components/SelectDestination"
import header from "./assets/header.png"

const App = () => {
  const [destinations, setDestinations] = useState(undefined)

  const getDestinations = () => {
    fetch(
      "https://hotelinfoservice.sunwingtravelgroup.com/en/AllHotelDestinationList"
    )
      .then((response) => response.json())
      .then((data) => setDestinations(data))
  }

  useEffect(() => {
    getDestinations()
  }, [])
  return (
    <div className='App'>
      <img src={header} className="header" alt='header' />
      <SelectDestination destinations={destinations} />
    </div>
  )
}

export default App
