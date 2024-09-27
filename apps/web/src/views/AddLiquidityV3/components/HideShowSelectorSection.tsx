import { AutoRow, Button, ChevronDownIcon } from '@pancakeswap/uikit'
import { LightGreyCard } from 'components/Card'
import { Dispatch, ReactElement, SetStateAction } from 'react'
import { useTranslation } from '@pancakeswap/localization'

interface HideShowSelectorSectionPropsType {
  noHideButton?: boolean
  showOptions: boolean
  setShowOptions: Dispatch<SetStateAction<boolean>>
  heading: ReactElement
  content: ReactElement
}

export default function HideShowSelectorSection({
  noHideButton,
  showOptions,
  setShowOptions,
  heading,
  content,
}: HideShowSelectorSectionPropsType) {
  const { t } = useTranslation()
  return (
    <LightGreyCard padding="8px" style={{ height: 'fit-content' }}>
      <AutoRow justifyContent="space-between" marginBottom={showOptions ? '8px' : '0px'}>
        {heading ?? <div />}
        {noHideButton || (
          <Button
            scale="sm"
            onClick={() => setShowOptions((prev) => !prev)}
            variant="text"
            endIcon={
              !showOptions && (
                <ChevronDownIcon
                  style={{
                    marginLeft: '0px',
                  }}
                  color="primary"
                />
              )
            }
          >
            {showOptions ? t('Hide') : t('More')}
          </Button>
        )}
      </AutoRow>
      {showOptions && content}
    </LightGreyCard>
  )
}
