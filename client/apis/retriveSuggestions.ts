import request from 'superagent'

import { Suggestion } from '../../models/ClientSuggestion'

const baseUrl = 'api/v1/suggestions'

export async function retriveSuggestions(city: string, token: string) {
  const res = await request
    .get(`${baseUrl}/search?city=${city}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
  return res.body as Suggestion[]
}
