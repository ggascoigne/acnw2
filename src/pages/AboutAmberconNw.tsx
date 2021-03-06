import { useTheme } from '@material-ui/core'
import { Acnw, ConventionsDatesFull } from 'components'
import { Page } from 'components/Page'
import React from 'react'

import { SlotFormat, configuration, getSlotDescription, range } from '../utils'

const AboutAmberconNw = () => {
  const theme = useTheme()

  return (
    <Page
      title='About'
      titleElement={
        <h1>
          About <span style={{ color: theme.palette.error.main }}>virtual</span> AmberCon NW
        </h1>
      }
    >
      <h2>What is AmberCon NW?</h2>
      <p>
        AmberCon Northwest is a fully scheduled role-playing game convention devoted to Roger Zelazny's worlds of Amber
        using Phage Press's Amber Diceless RPG by Erick Wujcik, and other diceless / story-focused / character driven
        RPGs.
      </p>

      <p>
        The convention is open to players of all levels of experience; our members are united by their interest in
        diceless role-playing and Zelazny's work.
      </p>

      <p>
        ACNW 2020 will take place virtually, facilitated through a private Discord server,
        <ConventionsDatesFull pre='from' intra='through' post='.' /> There will be virtual "tours" of the Discord space
        and introductions to use of Discord led by volunteers in the weeks preceding the convention. Games may take
        place using Discord with or without video or through other technology as organized separately by the GMs.
      </p>

      <p>
        If you have never attended an AmberCon before and have questions about the setup or scheduling, please contact
        the organizers at <Acnw.ContactEmail />.
      </p>

      <h2>What do we get?</h2>

      <p>
        AmberCon NW offers a <strong>long weekend</strong> of scheduled gaming events,{' '}
        <strong>Thursday evening through Sunday evening</strong>. All members choose the game events they wish to play
        and receive their schedule in advance of the convention. Likewise, GMs receive their player lists, so everyone
        can prepare in advance.
      </p>

      <p>
        We are charging <strong>$15</strong> to support ACNW's annual expenses.
      </p>

      <p>The convention will be divided into seven 4-hour event slots:</p>

      <ul>
        {range(7).map((i) => (
          <li key={i}>
            {getSlotDescription({
              year: configuration.year,
              slot: i + 1,
              local: false,
              altFormat: SlotFormat.ALT,
            })}
          </li>
        ))}
      </ul>

      <p>
        These times were chosen to maximize the ability of our East Coast U.S., English, and European attendees to
        participate. You may attend as many or as few slots as you feel comfortable attending, but we will ask you to
        choose and commit to them in advance using our regular game scheduling and assignment process. In other years,
        AmberCon has been able to provide game spaces for every slot any member chooses to attend. This year, depending
        on the number of games that come in during our very constrained submission time, we may have to give some pass
        times. As always, we will provide a way for you to indicate your highest priority games.
      </p>

      <p>
        Though the formal slots are four hours long, GMs are welcome to run longer games that run over more than one
        slot time. Any variations will be noted in the game book.
      </p>

      <p>
        There may also be additional game events hosted at other times, particularly for the UK and European attendees.
        Those games will be organized separately.
      </p>

      <p>
        All ACNW events are run by volunteer member GMs -- this could mean you! For a 150-person convention we need
        about 25 games in each of the event slots -- that's 175 events! We hope almost every attendee will think about
        running at least one event. Check out the Become a GM section here on the web site to learn more.
      </p>
    </Page>
  )
}

export default AboutAmberconNw
