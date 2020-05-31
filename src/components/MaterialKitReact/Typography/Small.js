// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
// core components
import styles from 'assets/jss/material-kit-react/components/typographyStyle'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
import React from 'react'

const useStyles = makeStyles(styles)

export default function Small(props) {
  const classes = useStyles()
  const { children } = props
  return <div className={classes.defaultFontStyle + ' ' + classes.smallText}>{children}</div>
}

Small.propTypes = {
  children: PropTypes.node,
}