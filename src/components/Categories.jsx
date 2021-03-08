import { useEffect } from "react"

const Categories = ({
  categoryList,
  activeCity,
  excursionDestinations,
  setExcursions,
  setSubCategoriesList,
  subCategories,
  setShowCities,
  showCities,
  setShowAllActivities,
  setAllActivities,
}) => {
  const filterByCategory = (city, category) => {
    setShowAllActivities(false)
    excursionDestinations.forEach((el) => {
      if (el.destination === city) {
        const { excursions } = el

        excursions.forEach((categories) => {
          if (categories.categoryName === category) {
            const filteredCategories = []

            categories.subCategories.forEach((sub) => {
              if (!filteredCategories.includes(sub.subCategoryName)) {
                filteredCategories.push(sub.subCategoryName)
              }
            })
            setSubCategoriesList(filteredCategories)
          }
        })
      }
    })
  }

  const filterBySubCategory = (sub) => {
    setShowAllActivities(false)
    setSubCategoriesList([sub])
  }

  const buildExcursions = (excursionDestinations, activeCity) => {
    excursionDestinations.forEach((el) => {
      if (el.destination === activeCity) {
        const { excursions } = el
        setExcursions(excursions)
        const allSubCat = excursions.map((excursion) => {
          const { subCategories } = excursion
          const subCategoryNameList = []
          subCategories.forEach((subCategory) => {
            return subCategoryNameList.push(subCategory.subCategoryName)
          })
          return subCategoryNameList
        })
        var merged = [].concat.apply([], allSubCat)

        setSubCategoriesList([...new Set(merged)])
        setAllActivities([...new Set(merged)])
      }
    })
  }

  useEffect(() => {
    buildExcursions(excursionDestinations, activeCity)
  }, [])

  return (
    <>
      {!showCities && (
        <>
          <div className='flex-container'>
            <button className='nav-button' onClick={() => setShowCities(true)}>
              <h3>Back</h3>
            </button>
            <h2>{activeCity} Excursions</h2>
          </div>
          <div className='flex-container'>
            <button
              className='nav-button'
              onClick={() => setShowAllActivities(true)}
            >
              <h3>Show All</h3>
            </button>
            <div className='category-container'>
              <p>Filter By Categories</p>
              {categoryList &&
                categoryList.map((category) => {
                  return (
                    <button
                      onClick={() => filterByCategory(activeCity, category)}
                      className='button'
                      key={category}
                    >
                      {category}
                    </button>
                  )
                })}
            </div>
            <div className='category-container'>
              <p>Filter By Sub-Categories</p>
              {subCategories &&
                subCategories.map((subCategory) => {
                  return (
                    <button
                      onClick={() => filterBySubCategory(subCategory)}
                      className='button'
                      key={subCategory}
                    >
                      {subCategory}
                    </button>
                  )
                })}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Categories
