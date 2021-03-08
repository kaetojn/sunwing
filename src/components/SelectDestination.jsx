import { useState } from "react"
import Excursion from "./Excursion"
import Countries from "./Countries"

const SelectDestination = ({ destinations }) => {
  const [dest, setDestinations] = useState(undefined)
  const [country, setCountry] = useState(undefined)
  const [activeCity, setActiveCity] = useState(undefined)
  const [showCountries, setShowCountries] = useState(true)

  return (
    <>
      {destinations && showCountries && (
        <Countries
          destinations={destinations}
          setDestinations={setDestinations}
          setCountry={setCountry}
          setActiveCity={setActiveCity}
          setShowCountries={setShowCountries}
        />
      )}

      {country && dest && (
        <Excursion
          country={country}
          destinations={dest}
          activeCity={activeCity}
          setActiveCity={setActiveCity}
          setShowCountries={setShowCountries}
          showCountries={showCountries}
        />
      )}
    </>
  )
}

export default SelectDestination
