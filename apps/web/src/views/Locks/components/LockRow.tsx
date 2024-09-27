import { Flex, Td, Text, Button, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useToken } from 'hooks/Tokens'
import styled, { useTheme } from 'styled-components'
import { renderDate } from '../../../utils/renderDate'
import TokenName from './TokenName'
import { Lock } from '../hooks'
import { utils, BigNumber } from 'ethers'
import { useCallback } from 'react'
import { formatAmount } from 'views/Bridge/formatter'
import Link from 'next/link'
import { formatUnits } from "viem";
import { useTranslation } from '@pancakeswap/localization'

const RowStyled = styled.tr`
  &:hover {
    background: ${({ theme }) => theme.colors.backgroundDisabled};
  }

  &:last-of-type {
    border-radius: 0 0 16px 16px;
  }
`

interface LockRowProps {
  lock: Lock
}

const LockRow: React.FC<LockRowProps> = ({ lock }) => {
  const { t } = useTranslation()
  const claimed = lock.amount === lock.amountUnlocked
  const token = useToken(lock.token)
  const { isMobile } = useMatchBreakpoints()
  const theme = useTheme()
  const format = useCallback(
    (value: bigint) => {
      if (!value) return ''
      const decimals = token?.decimals ?? 18
      return formatAmount(Number(formatUnits(value, decimals)))
    },
    [token],
  )

  const percentClaimed = (lock.amountUnlocked * 10000n / lock.amount / 100n).toString()

  if (isMobile) {
    return (
      <>
        <RowStyled>
          <Td style={{ borderBottom: '0px', paddingBottom: '0px' }}>
            <TokenName withSymbol address={lock.token} />
          </Td>
          <Td style={{ borderBottom: '0px', paddingBottom: '0px' }}>
            <Flex flexDirection="column">
              <span>{`${format(lock.amount)} ${token?.symbol}`}</span>
              <Text fontSize="0.75em" color={theme.colors.text99}>
                {percentClaimed}{t('% Claimed')}
              </Text>
            </Flex>
          </Td>
        </RowStyled>
        <RowStyled>
          <Td color={lock.amountToUnlock > 0 && theme.colors.success}>
            {claimed ? (
              t('Fully Claimed')
            ) : lock.amountToUnlock > 0 ? (
              format(lock.amountToUnlock)
            ) : (
              <Flex flexDirection="column" gap="0.5em">
                <span>{t('Starting at')}</span>
                <span>{renderDate(Number(lock.start_time * 1000n))}</span>
              </Flex>
            )}
          </Td>
          <Td>
            <Link href={`/locks/lock/${lock.lockId}`} passHref legacyBehavior>
              <Button as="a" variant="subtle" scale="sm" style={{ fontSize: '0.75rem', textAlign: 'center' }}>
                {t('View Details')}
              </Button>
            </Link>
          </Td>
        </RowStyled>
      </>
    )
  }

  return (
    <RowStyled>
      <Td>
        <TokenName withSymbol address={lock.token} />
      </Td>
      <Td>
        <Flex flexDirection="column">
          <span>{`${format(lock.amount)} ${token?.symbol}`}</span>
          <Text fontSize="0.75em" color={theme.colors.text99}>
            {percentClaimed}% {t('Claimed')}
          </Text>
        </Flex>
      </Td>
      {!isMobile && (
        <Td color={lock.amountToUnlock > 0 && theme.colors.success}>
          {claimed ?
            t('Fully Claimed') : lock.amountToUnlock > 0 ? (
            format(lock.amountToUnlock)
          ) : (
            <Flex flexDirection="column" gap="0.5em">
              <span>{t('Starting at')}</span>
              <span>{renderDate(Number(lock.start_time * 1000n))}</span>
            </Flex>
          )}
        </Td>
      )}
      <Td>
        <Link href={`/locks/lock/${lock.lockId}`} passHref legacyBehavior>
          <Button as="a" variant="subtle" scale="sm" style={{ fontSize: '0.75rem', textAlign: 'center' }}>
            {isMobile ? t('View') : t('View Details')}
          </Button>
        </Link>
      </Td>
    </RowStyled>
  )
}

export default LockRow
