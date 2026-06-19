// Platform-specific download URLs. Set the ones you've shipped via
// NEXT_PUBLIC_DOWNLOAD_URL_MAC_ARM, _MAC_INTEL, _WIN, _LINUX.
// `DOWNLOAD_URL` is the primary CTA fallback - defaults to mac arm so the
// header Download button does the right thing for the most-likely visitor;
// the /download page renders each platform individually.
export type Platform = 'macArm' | 'macIntel' | 'win' | 'linux'

export const DOWNLOAD_URLS: Record<Platform, string> = {
  macArm: process.env.NEXT_PUBLIC_DOWNLOAD_URL_MAC_ARM || '',
  macIntel: process.env.NEXT_PUBLIC_DOWNLOAD_URL_MAC_INTEL || '',
  win: process.env.NEXT_PUBLIC_DOWNLOAD_URL_WIN || '',
  linux: process.env.NEXT_PUBLIC_DOWNLOAD_URL_LINUX || '',
}

// Legacy single-URL fallback. Prefer setting a platform-specific URL above.
const LEGACY = process.env.NEXT_PUBLIC_DOWNLOAD_URL || ''

export const DOWNLOAD_URL =
  DOWNLOAD_URLS.macArm || LEGACY || '/download'

export function isAvailable(platform: Platform): boolean {
  return DOWNLOAD_URLS[platform].length > 0
}
