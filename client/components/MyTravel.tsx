import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from '@tanstack/react-query'
import { getTravelDetail } from '../apis/travelDetail'

interface TravelDetail {
  id: number,
  user_id: string,
  date: string,
  city: string
}

function MyTravel() {
  const { getAccessTokenSilently } = useAuth0()

  async function retriveTravelDetail() {
    const accessToken = await getAccessTokenSilently()
    return await getTravelDetail(accessToken)
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['travelDetail'],
    queryFn: retriveTravelDetail,
  })

  if (isLoading) {
    return <p>Loading</p>
  }

  if (isError) {
    return <p>something went wrong</p>
  }

  return (
    <>
      <h2>My trips</h2>
      {data?.map((todo: TravelDetail) => (
        <div key={todo.id}>{todo.city}<br/>{todo.date}</div>
      ))}
    </>
  )
}

export default MyTravel
