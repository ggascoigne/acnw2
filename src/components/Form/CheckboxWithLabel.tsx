import MuiCheckbox from '@material-ui/core/Checkbox'
import FormControlLabel, { FormControlLabelProps as MuiFormControlLabelProps } from '@material-ui/core/FormControlLabel'
import { useField, useFormikContext } from 'formik'
import React from 'react'

import type { CheckboxProps } from './Checkbox'

/**
 * Exclude props that are passed directly to the control
 * https://github.com/mui-org/material-ui/blob/v3.1.1/packages/material-ui/src/FormControlLabel/FormControlLabel.js#L71
 */
export interface CheckboxWithLabelProps extends CheckboxProps {
  Label?: Omit<MuiFormControlLabelProps, 'control' | 'checked' | 'onChange' | 'value' | 'inputRef'>
  label?: string
}

export const CheckboxWithLabel: React.ComponentType<CheckboxWithLabelProps> = ({ Label, label, ...props }) => {
  const [field] = useField(props.name)
  const { isSubmitting } = useFormikContext()

  const fullProps = {
    ...props,
    ...field,
    disabled: props.disabled !== undefined ? props.disabled : isSubmitting,
    checked: field.value,
    value: field.value ? 'checked' : '',
  }

  const labelProps = {
    disabled: props.disabled !== undefined ? props.disabled : isSubmitting,
    style: { marginLeft: 0 },
    labelPlacement: 'start',
    label,
    ...Label,
  } as const

  return <FormControlLabel control={<MuiCheckbox {...fullProps} />} {...labelProps} />
}

CheckboxWithLabel.displayName = 'FormikMaterialUICheckboxWithLabel'
