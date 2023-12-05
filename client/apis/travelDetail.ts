import request from 'superagent'

const baseUrl = 'api/v1/travelDetail'

interface TravelDetail {
  newDate: string,
  newCity: string,
}

export async function addNewTravelDetail(travelDetail: TravelDetail, token: string) {
  const res = await request
    .post(`${baseUrl}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(travelDetail)
  return res.body
}
