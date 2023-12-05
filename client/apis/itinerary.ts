import request from 'superagent'

const baseUrl = 'api/v1/itinerary'

interface NewItinerary {
  detailId: number,
  suggestionId: number,
}

export async function addNewItinerary(newItinerary: NewItinerary, token: string) {
  await request
    .post(`${baseUrl}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(newItinerary)
}
