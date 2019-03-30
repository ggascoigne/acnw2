// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// core components
import typographyStyle from 'assets/jss/material-kit-react/components/typographyStyle.jsx'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
import React from 'react'

function Info({ ...props }) {
  const { classes, children } = props
  return <div className={classes.defaultFontStyle + ' ' + classes.infoText}>{children}</div>
}

Info.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(typographyStyle)(Info)