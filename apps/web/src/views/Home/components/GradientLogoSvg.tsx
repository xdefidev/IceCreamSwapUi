import Image, { ImageProps } from 'next/image'
import ice from '../../../../public/images/coin.png'

const GradientLogo: React.FC<Omit<ImageProps, 'src' | 'alt'>> = (props) => {
  return <Image src={ice} alt="IncaSwap" {...props} />
}

export default GradientLogo
