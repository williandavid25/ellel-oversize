/**
 * AuthModal.js — Returns the HTML string for the Login Modal overlay
 */
export const AuthModal = () => `
    <div class="auth-modal-overlay" id="auth-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
        <div class="auth-modal">
            <!-- Close -->
            <button class="auth-close-btn" id="auth-close-btn" aria-label="Cerrar">
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2.5" fill="none">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>

            <!-- Brand -->
            <div class="auth-brand">
                <img src="./src/assets/img/logo-square.png" alt="Ellel Oversize" class="auth-logo" onerror="this.style.display='none'">
                <span class="auth-brand-name">Ellel Oversize</span>
            </div>

            <!-- Title -->
            <h2 class="auth-title" id="auth-modal-title">Bienvenido de vuelta</h2>
            <p class="auth-subtitle">Inicia sesión para guardar tus pedidos y pagar más rápido</p>

            <!-- Benefits list -->
            <ul class="auth-benefits">
                <li>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    Historial de pedidos guardado
                </li>
                <li>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    Checkout en un solo clic
                </li>
                <li>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    Ofertas exclusivas para miembros
                </li>
            </ul>

            <!-- Google Sign-In button (rendered by GIS SDK) -->
            <div class="auth-google-wrapper">
                <div id="google-signin-btn"></div>
            </div>

            <!-- Divider -->
            <div class="auth-divider"><span>o continúa con email</span></div>

            <!-- Email form -->
            <form class="auth-email-form" id="auth-email-form" novalidate>
                <div class="auth-field">
                    <label for="auth-email">Correo electrónico</label>
                    <input type="email" id="auth-email" placeholder="tu@correo.com" autocomplete="email" required>
                </div>
                <div class="auth-field" id="auth-password-field">
                    <label for="auth-password">Contraseña</label>
                    <input type="password" id="auth-password" placeholder="••••••••" autocomplete="current-password" required>
                </div>
                <p class="auth-error-msg" id="auth-error-msg"></p>
                <button type="submit" class="btn-auth-submit" id="btn-auth-submit">
                    <span id="auth-submit-text">INICIAR SESIÓN</span>
                    <span class="auth-spinner" id="auth-spinner" style="display:none"></span>
                </button>
            </form>

            <!-- Footer links -->
            <div class="auth-footer-links">
                <span>¿No tienes cuenta?</span>
                <button class="auth-link-btn" id="auth-toggle-mode">Regístrate gratis</button>
            </div>
            <div class="auth-legal">
                Al continuar, aceptas nuestros <a href="privacidad.html">Términos y Política de Privacidad</a>.
            </div>
        </div>
    </div>
`;
