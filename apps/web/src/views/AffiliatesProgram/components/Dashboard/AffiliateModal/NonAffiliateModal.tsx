import { useEffect, useState } from 'react'
import { ModalV2, Modal, Flex, Text, Checkbox, Button, Link } from '@pancakeswap/uikit'
import { useAccount } from 'wagmi'
import { useAtom } from 'jotai'
import { useTranslation } from '@pancakeswap/localization'
import useAuthAffiliateExist from 'views/AffiliatesProgram/hooks/useAuthAffiliateExist'
import atomWithStorageWithErrorCatch from 'utils/atomWithStorageWithErrorCatch'
import useUserExist from 'views/AffiliatesProgram/hooks/useUserExist'

const showNonAffiliateModalAtom = atomWithStorageWithErrorCatch('pcs::showNonAffiliateModalAtom', true)

const NonAffiliateModal = () => {
  const { t } = useTranslation()
  const { address } = useAccount()
  const { isAffiliateExist } = useAuthAffiliateExist()
  const [isOpen, setIsOpen] = useState(false)
  const { isFetching } = useUserExist()
  const [isChecked, setIsChecked] = useState(false)
  const [showModal, setShowModal] = useAtom(showNonAffiliateModalAtom)

  useEffect(() => {
    setIsOpen(!isAffiliateExist && !isFetching && address && showModal)
  }, [address, isFetching, isAffiliateExist, showModal])

  const handleCheckbox = () => setIsChecked(!isChecked)

  const handleCloseButton = () => {
    setIsOpen(false)
    setShowModal(false)
  }

  return (
    <ModalV2 isOpen={isOpen}>
      <Modal
        title={t('Affiliate Program Update')}
        maxWidth={['100%', '100%', '100%', '480px']}
        onDismiss={() => handleCloseButton()}
      >
        <Flex flexDirection="column">
          <Text mb="24px">
            <Text as="span">
              {t(
                'For Affiliate program participants: Our affiliate program’s terms and conditions have been updated as of September 1, 2023, with changes related to sections 2 (a), 2.1 (a and b) and 3. Section 2 (a) includes chains such as Polygon zkEVM, zkSync Era, Arbitrum One, Linea, and Base for Swap Commissions. Section 2.1 (a and b) includes updating the “IceCreamSwap token” list and adding MATIC, ARB, DAI in the major token pairs for the swap commission.  Section 3, the discount for perpetuals trading fee is limited to v1 perpetual trades.',
              )}
            </Text>
          </Text>
          <label htmlFor="checkbox" style={{ display: 'block', cursor: 'pointer', marginBottom: '24px' }}>
            <Flex alignItems="center">
              <div style={{ flex: 'none' }}>
                <Checkbox id="checkbox" scale="sm" checked={isChecked} onChange={handleCheckbox} />
              </div>
              <Text fontSize="14px" ml="8px">
                {t('I have read and agree to the updated')}
                <Text display="inline-block" as="span" ml="4px">
                  <Link
                    external
                    href="https://docs.pancakeswap.finance/ecosystem-and-partnerships/affiliate-program/terms-and-conditions"
                  >
                    {t('terms and conditions')}
                  </Link>
                </Text>
              </Text>
            </Flex>
          </label>
          <Button width="100%" disabled={!isChecked} onClick={handleCloseButton}>
            {t('Close')}
          </Button>
        </Flex>
      </Modal>
    </ModalV2>
  )
}

export default NonAffiliateModal
