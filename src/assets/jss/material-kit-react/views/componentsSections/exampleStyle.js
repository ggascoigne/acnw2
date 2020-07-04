import { conatinerFluid } from 'src/assets/jss/material-kit-react'
import imagesStyle from 'src/assets/jss/material-kit-react/imagesStyles.js'

const exampleStyle = {
  section: {
    padding: '70px 0',
  },
  container: {
    ...conatinerFluid,
    textAlign: 'center !important',
  },
  ...imagesStyle,
  link: {
    textDecoration: 'none',
  },
}

export default exampleStyle
