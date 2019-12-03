import { createLookup } from '__generated__/createLookup'
import { GetLookups_lookups_edges_node } from '__generated__/GetLookups'
import { updateLookupByNodeId } from '__generated__/updateLookupByNodeId'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
  Typography,
  createStyles,
  makeStyles
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import { useCreateOrUpdateLookup, useCreateOrUpdateLookupValue, useDeleteLookupValue } from 'client'
import { DialogTitle, GridContainer, GridItem, TextField } from 'components/Acnw'
import Card from 'components/MaterialKitReact/Card/Card'
import CardBody from 'components/MaterialKitReact/Card/CardBody'
import CardHeader from 'components/MaterialKitReact/Card/CardHeader'
import { FieldArray, Form, Formik, FormikHelpers } from 'formik'
import get from 'lodash/get'
import * as React from 'react'
import Yup from 'utils/Yup'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto'
    },
    table: {
      minWidth: 700
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 24,
      paddingRight: 24
    },
    title: {
      color: '#fff',
      fontWeight: 300,
      textTransform: 'none'
    },
    iconButton: {
      color: '#fff',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.08)'
      }
    },
    addIcon: {},
    deleteIcon: {},
    deleteButton: {
      color: theme.palette.grey[500]
    }
  })
)

type FormValues = Omit<GetLookups_lookups_edges_node, 'nodeId' | 'id' | '__typename'>

interface LookupsDialog {
  open: boolean
  onClose: (event?: any) => void
  initialValues?: FormValues
}

const validationSchema = Yup.object().shape({
  realm: Yup.string()
    .min(2)
    .max(50)
    .required('Required'),
  lookupValues: Yup.object().shape({
    nodes: Yup.array().of(
      Yup.object().shape({
        sequencer: Yup.number().required(),
        code: Yup.string()
          .min(2)
          .max(50)
          .required(),
        value: Yup.string()
          .min(2)
          .max(50)
          .required()
      })
    )
  })
})

const defaultValues: FormValues = { realm: '', lookupValues: { __typename: 'LookupValuesConnection', nodes: [] } }

export const LookupsDialog: React.FC<LookupsDialog> = ({ open, onClose, initialValues = defaultValues }) => {
  const classes = useStyles()
  const createOrUpdateLookup = useCreateOrUpdateLookup()
  const createOrUpdateLookupValue = useCreateOrUpdateLookupValue()
  const [deleteLookupValue] = useDeleteLookupValue()

  const onSubmit = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    const res = await createOrUpdateLookup(values)
    const isCreateLookup = (value: updateLookupByNodeId | createLookup): value is createLookup =>
      value.hasOwnProperty('createLookup')

    if (!res || !res.data) {
      return
    }
    if (isCreateLookup(res.data) && !res.data.createLookup) {
      return
    }
    if (!isCreateLookup(res.data) && !res.data.updateLookupByNodeId) {
      return
    }

    const lookupId = isCreateLookup(res.data)
      ? get(res, 'data.createLookup.lookup.id')
      : get(res, 'data.updateLookupByNodeId.lookup.id')

    const updaters = values.lookupValues.nodes.reduce((acc: Promise<any>[], lv) => {
      lv && acc.push(createOrUpdateLookupValue(lv, lookupId))
      return acc
    }, [])

    const currentLookupValueIds = values.lookupValues.nodes.reduce((acc: number[], lv) => {
      lv && lv.id && acc.push(lv.id)
      return acc
    }, [])

    initialValues.lookupValues.nodes.map(ilv => {
      if (ilv && ilv.id) {
        currentLookupValueIds.includes(ilv.id) ||
          updaters.push(deleteLookupValue({ variables: { input: { id: ilv.id } } }))
      }
      return null
    })

    Promise.all(updaters)
      .then(() => onClose(null))
      .finally(() => actions.setSubmitting(false))
  }

  const editing = initialValues !== defaultValues

  const highestSequence = (values: FormValues) => {
    return values.lookupValues.nodes.reduce((acc, val) => Math.max(val ? val.sequencer : 0, acc), -1) + 1
  }

  return (
    <Dialog disableBackdropClick fullWidth={true} maxWidth={false} open={open} onClose={onClose}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting, values }) => (
          <Form>
            <DialogTitle onClose={onClose}>{editing ? 'Edit' : 'Add'} Lookup</DialogTitle>
            <DialogContent>
              <GridContainer spacing={5}>
                <GridItem xs={12} md={6}>
                  <TextField name='realm' label='Realm' margin='normal' />
                </GridItem>
                <GridItem>
                  <FieldArray
                    name='lookupValues.nodes'
                    render={arrayHelpers => (
                      <Card>
                        <CardHeader color='success' className={classes.header}>
                          <Typography variant='h6' className={classes.title}>
                            Lookup Values
                          </Typography>
                          <IconButton
                            className={classes.iconButton}
                            onClick={() =>
                              arrayHelpers.push({ sequencer: highestSequence(values), code: '', value: '' })
                            }
                          >
                            <AddIcon className={classes.addIcon} />
                          </IconButton>
                        </CardHeader>
                        <CardBody>
                          <Table className={classes.table}>
                            <TableHead>
                              <TableRow>
                                <TableCell>Sequencer</TableCell>
                                <TableCell>Code</TableCell>
                                <TableCell>Value</TableCell>
                                <TableCell>&nbsp;</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {values.lookupValues.nodes.map((lv, index) => (
                                <TableRow key={index}>
                                  <TableCell scope='row' style={{ width: '10%' }}>
                                    <TextField
                                      name={`lookupValues.nodes[${index}].sequencer`}
                                      fullWidth
                                      type='number'
                                    />
                                  </TableCell>
                                  <TableCell style={{ width: '20%' }}>
                                    <TextField name={`lookupValues.nodes[${index}].code`} fullWidth />
                                  </TableCell>
                                  <TableCell>
                                    <TextField name={`lookupValues.nodes[${index}].value`} fullWidth />
                                  </TableCell>
                                  <TableCell align='right' style={{ width: '50px' }}>
                                    <IconButton
                                      className={classes.deleteButton}
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <DeleteIcon className={classes.deleteIcon} />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </CardBody>
                      </Card>
                    )}
                  />
                </GridItem>
              </GridContainer>
            </DialogContent>
            <DialogActions className={'modalFooterButtons'}>
              <Button onClick={onClose} variant='outlined'>
                Cancel
              </Button>
              <Button disabled={isSubmitting} type='submit' variant='contained' color='primary'>
                Save
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  )
}
