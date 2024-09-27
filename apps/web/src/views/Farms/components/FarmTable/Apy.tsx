import { styled } from 'styled-components'
import BigNumber from 'bignumber.js'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { Skeleton } from '@pancakeswap/uikit'
import ApyButton from '../FarmCard/ApyButton'
import { useActiveChainId } from 'hooks/useActiveChainId'

export interface ApyProps {
  value: string
  multiplier: string
  pid: number
  lpLabel: string
  lpSymbol: string
  lpRewardsApr: number
  lpTokenPrice: BigNumber
  tokenAddress?: string
  quoteTokenAddress?: string
  cakePrice: BigNumber
  originalValue: number
  hideButton?: boolean
  useTooltipText?: boolean
  farmCakePerSecond?: string
  totalMultipliers?: string
}

const Container = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};

  button {
    width: 20px;
    height: 20px;

    svg {
      path {
        fill: ${({ theme }) => theme.colors.textSubtle};
      }
    }
  }
`

const AprWrapper = styled.div`
  min-width: 60px;
  text-align: left;
`

const Apy: React.FC<React.PropsWithChildren<ApyProps>> = ({
  value,
  pid,
  lpLabel,
  lpSymbol,
  lpTokenPrice,
  multiplier,
  tokenAddress = '',
  quoteTokenAddress = '',
  cakePrice,
  originalValue,
  hideButton = false,
  lpRewardsApr,
  useTooltipText = true,
  farmCakePerSecond,
  totalMultipliers,
}) => {
  const { chainId } = useActiveChainId()
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAddress, tokenAddress, chainId })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`
  return originalValue !== 0 ? (
    <Container>
      {originalValue ? (
        <ApyButton
          variant={hideButton ? 'text' : 'text-and-button'}
          pid={pid}
          lpSymbol={lpSymbol}
          lpLabel={lpLabel}
          lpTokenPrice={lpTokenPrice}
          multiplier={multiplier}
          cakePrice={cakePrice}
          apr={originalValue}
          displayApr={value}
          lpRewardsApr={lpRewardsApr}
          addLiquidityUrl={addLiquidityUrl}
          useTooltipText={useTooltipText}
          hideButton={hideButton}
          farmCakePerSecond={farmCakePerSecond}
          totalMultipliers={totalMultipliers}
        />
      ) : (
        <AprWrapper>
          <Skeleton width={60} />
        </AprWrapper>
      )}
    </Container>
  ) : (
    <Container>
      <AprWrapper>{originalValue}%</AprWrapper>
    </Container>
  )
}

export default Apy
