import { MembershipFieldsFragment, useDeleteMembershipMutation, useGetMembershipsByYearQuery } from 'client'
import { GraphQLError, Loader, Page, Table, useProfile } from 'components/Acnw'
import React, { MouseEventHandler, useState } from 'react'
import { Column, Row, TableInstance, TableState } from 'react-table'
import { configuration, notEmpty, useLocalStorage, useYearFilterState } from 'utils'

import type { TableMouseEventHandler } from '../../../types/react-table-config'
import { BlankNoCell, DateCell, YesBlankCell } from '../../components/Acnw/Table/CellFormatters'
import { MembershipDialog } from './MembershipDialog'

type Membership = MembershipFieldsFragment

const initialState: Partial<TableState<Membership>> = {
  sortBy: [
    {
      id: 'lastName',
      desc: false,
    },
  ],
  hiddenColumns: [
    'hotelRoomId',
    'interestLevel',
    'message',
    'offerSubsidy',
    'requestOldPrice',
    'roomPreferenceAndNotes',
    'roomingPreferences',
    'roomingWith',
    'amountOwed',
    'amountPaid',
  ],
}

const memberColumns: Column<Membership>[] = [
  {
    accessor: 'id',
    Header: 'Member ID',
    width: 70,
  },
  {
    id: 'userId',
    accessor: (r: Membership) => r?.user?.id,
    Header: 'User ID',
    width: 60,
  },
  {
    id: 'firstName',
    accessor: (r: Membership) => r?.user?.firstName,
    width: 70,
  },
  {
    id: 'lastName',
    accessor: (r: Membership) => r?.user?.lastName,
    width: 100,
  },
]

const columns: Column<Membership>[] = [
  {
    Header: 'Member',
    columns: memberColumns,
  },
  {
    Header: 'Attendance',
    columns: [
      {
        accessor: 'attendance',
        width: 60,
      },
      {
        accessor: 'arrivalDate',
        Cell: DateCell,
      },
      {
        accessor: 'departureDate',
        Cell: DateCell,
      },
      {
        accessor: 'interestLevel',
      },
      {
        accessor: 'message',
      },
      {
        accessor: 'volunteer',
        Cell: YesBlankCell,
        width: 50,
      },
      {
        accessor: 'attending',
        Cell: BlankNoCell,
        width: 50,
      },
      { accessor: 'hotelRoomId' },
      { accessor: 'interestLevel' },
      { accessor: 'message' },
      { accessor: 'offerSubsidy' },
      { accessor: 'requestOldPrice' },
      { accessor: 'roomPreferenceAndNotes' },
      { accessor: 'roomingPreferences' },
      { accessor: 'roomingWith' },
      { accessor: 'amountOwed' },
      { accessor: 'amountPaid' },
    ],
  },
]

const virtualColumns: Column<Membership>[] = [
  {
    Header: 'Member',
    columns: memberColumns,
  },
  {
    Header: 'Attendance',
    columns: [
      {
        accessor: 'slotsAttending',
      },
      {
        accessor: 'message',
      },
      {
        accessor: 'volunteer',
        Cell: YesBlankCell,
        width: 50,
      },
      {
        accessor: 'attending',
        Cell: BlankNoCell,
        width: 50,
      },
    ],
  },
]

export const Memberships: React.FC = React.memo(() => {
  const profile = useProfile()
  const year = useYearFilterState((state) => state.year)
  const [_, setLastMembershipYear] = useLocalStorage<number>('lastMembershipYear', 0)

  const [showEdit, setShowEdit] = useState(false)
  const [selection, setSelection] = useState<Membership[]>([])
  const [deleteMembership] = useDeleteMembershipMutation()
  const { loading, error, data, refetch } = useGetMembershipsByYearQuery({
    variables: {
      year,
    },
  })

  if (error) {
    return <GraphQLError error={error} />
  }

  if (loading || !data) {
    return <Loader />
  }
  const { memberships } = data!

  const list: Membership[] = memberships!.nodes.filter(notEmpty)

  const onAdd: TableMouseEventHandler = () => () => {
    setShowEdit(true)
  }

  const onCloseEdit: MouseEventHandler = () => {
    setShowEdit(false)
    setSelection([])
  }

  const onDelete = (instance: TableInstance<Membership>) => () => {
    const toDelete = instance.selectedFlatRows.map((r) => r.original)
    const updater = toDelete.map((m) =>
      deleteMembership({
        variables: { input: { id: m.id } },
        refetchQueries: ['getMembershipsByYear', 'getMembershipByYearAndId'],
      })
    )
    Promise.all(updater).then(() => {
      console.log('deleted')
      instance.toggleAllRowsSelected(false)
      setSelection([])
      setLastMembershipYear(0) // flush membership cache, not really correct, but it makes testing so much easier
    })
  }

  const onEdit = (instance: TableInstance<Membership>) => () => {
    setShowEdit(true)
    setSelection(instance.selectedFlatRows.map((r) => r.original))
  }

  const onClick = (row: Row<Membership>) => {
    setShowEdit(true)
    setSelection([row.original])
  }

  return (
    <Page>
      {showEdit && (
        <MembershipDialog open={showEdit} onClose={onCloseEdit} initialValues={selection[0]} profile={profile!} />
      )}
      <Table<Membership>
        name='members'
        data={list}
        columns={configuration.virtual ? virtualColumns : columns}
        onAdd={onAdd}
        disableGroupBy
        onDelete={onDelete}
        onEdit={onEdit}
        onClick={onClick}
        initialState={initialState}
        onRefresh={() => refetch()}
      />
    </Page>
  )
})
