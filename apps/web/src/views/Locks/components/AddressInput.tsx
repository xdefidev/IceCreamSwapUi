import { Flex, Input } from '@pancakeswap/uikit'
import { useState } from 'react'
import FormError from 'views/Bridge/components/FormError'
import { isAddress } from "viem";
import { useTranslation } from '@pancakeswap/localization'

interface AddressInputProps {
  value: string
  onChange: (value: string) => void
}

const AddressInput: React.FC<AddressInputProps> = ({ value, onChange }) => {
  const { t } = useTranslation()
  const isValid = isAddress(value)
  const [touched, setTouched] = useState(false)

  return (
    <Flex flexDirection="column" width="100%">
      <Input
        placeholder="0xXXXXXXXXXXXXXXX…"
        onBlur={() => setTouched(true)}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        isWarning={!isValid && touched}
      />
      {!isValid && touched && <FormError>{t('Invalid token address')}</FormError>}
    </Flex>
  )
}

export default AddressInput
