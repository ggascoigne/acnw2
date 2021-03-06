import { Request, Response } from 'express'

import { requireJwt } from '../_checkJwt'
import { configuration } from '../_constants'
import { handleError } from '../_handleError'
import { withApiHandler } from '../_standardHandler'
import { queryToExcelDownload } from './_queryToExcelDownload'

// /api/send/membershipReport
// auth token: required
// body: {
//  year?: number
// }

export default withApiHandler([
  requireJwt,
  async (req: Request, res: Response) => {
    try {
      const year = req.body?.year || configuration.year
      const query = `select 
        m.id as "Member Id",
        u.full_name as "Full Name",
        u.first_name as "First Name",
        u.last_name as "Last Name",
        u.email as "email",
        m.slots_attending as "Slots Attending",
        m.message as "Message" 
        from membership m join "user" u on m.user_id = u.id 
        where m.year = ${year}`
      await queryToExcelDownload(query, res)
    } catch (err) {
      handleError(err, res)
    }
  },
])
