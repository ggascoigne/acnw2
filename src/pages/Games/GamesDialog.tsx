import { Dialog, DialogContentText, TextField as MuiTextField, Typography, useTheme } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { Game, useGetGamesByAuthorQuery } from 'client'
import { Perms } from 'components/Auth'
import { EditDialog } from 'components/EditDialog'
import { CheckboxWithLabel, SelectField, TextField, TextFieldProps } from 'components/Form'
import { GraphQLError } from 'components/GraphQLError'
import { Loader } from 'components/Loader'
import { FormikHelpers } from 'formik'
import React from 'react'
import { configuration, getSlotDescription, notEmpty, pick, playerPreferenceOptions, range, useUser } from 'utils'
import Yup from 'utils/Yup'

import { HasPermission } from '../../components/Auth'
import { GridContainer, GridItem } from '../../components/Grid'
import { GameDialogFormValues, useEditGame } from './gameHooks'

interface GamesDialogProps {
  open: boolean
  onClose: (event?: any) => void
  initialValues?: GameDialogFormValues
}

const genreOptions = [
  'Adventure / Heroic',
  'Dark / Grim',
  'Exploration',
  'Horror',
  'Humor / Spoof',
  'Mystery',
  'Sci-Fi / Futuristic',
  'Strategy',
  'Tense / Real-time',
  'Other; N/A',
]

const typeOptions = [
  'Traditional Amber',
  'Throne War',
  'Alternate Amber',
  'Amber with a Twist',
  'Non - Amber',
  'Other; N/A',
]

const estimatedLengthOptions = configuration.virtual
  ? ['3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8']
  : ['3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '10', '12+']

const morningGamesOptions = ['Starts on time', 'Starts at 9.30 am', 'Starts at 10.00 am', 'Starts at 10.30 am']

const defaultValues: GameDialogFormValues = {
  slotId: 0,
  name: '',
  gmNames: '',
  description: '',
  genre: '',
  type: '',
  setting: '',
  charInstructions: '',
  playerMin: configuration.virtual ? 2 : 4,
  playerMax: configuration.virtual ? 7 : 10,
  playerPreference: '',
  returningPlayers: '',
  playersContactGm: false,
  gameContactEmail: '',
  estimatedLength: configuration.virtual ? '4' : '5',
  slotPreference: 0,
  lateStart: morningGamesOptions[0],
  lateFinish: false,
  slotConflicts: '',
  message: '',
  teenFriendly: false,
  year: configuration.year,
}

const validationSchema = Yup.object().shape({
  name: Yup.string().min(2).max(100).required(),
  gmNames: Yup.string().min(2).max(255).required(),
  description: Yup.string()
    .min(2)
    .max(10 * 1024)
    .required(),
  setting: Yup.string()
    .min(2)
    .max(10 * 1024),
})

export const SlotOptionsSelect: React.ComponentType<TextFieldProps & { year: number }> = (props) => {
  const { select, year, ...rest } = props
  const selectValues = range(7).reduce(
    (acc, current) => {
      acc.push({
        value: current + 1,
        text: getSlotDescription({ year, slot: current + 1, local: true }),
      })
      return acc
    },
    [{ value: 0, text: "Any Slot -- Doesn't Matter" }]
  )

  return <SelectField {...rest} selectValues={selectValues} />
}

export const GamesDialog: React.FC<GamesDialogProps> = ({ open, onClose, initialValues = defaultValues }) => {
  const editing = initialValues !== defaultValues
  const theme = useTheme()
  const { userId } = useUser()
  const createOrUpdateGame = useEditGame(onClose, initialValues)

  const onSubmit = async (values: GameDialogFormValues, actions: FormikHelpers<GameDialogFormValues>) => {
    await createOrUpdateGame(values)
  }

  const { error, data } = useGetGamesByAuthorQuery({
    id: userId!,
  })

  if (error) {
    return <GraphQLError error={error} />
  }
  if (!data) {
    return (
      <Dialog disableBackdropClick fullWidth maxWidth='md' open>
        <Loader />
      </Dialog>
    )
  }

  const unsorted: Game[] = data.user?.authoredGames.nodes.filter(notEmpty) as Game[]
  const priorGamesList = unsorted
    .concat()
    .sort((a, b) => b.year - a.year || (a.slotId ?? 0) - (b.slotId ?? 0) || -b.name.localeCompare(a.name))

  const onCopyGameChange =
    (values: GameDialogFormValues, setValues: (values: GameDialogFormValues, shouldValidate?: boolean) => void) =>
    (_: any, value: Game | null): void => {
      if (!value) return
      setValues({
        ...values,
        ...pick(
          value,
          'name',
          'gmNames',
          'description',
          'genre',
          'type',
          'setting',
          'charInstructions',
          'playerMin',
          'playerMax',
          'playerPreference',
          'returningPlayers',
          'playersContactGm',
          'gameContactEmail',
          'estimatedLength',
          'slotPreference',
          'lateStart',
          'lateFinish',
          'slotConflicts',
          'message',
          'teenFriendly'
        ),
      })
    }

  return (
    <EditDialog
      initialValues={initialValues}
      onClose={onClose}
      open={open}
      onSubmit={onSubmit}
      title='Game'
      validationSchema={validationSchema}
      isEditing={editing}
    >
      {({ values, setValues }) => (
        <>
          <HasPermission permission={Perms.FullGameBook}>
            <DialogContentText style={{ color: theme.palette.error.main }}>Admin Mode</DialogContentText>
          </HasPermission>
          <GridContainer spacing={2}>
            {!!priorGamesList.length && (
              <GridItem xs={12} md={12}>
                <Autocomplete
                  id='prior-games'
                  options={priorGamesList}
                  groupBy={(game) => `${game.year}`}
                  getOptionLabel={(game) => `${game.slotId ?? 0}: ${game.name}`}
                  fullWidth
                  renderInput={(params) => (
                    <MuiTextField
                      {...params}
                      label="Copy game definition from a previous year's game"
                      variant='outlined'
                    />
                  )}
                  onChange={onCopyGameChange(values, setValues)}
                />
              </GridItem>
            )}
            <GridItem xs={12} md={12}>
              <TextField name='name' label='Game Title' margin='normal' fullWidth required autoFocus />
            </GridItem>
            <HasPermission permission={Perms.FullGameBook}>
              <GridItem xs={12} md={12}>
                <TextField name='slotId' label='Slot' margin='normal' fullWidth type='number' />
              </GridItem>
              <CheckboxWithLabel label='Game Full?' name='full' />
            </HasPermission>
            <GridItem xs={12} md={12}>
              <TextField
                name='gmNames'
                label='Game Master(s), one per line'
                margin='normal'
                fullWidth
                multiline
                required
              />
            </GridItem>
            <GridItem xs={12} md={12}>
              <TextField name='description' label='Game Description' margin='normal' fullWidth multiline required />
            </GridItem>
            <GridItem container spacing={2} xs={12} md={12} style={{ paddingRight: 0 }}>
              <GridItem xs={12} md={6}>
                <SelectField
                  required
                  name='genre'
                  label='Genre'
                  margin='normal'
                  fullWidth
                  selectValues={genreOptions}
                />
              </GridItem>
              <GridItem xs={12} md={6} style={{ paddingRight: 0 }}>
                <SelectField required name='type' label='Type' margin='normal' fullWidth selectValues={typeOptions} />
              </GridItem>
            </GridItem>
            <GridItem xs={12} md={12}>
              <CheckboxWithLabel label='Is the game Teen Friendly?' name='teenFriendly' />
            </GridItem>
            <GridItem xs={12} md={12}>
              <TextField
                name='setting'
                label='Setting - Where/When in the Multiverse'
                margin='normal'
                fullWidth
                multiline
              />
            </GridItem>
            <GridItem xs={12} md={12}>
              <TextField
                name='charInstructions'
                label='Character/Player Instructions & Restrictions'
                margin='normal'
                fullWidth
                multiline
              />
            </GridItem>
            <GridItem xs={12} md={12}>
              <Typography className='MuiFormControlLabel-label MuiFormLabel-root'>Number of Players</Typography>
            </GridItem>
            <GridItem container spacing={2} xs={12} md={12} style={{ paddingRight: 0 }}>
              <GridItem xs={12} md={6}>
                <TextField name='playerMin' label='Min' margin='normal' fullWidth type='number' required />
              </GridItem>
              <GridItem xs={12} md={6} style={{ paddingRight: 0 }}>
                <TextField name='playerMax' label='Max' margin='normal' fullWidth type='number' required />
              </GridItem>
            </GridItem>
            <GridItem xs={12} md={12}>
              <SelectField
                name='playerPreference'
                label='Player Preference'
                margin='normal'
                fullWidth
                selectValues={playerPreferenceOptions}
              />
            </GridItem>
            <GridItem xs={12} md={12}>
              <TextField
                name='returningPlayers'
                label='If you have Returning Players, please list them here'
                margin='normal'
                fullWidth
                multiline
              />
            </GridItem>
            <GridItem xs={12} md={12}>
              <CheckboxWithLabel label='Should your players contact you before the con?' name='playersContactGm' />
            </GridItem>
            <GridItem xs={12} md={12}>
              <TextField
                name='gameContactEmail'
                label='Game Contact email'
                margin='normal'
                fullWidth
                inputProps={{ autoCapitalize: 'none' }}
              />
            </GridItem>
            <GridItem xs={12} md={12}>
              <p>
                You are welcome to start and end the game at any time (within reason), but if the game overlaps two
                slots, please enter two games and mark them as parts one and two.
              </p>
              <p>Please keep in mind that you might have players from multiple time zones in your game.</p>
              <SelectField
                name='estimatedLength'
                label='Estimated Length'
                margin='normal'
                fullWidth
                selectValues={estimatedLengthOptions}
              />
            </GridItem>
            <GridItem xs={12} md={12}>
              <SlotOptionsSelect
                name='slotPreference'
                label='Slot Preference'
                year={values.year}
                margin='normal'
                required
                fullWidth
              />
            </GridItem>
            {!configuration.startDates[values.year].virtual && (
              <>
                <GridItem xs={12} md={12}>
                  <SelectField
                    name='lateStart'
                    label='Morning Games'
                    margin='normal'
                    fullWidth
                    selectValues={morningGamesOptions}
                  />
                </GridItem>
                <GridItem xs={12} md={12}>
                  <CheckboxWithLabel name='lateFinish' label='Evening Game: Game may run late into the evening' />
                </GridItem>
              </>
            )}
            <GridItem xs={12} md={12}>
              <Typography className='MuiFormControlLabel-label MuiFormLabel-root'>
                In the event we have to change your slot, list any and all known slot conflicts including other games
                you are running, returning or ongoing games, and any slots you are taking off.
              </Typography>
            </GridItem>
            <GridItem xs={12} md={12}>
              <TextField name='slotConflicts' label='Slot Conflicts' margin='normal' fullWidth multiline />
            </GridItem>
            <GridItem xs={12} md={12}>
              <TextField name='message' label='Messages for the Organizers' margin='normal' fullWidth multiline />
            </GridItem>
          </GridContainer>
        </>
      )}
    </EditDialog>
  )
}
