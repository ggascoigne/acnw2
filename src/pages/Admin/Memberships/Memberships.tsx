import { GraphQLError, Loader, Page, Table } from 'components/Acnw'
import React, { MouseEventHandler, useState } from 'react'
import type { Column, Row, TableInstance } from 'react-table'

import type { TableMouseEventHandler } from '../../../../types/react-table-config'
import { MembershipFieldsFragment, useGetMembershipsByYearQuery, useYearFilterQuery } from '../../../client'
import { DateCell, YesNoCell } from '../../../components/Acnw/Table/CellFormatters'
import { MembershipDialog } from './MembershipDialog'

// import { GamesDialog } from './GamesDialog'

type Membership = MembershipFieldsFragment

const columns: Column<Membership>[] = [
  {
    Header: 'Member',
    columns: [
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
    ],
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
        accessor: 'attending',
        Cell: YesNoCell,
      },
      {
        accessor: 'interestLevel',
      },
      {
        accessor: 'message',
      },
      {
        accessor: 'volunteer',
        Cell: YesNoCell,
      },
    ],
  },
]

export const Memberships: React.FC = React.memo(() => {
  const { data: yearQueryData } = useYearFilterQuery()
  const year = yearQueryData?.yearDetails?.year

  const [showEdit, setShowEdit] = useState(false)
  const [selection, setSelection] = useState<Membership[]>([])
  // const [deleteGame] = useDeleteGameMutation()
  const { loading, error, data } = useGetMembershipsByYearQuery({
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

  const list: Membership[] = memberships!.nodes.filter((i) => i) as Membership[]

  const onAdd: TableMouseEventHandler = () => () => {
    setShowEdit(true)
  }

  const onCloseEdit: MouseEventHandler = () => {
    setShowEdit(false)
    setSelection([])
  }

  // const onDelete = (instance: TableInstance<Game>) => () => {
  //   const toDelete = instance.selectedFlatRows.map((r) => r.original)
  //   const updater = toDelete.map((g) => deleteGame({ variables: { input: { id: g.id } } }))
  //   Promise.all(updater).then(() => console.log('deleted'))
  // }

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
      {showEdit && <MembershipDialog open={showEdit} onClose={onCloseEdit} initialValues={selection[0]} />}
      <Table<Membership>
        name='members'
        data={list}
        columns={columns}
        onAdd={onAdd}
        disableGroupBy
        // onDelete={onDelete}
        onEdit={onEdit}
        onClick={onClick}
      />
    </Page>
  )
})
