import { useState, useEffect } from "react"
import Display from "./Display"
import Cities from "./Cities"
import Categories from "./Categories"

const Excursion = ({
  country,
  destinations,
  activeCity,
  setActiveCity,
  setShowCountries,
  showCountries,
}) => {
  const [excursionDestinations, setExcursionsDestinations] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [subCategories, setSubCategoriesList] = useState(undefined)
  const [excursions, setExcursions] = useState(undefined)
  const [showCities, setShowCities] = useState(true)
  const [allActivities, setAllActivities] = useState(undefined)
  const [showAllActivities, setShowAllActivities] = useState(false)

  async function fetchExcursion(con, dest) {
    const response = await fetch(
      `https://hotelinfoservice.sunwingtravelgroup.com/1/en/excursionsCountryDestination/${con}}/${dest}`
    )
    return response.json()
  }

  async function buildExcursions(c, dests) {
    const exs = dests.map(async function (d) {
      const response = await fetchExcursion(c, d)
      return { destination: d, excursions: response }
    })
    const resolvedResponse = await Promise.all(exs)
    setExcursionsDestinations(resolvedResponse)
  }

  useEffect(() => {
    if ((country, destinations)) {
      buildExcursions(country, destinations)
    }
  }, [country, destinations])

  return (
    <div>
      {excursionDestinations && (
        <Cities
          country={country}
          excursionDestinations={excursionDestinations}
          setActiveCity={setActiveCity}
          setCategoryList={setCategoryList}
          setShowCountries={setShowCountries}
          showCountries={showCountries}
          showCities={showCities}
          setShowCities={setShowCities}
        />
      )}

      {activeCity && categoryList && (
        <Categories
          categoryList={categoryList}
          activeCity={activeCity}
          excursionDestinations={excursionDestinations}
          setExcursions={setExcursions}
          setSubCategoriesList={setSubCategoriesList}
          subCategories={subCategories}
          setShowCities={setShowCities}
          showCities={showCities}
          setShowAllActivities={setShowAllActivities}
          setAllActivities={setAllActivities}
        />
      )}

      {excursions && subCategories && (
        <Display
          excursions={excursions}
          subCategories={subCategories}
          showCities={showCities}
          allActivities={allActivities}
          showAllActivities={showAllActivities}
        />
      )}
    </div>
  )
}

export default Excursion
