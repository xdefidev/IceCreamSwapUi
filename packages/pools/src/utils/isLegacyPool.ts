import { LegacySerializedPool, SerializedPool, UpgradedSerializedPool } from '../types'

export function isLegacyPool(pool: SerializedPool): pool is LegacySerializedPool {
  return !(pool as any).tokenPerSecond
}

export function isUpgradedPool(pool: SerializedPool): pool is UpgradedSerializedPool {
  return !!(pool as any).tokenPerSecond
}
