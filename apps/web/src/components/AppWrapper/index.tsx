import { ArrowBackIcon, AtomBox, Flex, Heading, IconButton, Text } from "@pancakeswap/uikit";
import { AppBody } from '../App'
import { useRouter } from 'next/router'
import { PropsWithChildren } from 'react'
import Page from '../../views/Page'
import { AppWrapperBody, AppWrapperContainer } from './styles'

interface AppWrapperProps extends PropsWithChildren {
  title: React.ReactNode
  subtitle: React.ReactNode
  hasBackButton?: boolean
  backlink?: string
}

const AppWrapper: React.FC<AppWrapperProps> = (props) => {
  const { title, subtitle, children, hasBackButton } = props
  const router = useRouter()

  return (
    <Page>
      <Flex marginBottom="4em" height="100%" justifyContent="center" width="100%">
        <Flex flexDirection="column" minWidth="min(428px, calc(100vw - 48px))">
          <AppWrapperContainer>
            <AppBody>
              <AtomBox width="100%" display="flex" gap="2px" padding="24px" borderBottom="1">
                {hasBackButton && (
                  <IconButton
                    onClick={() => {
                      if (props.backlink) router.push(props.backlink)
                      router.back()
                    }}
                    aria-label="Back"
                    variant="text"
                    scale="sm"
                  >
                    <ArrowBackIcon width="32px" />
                  </IconButton>
                )}
                <Flex width={hasBackButton ? undefined : '100%'} flexDirection="column">
                  <AtomBox
                    display="flex"
                    width="100%"
                    alignItems={hasBackButton ? undefined : 'center'}
                    justifyContent={hasBackButton ? undefined : 'center'}
                  >
                    <Heading as="h2">{title}</Heading>
                  </AtomBox>
                  <Text color="textSubtle" fontSize="14px" textAlign={hasBackButton ? undefined : 'center'}>
                    {subtitle}
                  </Text>
                </Flex>
              </AtomBox>
              <AppWrapperBody>{children}</AppWrapperBody>
            </AppBody>
          </AppWrapperContainer>
        </Flex>
      </Flex>
    </Page>
  )
}

export default AppWrapper
