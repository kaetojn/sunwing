const Cities = ({
  country,
  excursionDestinations,
  setActiveCity,
  setCategoryList,
  setShowCountries,
  showCountries,
  setShowCities,
  showCities,
}) => {
  const setCategories = (exc) => {
    const categories = []
    exc.forEach((excursion) => {
      if (!categories.includes(excursion.categoryName)) {
        categories.push(excursion.categoryName)
      }
    })
    setCategoryList(categories)
  }

  const getActiveCity = (city, exc) => {
    setActiveCity(city)
    setCategories(exc)
    setShowCities(false)
  }

  return (
    <>
      {!showCountries && showCities && (
        <>
          <div className='flex-container'>
            <button
              className='nav-button'
              onClick={() => setShowCountries(true)}
            >
              <h3>Back</h3>
            </button>
            <h2>{country} Cities</h2>
          </div>
          <div className='button-list'>
            {excursionDestinations &&
              excursionDestinations.map((country) => {
                return (
                  <button
                    onClick={() =>
                      getActiveCity(country.destination, country.excursions)
                    }
                    className='button'
                    key={country.destination}
                  >
                    {country.destination}
                  </button>
                )
              })}
          </div>
        </>
      )}
    </>
  )
}

export default Cities
