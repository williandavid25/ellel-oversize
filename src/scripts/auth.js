/**
 * auth.js — Google Sign-In using Google Identity Services (GIS)
 * ---------------------------------------------------------------
 * Uses the official Google Identity Services library.
 * Requires a Google Cloud Console Client ID (see comment below).
 *
 * HOW TO ACTIVATE REAL GOOGLE LOGIN:
 * 1. Go to https://console.cloud.google.com/
 * 2. Create a project → APIs & Services → Credentials
 * 3. Create an "OAuth 2.0 Client ID" for "Web application"
 * 4. Add your domain to "Authorized JavaScript origins"
 * 5. Replace GOOGLE_CLIENT_ID below with your real client ID
 */

export const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';

// ── Auth State ──────────────────────────────────────────────────
let currentUser = null;
const AUTH_STORAGE_KEY = 'ellel_user';

/** Load user from localStorage on page load */
export function loadUser() {
    try {
        const saved = localStorage.getItem(AUTH_STORAGE_KEY);
        if (saved) currentUser = JSON.parse(saved);
    } catch (e) { currentUser = null; }
    return currentUser;
}

/** Returns currently logged-in user, or null */
export function getUser() { return currentUser; }

/** Sign in with Google credential JWT payload */
export function signInWithGoogle(credentialResponse) {
    try {
        // Decode the JWT from Google (no library needed — payload is base64)
        const payload = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
        currentUser = {
            name:    payload.name,
            email:   payload.email,
            picture: payload.picture,
            sub:     payload.sub,
        };
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
        onAuthChange(currentUser);
    } catch (e) {
        console.error('Error parsing Google credential:', e);
    }
}

/** Sign out */
export function signOut() {
    currentUser = null;
    localStorage.removeItem(AUTH_STORAGE_KEY);
    if (window.google?.accounts?.id) {
        google.accounts.id.disableAutoSelect();
    }
    onAuthChange(null);
}

// ── UI Update Callback ───────────────────────────────────────────
function onAuthChange(user) {
    // Update cart auth state
    updateCartAuthUI(user);
    // Update header user icon
    updateHeaderAuthUI(user);
    // Close auth modal if open
    const modal = document.getElementById('auth-modal-overlay');
    if (modal && user) modal.classList.remove('active');
    // Dispatch custom event for any listeners
    window.dispatchEvent(new CustomEvent('authChange', { detail: user }));
}

// ── Cart Auth Section ────────────────────────────────────────────
export function updateCartAuthUI(user) {
    const loginBanner = document.getElementById('cart-login-banner');
    const userBanner  = document.getElementById('cart-user-banner');
    if (!loginBanner || !userBanner) return;

    if (user) {
        loginBanner.style.display = 'none';
        userBanner.style.display  = 'flex';
        const img = userBanner.querySelector('.cart-user-avatar');
        const name = userBanner.querySelector('.cart-user-name');
        const email = userBanner.querySelector('.cart-user-email');
        if (img)   img.src    = user.picture || '';
        if (name)  name.textContent  = user.name;
        if (email) email.textContent = user.email;
    } else {
        loginBanner.style.display = 'flex';
        userBanner.style.display  = 'none';
    }
}

// ── Header Avatar ────────────────────────────────────────────────
export function updateHeaderAuthUI(user) {
    const headerAvatar = document.getElementById('header-user-avatar');
    const loginIconBtn = document.getElementById('header-login-btn');

    if (user) {
        if (headerAvatar) {
            headerAvatar.style.display     = 'flex';
            const img = headerAvatar.querySelector('img');
            if (img) img.src = user.picture || '';
        }
        if (loginIconBtn) loginIconBtn.style.display = 'none';
    } else {
        if (headerAvatar)  headerAvatar.style.display  = 'none';
        if (loginIconBtn) loginIconBtn.style.display  = '';
    }
}

// ── Initialize Google Identity Services ─────────────────────────
export function initGoogleAuth() {
    loadUser();

    if (!window.google?.accounts?.id) {
        console.warn('Google Identity Services not loaded yet. Auth is UI-only.');
        onAuthChange(currentUser); // still update UI from localStorage
        return;
    }

    google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback:  signInWithGoogle,
        auto_select: false,
        cancel_on_tap_outside: true,
    });

    // Update UI
    onAuthChange(currentUser);

    // Render Google button inside the modal
    const googleBtnContainer = document.getElementById('google-signin-btn');
    if (googleBtnContainer && !currentUser) {
        google.accounts.id.renderButton(googleBtnContainer, {
            theme: 'filled_black',
            size:  'large',
            width: '100%',
            text:  'continue_with',
            logo_alignment: 'left',
        });
    }
}

// ── Open / Close Auth Modal ──────────────────────────────────────
export function openAuthModal() {
    const modal = document.getElementById('auth-modal-overlay');
    if (!modal) return;
    modal.classList.add('active');

    // Try to render Google button (may not have been available on page load)
    if (window.google?.accounts?.id && !currentUser) {
        const googleBtnContainer = document.getElementById('google-signin-btn');
        if (googleBtnContainer && !googleBtnContainer.children.length) {
            google.accounts.id.renderButton(googleBtnContainer, {
                theme: 'filled_black',
                size:  'large',
                width: '100%',
                text:  'continue_with',
                logo_alignment: 'left',
            });
        }
    }
}

export function closeAuthModal() {
    const modal = document.getElementById('auth-modal-overlay');
    if (modal) modal.classList.remove('active');
}
