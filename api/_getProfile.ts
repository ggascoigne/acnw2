import fetch from 'isomorphic-fetch'

import { authDomain } from './_constants'
import { JsonError } from './_JsonError'

export const getProfile = async (authHeader: string) => {
  const options = {
    method: 'GET',
    headers: { authorization: authHeader },
  }

  return fetch(`https://${authDomain}/userinfo`, options).then(async (r) => {
    const json = await r.json()
    if (r.status !== 200) {
      throw new JsonError(r.status, json.error_description)
    }
    return json
  })
}
