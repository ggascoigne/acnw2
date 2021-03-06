import { DateTime, DateTimeFormatOptions } from 'luxon'
import React from 'react'
import { ConfigurationDates, configuration } from 'utils'
import getOrdinalWord from 'utils/ordinal'

interface SpacingProps {
  skipSpace?: 'before' | 'after' | 'both' | 'neither'
}

const Spacing: React.FC<SpacingProps> = ({ children, skipSpace }) => (
  <>
    {skipSpace !== 'before' && skipSpace !== 'both' && ' '}
    {children}
    {skipSpace !== 'after' && skipSpace !== 'both' && ' '}
  </>
)

// common Date Formats
export const WMD = 'cccc, LLLL d'
export const WMDY = 'cccc, LLLL d yyyy'

export const configDate = (
  name: keyof ConfigurationDates,
  format: DateTimeFormatOptions | string = DateTime.DATE_MED
) => (typeof format === 'string' ? configuration[name].toFormat(format) : configuration[name].toLocaleString(format))

interface ConfigDateProps extends SpacingProps {
  name: keyof ConfigurationDates
  format?: DateTimeFormatOptions | string
}

export const ConfigDate = ({ name, format, skipSpace = 'neither' }: ConfigDateProps) => (
  <Spacing skipSpace={skipSpace}>{configDate(name, format)}</Spacing>
)

export const ConventionsDatesFull: React.FC<{ pre?: string; intra?: string; post?: string }> = ({
  pre,
  intra,
  post,
}) => (
  <>
    {' '}
    {pre ?? null}
    <ConfigDate name='conventionStartDate' format={WMD} />
    {intra ?? null}
    <ConfigDate name='conventionEndDate' format={WMDY} skipSpace='after' />
    {post ?? null}
  </>
)

const Ordinal = ({ skipSpace = 'neither' }: SpacingProps) => (
  <Spacing skipSpace={skipSpace}>{getOrdinalWord(1 + configuration.year - 1997)} </Spacing>
)

const ConventionYear = ({ skipSpace = 'neither' }: SpacingProps) => (
  <Spacing skipSpace={skipSpace}>{configuration.year}</Spacing>
)

const ContactEmail = ({ skipSpace = 'neither' }: SpacingProps) => (
  <Spacing skipSpace={skipSpace}>{configuration.contactEmail} </Spacing>
)

export const Acnw = { Ordinal, ConventionYear, ContactEmail }
