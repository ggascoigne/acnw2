import {
  DialogContentText,
  FormControlLabel,
  FormGroup,
  Switch,
  createStyles,
  makeStyles,
  useTheme,
} from '@material-ui/core'
import { CheckboxWithLabel, TextField } from 'components/Form'
import React, { useState } from 'react'
import { configuration, getSlotDescription, isNotPacificTime, range } from 'utils'

import { ConfigDate } from '../../components'
import { HasPermission, Perms } from '../../components/Auth'
import { GridContainer, GridItem } from '../../components/Grid'
import { MembershipFormContent } from './membershipUtils'

const useStyles = makeStyles(() =>
  createStyles({
    slotSelection: {
      position: 'relative',
      paddingTop: 0,
    },
    slotToggleWrapper: {
      position: 'absolute',
      top: 16,
      right: 50,
    },
  })
)

export const MembershipStepVirtual: React.FC<MembershipFormContent> = ({ prefix = '' }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [showPT, setShowPT] = useState(false)

  return (
    <>
      <HasPermission permission={Perms.IsAdmin}>
        <DialogContentText style={{ color: theme.palette.error.main }}>Admin Mode</DialogContentText>
      </HasPermission>
      <DialogContentText>
        Please select the slots you <strong>intend</strong> to play. To make sure each slot has coverage for every
        player &mdash; and to not disappoint too many GMs by overbooking and then cancelling unnecessary games &mdash;
        we try to get these numbers as accurate as possible.
      </DialogContentText>
      <DialogContentText>
        We are aware that circumstances change, or that the siren song of an excellent game description might pull you
        into a slot you thought you would skip. Just give us your best guess for now. You will be able to edit this
        information up to the Games Due Deadline, <ConfigDate name='gameSubmissionDeadline' />.
      </DialogContentText>
      <DialogContentText>
        Note that some games offered may cover more than one slot time or purposely overrun their slot times. This will
        be specified in the game book once it is published. In addition, there may be other game times available
        "overnight" Pacific time &mdash; that is, during the day U.K. and European time. These will be organized
        separately from the ACNW main game book.
      </DialogContentText>
      <div className={classes.slotSelection}>
        {isNotPacificTime() && (
          <div>
            <FormControlLabel
              control={
                <Switch
                  checked={showPT}
                  onChange={() => setShowPT((old) => !old)}
                  name={`${prefix}showLocal`}
                  color='primary'
                />
              }
              label='Show slot times in Pacific time'
            />
          </div>
        )}
        <FormGroup>
          {range(7).map((i) => (
            <CheckboxWithLabel
              key={i}
              Label={{
                label: getSlotDescription({
                  year: configuration.year,
                  slot: i + 1,
                  local: !showPT,
                }),
                labelPlacement: 'end',
              }}
              name={`${prefix}slotsAttendingData[${i}]`}
            />
          ))}
        </FormGroup>
      </div>
      <GridContainer spacing={2}>
        <GridItem xs={12} md={12}>
          <TextField name={`${prefix}message`} label='Messages' margin='normal' fullWidth multiline />
        </GridItem>
        <HasPermission permission={Perms.IsAdmin}>
          <GridItem xs={12} md={12}>
            <CheckboxWithLabel label='Attending' name='attending' />
          </GridItem>
          <GridItem xs={12} md={12}>
            <CheckboxWithLabel label='Volunteer' name='volunteer' />
          </GridItem>
        </HasPermission>
      </GridContainer>
    </>
  )
}
