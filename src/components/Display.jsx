import { useState, useEffect } from "react"

const Display = ({
  excursions,
  subCategories,
  showCities,
  allActivities,
  showAllActivities,
}) => {
  const [activities, setActivities] = useState(undefined)

  const parseExcursions = (ex, sub) => {
    if (ex && sub) {
      const result = ex.map((exs) => {
        const { subCategories } = exs
        const temp = subCategories.map((subCategory) => {
          if (sub.includes(subCategory.subCategoryName)) {
            const { excursions } = subCategory
            return excursions
          }
        })
        return temp
      })

      var merged = [].concat.apply([], result).filter((el) => el !== undefined)
      setActivities(merged)
    }
  }
  //   useEffect(() => {
  //     parseExcursions(excursions, subCategories)
  //   }, [subCategories])

  useEffect(() => {
    if (showAllActivities) {
      parseExcursions(excursions, allActivities)
    } else {
      parseExcursions(excursions, subCategories)
    }
  }, [subCategories, showAllActivities, allActivities])

  return (
    <>
      {!showCities && (
        <>
          <div className='excursion-container'>
            {activities &&
              activities.map((activity) => {
                return activity.map((excursion) => {
                  return (
                    <div className='excursion' key={excursion.excursionCode}>
                      <h3>{excursion.excursionName}</h3>
                      <ul className='list'>
                        {excursion.excursionShortDescription
                          .split("●")
                          .map((desc) => {
                            return <li key={desc}>{desc}</li>
                          })}
                      </ul>

                      <div className='image-containter'>
                        <img
                          className='image'
                          src={`https:${excursion.excursionImages["Img16X9"]}`}
                        />
                      </div>
                    </div>
                  )
                })
              })}
          </div>
        </>
      )}
    </>
  )
}

export default Display
