import { GetGames_games_edges } from '__generated__/GetGames'
import { GetSlots_slots_nodes } from '__generated__/GetSlots'
import { Theme, Typography, makeStyles } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import createStyles from '@material-ui/core/styles/createStyles'
import { useUrlSourceMutation } from 'client/resolvers/urlSource'
import React from 'react'
import { useHistory, useLocation } from 'react-router'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      paddingTop: 5,
      paddingBottom: 5
    }
  })
)

interface GameListIndex {
  year: number
  slot: GetSlots_slots_nodes
  games: GetGames_games_edges[]
  onEnterGame?: any
}

export const GameListIndex: React.FC<GameListIndex> = ({ year, slot, games }) => {
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()

  const [updateUrlSourceMutation] = useUrlSourceMutation()
  return (
    <List>
      {games.map(({ node: game }) => {
        if (!game) {
          return null
        }
        const slug = `/pastCons/${year}/${slot.id}/${game.id}`
        return (
          <ListItem
            key={game.id}
            button
            className={classes.listItem}
            selected={slug === location.pathname}
            onClick={async () => {
              await updateUrlSourceMutation({ variables: { source: 'jump', url: slug } })
              return history.replace(slug)
            }}
          >
            <Typography variant='body1' noWrap>
              {game.name}
            </Typography>
          </ListItem>
        )
      })}
    </List>
  )
}
