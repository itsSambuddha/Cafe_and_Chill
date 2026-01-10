import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider, Auth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Singleton References
let app: FirebaseApp;
let auth: Auth;
const googleProvider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider("apple.com");

function isConfigValid() {
    return !!firebaseConfig.apiKey && firebaseConfig.apiKey !== 'YOUR_API_KEY_HERE';
}

if (!getApps().length) {
    if (isConfigValid()) {
        try {
            app = initializeApp(firebaseConfig);
            auth = getAuth(app);
        } catch (e) {
            console.error("Firebase init failed:", e);
            // Fallback to prevent crash if config is malformed
            // @ts-ignore
            app = null;
            // @ts-ignore
            auth = null;
        }
    } else {
        console.warn("⚠️ Firebase Config Missing or Invalid in .env.local");
        // We do NOT initialize app to prevent "invalid-api-key" error crashing the whole build/runtime
        // The UI should handle `auth` being null gracefully or we provide a mock
        // @ts-ignore
        app = null;
        // @ts-ignore
        auth = null;
    }
} else {
    app = getApp();
    auth = getAuth(app);
}

export { app, auth, googleProvider, appleProvider };
