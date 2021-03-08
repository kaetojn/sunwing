import { useState, useEffect } from "react"

const Countries = ({
  destinations,
  setActiveCity,
  setDestinations,
  setCountry,
  setShowCountries,
}) => {
  const [countries, setCountries] = useState(undefined)

  useEffect(() => {
    if (destinations) {
      const tempArray = destinations.map((country) => {
        return country.countryName
      })
      setCountries(tempArray)
    }
  }, [destinations])

  const handleClick = (country) => {
    setActiveCity(undefined)
    setShowCountries(false)
    destinations.forEach((item) => {
      if (item.countryName === country) {
        setCountry(country)
        setDestinations(item.destinations)
      }
    })
  }

  return (
    <div>
      <h2>Countries</h2>
      <div className='button-list'>
        {countries &&
          countries.map((country) => {
            return (
              <button
                onClick={() => handleClick(country)}
                key={country}
                className='button'
              >
                {country}
              </button>
            )
          })}
      </div>
    </div>
  )
}

export default Countries
