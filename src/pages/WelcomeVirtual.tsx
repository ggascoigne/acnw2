import { Button, Card, Theme, createStyles, makeStyles, useTheme } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { IsMember } from 'utils/membership'

import { Acnw, ConfigDate } from '../components'
import { Banner } from '../components/Banner'
import { CardBody } from '../components/Card'
import { Page } from '../components/Page'
import { useSetting } from '../utils'
import { BecomeAMember } from './Memberships'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    banner: {
      textAlign: 'center',
    },
    deadline: {},
    deadlineExpired: {
      color: theme.palette.error.main,
      '&:after': {
        content: '" - date passed"',
      },
    },
    card: {
      paddingTop: 0,
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 24,
      paddingRight: 24,
    },
    title: {
      color: '#fff',
      fontWeight: 300,
      textTransform: 'none',
    },
    betaCard: {
      marginTop: 20,
      marginBottom: 20,
    },
  })
)

export const WelcomeVirtual: React.FC = () => {
  const isBeta = useSetting('display.test.warning')
  const theme = useTheme()
  const classes = useStyles()

  const titleElement = (
    <>
      <div className={classes.banner}>
        <Banner />
      </div>
      {isBeta && (
        <>
          <Card className={classes.betaCard} elevation={3}>
            <CardBody className={classes.card}>
              <h2 style={{ color: theme.palette.error.main }}>Beta</h2>
              <p>
                This version of the site is a work in progress. All changes should be considered temporary and are very
                likely to get rolled back.
              </p>

              <p>
                Feel free to look around, but if things seem broken or incomplete, assume that they are being worked on.
              </p>
            </CardBody>
          </Card>
        </>
      )}
      <h1>Welcome!</h1>
    </>
  )

  return (
    <Page title='Welcome' titleElement={titleElement}>
      <p>
        AmberCon Northwest is a fully scheduled role-playing game convention held annually in Troutdale, Oregon, just
        east of Portland. <Acnw.ConventionYear /> would have been AmberCon Northwest's <Acnw.Ordinal /> year at the
        venue that makes it unique,{' '}
        <a href='https://www.mcmenamins.com/edgefield' target='_new'>
          McMenamins Edgefield Bed and Breakfast Resort
        </a>
        . But given <Acnw.ConventionYear />
        's myriad challenges, we will hold our first ever virtual ACNW. The main activity of the convention will be
        hosted on a dedicated, private Discord server. Games may be held within that space or in other agreed upon
        virtual spaces such as Zoom, Roll 20, etc. at the GMs' discretion.
      </p>

      <p>
        While ACNW was originally devoted to Roger Zelazny's worlds of Amber and Phage Press's{' '}
        <strong>Amber Diceless RPG</strong> by Erick Wujcik. It has expanded over the years to encompass other diceless
        and indie RPGs of all kinds, and most recently Rite Publishing's <strong>Lords of Gossamer and Shadow</strong>,
        a new take and expansion upon the Amber Diceless gaming rules. Many games will expect some passing knowledge of
        at least the main characters and basic plot points of Zelazny's Amber novels.
      </p>

      <p>
        Use this site to learn how an AmberCon works&mdash;either usually or for this year; register for the convention;
        submit game events to the organizers; sign up for games when the event book is published; and check out the
        event books from past AmberCon Northwests.
      </p>

      <br />

      <p>
        AmberCon NW announcements and informal chats also appear on our{' '}
        <a href='https://www.facebook.com/groups/464742576942907/' target='_new'>
          Facebook group page
        </a>
        .
      </p>
      <br />

      <p>
        For information about other AmberCons in the US and abroad, go to{' '}
        <a href='http://www.ambercons.com' target='_new'>
          www.ambercons.com
        </a>
      </p>

      <BecomeAMember />

      <IsMember>
        <Button variant='outlined' color='primary' size='large' to='/gm' component={Link} style={{ marginTop: 8 }}>
          Become a GM
        </Button>
      </IsMember>

      <h2>Deadline dates this year</h2>
      <p>
        If you are accessing this site after{' '}
        <strong>
          <ConfigDate name='gameBookOpen' />
        </strong>
        , please contact the organizers by e-mail at <Acnw.ContactEmail /> before registering.
      </p>
      <p>NOTE: all dates are tentative due to potential technological restrictions.</p>
      <ul>
        <li>
          <span className={classes.deadlineExpired}>
            Initial registration: <ConfigDate name='registrationDeadline' />
          </span>
        </li>
        <li>
          <span className={classes.deadlineExpired}>
            Games and Events due: <ConfigDate name='gameSubmissionDeadline' />
          </span>
        </li>
        <li>
          <span className={classes.deadlineExpired}>
            Game Book preview to GMs: <ConfigDate name='gameGmPreview' />
          </span>
        </li>
        <li>
          <span className={classes.deadlineExpired}>
            Game Books open for selections: <ConfigDate name='gameBookOpen' />
          </span>
        </li>
        <li>
          <span className={classes.deadlineExpired}>
            Game Selections due: <ConfigDate name='gameChoicesDue' />
          </span>
        </li>
        <li>
          <span className={classes.deadline}>
            Schedule previews to GMs: <ConfigDate name='gmPreview' />
          </span>
        </li>
        <li>
          <span className={classes.deadline}>
            Schedules SENT to all players: <ConfigDate name='schedulesSent' />
          </span>
        </li>
      </ul>
    </Page>
  )
}
