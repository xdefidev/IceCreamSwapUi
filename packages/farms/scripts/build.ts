/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import path from 'path'
import fs from 'fs'
import farm56 from '../constants/56'
import farm32520 from '../constants/32520'
import farm2000 from '../constants/2000'
import farm122 from '../constants/122'
import farm50 from '../constants/50'
import farm1116 from '../constants/1116'
import farm2415 from '../constants/2415'

import lpHelpers56 from '../constants/priceHelperLps/56'
import lpHelpers32520 from '../constants/priceHelperLps/32520'

const chains = [
  [56, farm56, lpHelpers56],
  [32520, farm32520, lpHelpers32520],
  [2000, farm2000, lpHelpers32520],
  [122, farm122, lpHelpers32520],
  [50, farm50, lpHelpers32520],
  [1116, farm1116, lpHelpers32520],
  [2415, farm2415, lpHelpers32520],
]

export const saveList = async () => {
  console.info('save farm config...')
  try {
    fs.mkdirSync(`${path.resolve()}/lists`)
    fs.mkdirSync(`${path.resolve()}/lists/priceHelperLps`)
  } catch (error) {
    //
  }
  for (const [chain, farm, lpHelper] of chains) {
    console.info('Starting build farm config', chain)
    const farmListPath = `${path.resolve()}/lists/${chain}.json`
    const stringifiedList = JSON.stringify(farm, null, 2)
    fs.writeFileSync(farmListPath, stringifiedList)
    console.info('Farm list saved to ', farmListPath)
    const lpPriceHelperListPath = `${path.resolve()}/lists/priceHelperLps/${chain}.json`
    const stringifiedHelperList = JSON.stringify(lpHelper, null, 2)
    fs.writeFileSync(lpPriceHelperListPath, stringifiedHelperList)
    console.info('Lp list saved to ', lpPriceHelperListPath)
  }
}

saveList()
