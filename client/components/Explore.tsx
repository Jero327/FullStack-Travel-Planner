import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'
import { Suggestion } from '../../models/suggestion'
import { retriveSuggestions } from '../apis/retriveSuggestions'
import { addNewTravelDetail } from '../apis/travelDetail'

function Explore() {
  const [city, setCity] = useState('')
  const [date, setDate] = useState('')
  const [searchData, setSearchData] = useState([] as Suggestion[])
  const { user, getAccessTokenSilently } = useAuth0()

  const { isAuthenticated, loginWithRedirect } = useAuth0()

  if (!isAuthenticated) {
    loginWithRedirect()
    return null
  }

  function handCitySelect(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault()
    setCity(e.currentTarget.value)
    console.log(city)
  }

  function handleDepartureDate(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    setDate(e.currentTarget.value)
  }

  function handleReturnDate(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    setDate(`${date} to ${e.currentTarget.value}`)
  }

  async function handleRetriveSuggestions(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault()
    console.log('clicked')
    console.log(date)

    const newTravelDetail = {
      newDate: date,
      newCity: city,
    }
    const accessToken = await getAccessTokenSilently()
    if (city.length > 1) {
      if (user && user.sub) {
        const response = await retriveSuggestions(city, accessToken)

        setSearchData(response)
        console.log(searchData)

        const [newTravelDetailId] = await addNewTravelDetail(
          newTravelDetail,
          accessToken
        )
        console.log(newTravelDetailId)
        setCity('')
        setDate('')
      }
    }
  }

  return (
    <>
      <h2>Plan a new trip</h2>
      <label htmlFor="city">Choose a city:</label>

      <select name="city" id="city" onChange={handCitySelect}>
        <option value="">--Please choose an option--</option>
        <option value="Auckland">Auckland</option>
        <option value="Paris">Paris</option>
        <option value="Sydney">Sydney</option>
        <option value="Tokyo">Tokyo</option>
        <option value="New York">New York</option>
        <option value="Singapore">Singapore</option>
        <option value="Dubai">Dubai</option>
        <option value="Rome">Rome</option>
        <option value="Istanbul">Istanbul</option>
        <option value="Wellington">Wellington</option>
      </select>

      <div>
        <form>
          <label htmlFor="departureDate">Departure Date:</label>
          <input
            type="date"
            id="departureDate"
            name="departureDate"
            onChange={handleDepartureDate}
          />
          <label htmlFor="returnDate">Return Date:</label>
          <input
            type="date"
            id="returnDate"
            name="returnDate"
            onChange={handleReturnDate}
          />
        </form>
      </div>

      <button
        type="button"
        className="btn start-btn"
        onClick={handleRetriveSuggestions}
      >
        Start planning
      </button>
      <div className="suggestions-container">
        <div className="mx-auto">
          {searchData.length>1 && (
            <div>
              <h2>Top place</h2>
              {searchData
                .filter((c) => c.category === 'place')
                .map((u) => (
                  <div
                    key={u.id}
                    className="flex justify-between items-center py-2"
                  >
                    <p key={u.id}>{u.name}</p>
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="mx-auto">
          {searchData.length > 1 && (
            <div>
              <h2>Top restaurant</h2>
              {searchData
                .filter((c) => c.category === 'restaurant')
                .map((u) => (
                  <div
                    key={u.id}
                    className="flex justify-between items-center py-2"
                  >
                    <p key={u.id}>{u.name}</p>
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="mx-auto">
          {searchData.length > 1 && (
            <div>
              <h2>Top hotel</h2>
              {searchData
                .filter((c) => c.category === 'hotel')
                .map((u) => (
                  <div
                    key={u.id}
                    className="flex justify-between items-center py-2"
                  >
                    <p key={u.id}>{u.name}</p>
                  </div>
                ))}
            </div>
          )}
        </div>

      </div>
    </>
  )
}

export default Explore
