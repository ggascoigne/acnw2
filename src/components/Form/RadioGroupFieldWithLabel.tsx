import { FormControl, FormControlLabel, FormLabel, MenuItem, Radio } from '@material-ui/core'
import MuiRadioGroup, { RadioGroupProps as MuiRadioGroupProps } from '@material-ui/core/RadioGroup'
import { useField } from 'formik'
import React from 'react'

import { SelectValues, getSelectLabel, getSelectValue } from './SelectField'

export interface RadioGroupProps extends Omit<MuiRadioGroupProps, 'onChange' | 'value' | 'error'>, SelectValues {
  name: string
  label: string
}

export function RadioGroupFieldWithLabel(props: RadioGroupProps) {
  const [field, meta] = useField(props.name)
  const { touched, error } = meta
  const showError = touched && !!error
  const { selectValues, children, ...rest } = props

  const fullProps = {
    ...rest,
    ...field,
  }
  return (
    <FormControl component='fieldset' error={showError}>
      <FormLabel component='legend'>{props.label}</FormLabel>
      <MuiRadioGroup {...fullProps}>
        {selectValues?.map((s) => (
          <MenuItem key={getSelectValue(s)} value={getSelectValue(s)}>
            <FormControlLabel value={getSelectValue(s)} control={<Radio />} label={getSelectLabel(s)} />
          </MenuItem>
        ))}
        {children && children}
      </MuiRadioGroup>
    </FormControl>
  )
}

RadioGroupFieldWithLabel.displayName = 'FormikMaterialUIRadioGroupWithLabel'
