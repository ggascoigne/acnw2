import { Grid, createStyles, makeStyles } from '@material-ui/core'
import { GridProps } from '@material-ui/core/Grid'
import React from 'react'

const useStyles = makeStyles(() =>
  createStyles({
    grid: {
      marginRight: '-15px',
      marginLeft: '-15px',
      width: 'auto'
    }
  })
)

interface GridContainer extends GridProps {
  className?: string
}

export const GridContainer: React.FC<GridContainer> = ({ children, className = '', ...rest }) => {
  const classes = useStyles()
  return (
    <Grid container {...rest} className={classes.grid + ' ' + className}>
      {children}
    </Grid>
  )
}
