// Download URL is set via NEXT_PUBLIC_DOWNLOAD_URL (e.g. an R2 link).
// Falls back to the CTA section anchor when unset.
export const DOWNLOAD_URL = process.env.NEXT_PUBLIC_DOWNLOAD_URL || '#download'
