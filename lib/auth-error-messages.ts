const MESSAGES: Record<string, string> = {
  "auth/wrong-password": "Contraseña incorrecta.",
  "auth/invalid-credential": "Correo o contraseña incorrectos.",
  "auth/user-not-found": "No existe una cuenta con ese correo.",
  "auth/email-already-in-use": "Ya existe una cuenta con ese correo.",
  "auth/invalid-email": "El correo no es válido.",
  "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
  "auth/popup-closed-by-user": "Se cerró la ventana antes de completar el inicio de sesión. Intenta de nuevo.",
  "auth/popup-blocked": "Tu navegador bloqueó la ventana de Google. Permite ventanas emergentes para este sitio e intenta de nuevo.",
  "auth/cancelled-popup-request": "Se canceló el intento anterior. Intenta de nuevo.",
  "auth/unauthorized-domain": "Este sitio aún no está autorizado para iniciar sesión con Google. Contacta a soporte.",
  "auth/operation-not-allowed": "El inicio de sesión con Google no está disponible todavía. Contacta a soporte.",
  "auth/too-many-requests": "Demasiados intentos. Intenta de nuevo en unos minutos.",
};

export function getAuthErrorMessage(code: unknown): string {
  if (typeof code === "string" && MESSAGES[code]) return MESSAGES[code];
  return "Algo salió mal. Inténtalo de nuevo.";
}

export function firebaseErrorCode(error: unknown): string | undefined {
  if (typeof error === "object" && error && "code" in error) {
    return String((error as { code: unknown }).code);
  }
  return undefined;
}
