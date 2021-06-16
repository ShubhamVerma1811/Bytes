module.exports = {
  webpack5: true,
  env: {
    HARPER_BYTES_URI: process.env.HARPER_BYTES_URI,
    HARPER_BYTES_BASIC: process.env.HARPER_BYTES_BASIC,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    UMAMI_URI: process.env.UMAMI_URI,
    UMAMI_UID: process.env.UMAMI_UID,
  },
  images: { domains: ['firebasestorage.googleapis.com'] },
}
