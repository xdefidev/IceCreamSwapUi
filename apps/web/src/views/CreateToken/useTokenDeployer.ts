import { useActiveChain } from 'hooks/useActiveChain'
import { useContract } from 'hooks/useContract'
import { useEffect, useState } from 'react'
import { tokenDeployerABI } from "config/abi/tokenDeployer";

const useTokenDeployerDividend = () => {
  const chain = useActiveChain()
  const tokenDeployerAddress = chain?.tokenDeployerDividend?.address
  const tokenDeployer = useContract(tokenDeployerAddress, tokenDeployerABI)
  return tokenDeployer
}

export const useDeploymentFee = () => {
  const deployer = useTokenDeployerDividend()
  const [feeAmount, setFeeAmount] = useState<bigint>()

  useEffect(() => {
    if (deployer) {
      deployer.read.iceFee().then(setFeeAmount)
    }
  }, [deployer])
  const chain = useActiveChain()

  return {
    feeAmount,
    feeToken: chain?.tokenDeployerDividend?.feeToken,
    deployerAddress: chain?.tokenDeployerDividend?.address,
  }
}

export default useTokenDeployerDividend
