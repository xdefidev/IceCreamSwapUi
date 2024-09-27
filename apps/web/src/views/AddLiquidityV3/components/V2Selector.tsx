import { useState } from 'react'
import { Text } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { SelectButton } from 'components/SelectButton'
import { EvenWidthAutoRow } from 'components/Layout/EvenWidthAutoRow'
import { TOTAL_FEE } from 'config/constants/info'

import HideShowSelectorSection from './HideShowSelectorSection'
import { HandleFeePoolSelectFn, SELECTOR_TYPE } from '../types'
import { SUPPORT_SWAP_V3 } from "config/constants/supportChains";
import { useActiveChainId } from "hooks/useActiveChainId";

export function V2Selector({
  isStable,
  handleFeePoolSelect,
  selectorType,
}: {
  isStable: boolean
  selectorType: SELECTOR_TYPE
  handleFeePoolSelect: HandleFeePoolSelectFn
}) {
  const { t } = useTranslation()
  const [showOptions, setShowOptions] = useState(false)
  const { chainId } = useActiveChainId()

  return (
    <HideShowSelectorSection
      showOptions={showOptions}
      setShowOptions={setShowOptions}
      heading={
        selectorType === SELECTOR_TYPE.STABLE ? (
          <Text>StableSwap LP</Text>
        ) : selectorType === SELECTOR_TYPE.V2 ? (
          <Text>
            V2 LP - {(TOTAL_FEE * 100).toFixed(1)}% {t('fee tier')}
          </Text>
        ) : (
          <Text>V3 LP</Text>
        )
      }
      content={
        <EvenWidthAutoRow gap="4px">
          {isStable ? (
            <>
              <SelectButton
                isActive={selectorType === SELECTOR_TYPE.STABLE}
                onClick={() => handleFeePoolSelect({ type: SELECTOR_TYPE.STABLE })}
              >
                StableSwap LP
              </SelectButton>
            </>
          ) : SUPPORT_SWAP_V3.includes(chainId) && (
            <>
              <SelectButton
                isActive={selectorType === SELECTOR_TYPE.V3}
                onClick={() => handleFeePoolSelect({ type: SELECTOR_TYPE.V3 })}
              >
                V3 LP
              </SelectButton>
            </>
          )}
          <SelectButton
            isActive={selectorType === SELECTOR_TYPE.V2}
            onClick={() => handleFeePoolSelect({ type: SELECTOR_TYPE.V2 })}
          >
            V2 LP
          </SelectButton>
        </EvenWidthAutoRow>
      }
    />
  )
}
