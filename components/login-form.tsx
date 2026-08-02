"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  resetPassword,
  signInWithEmail,
  signInWithGoogle,
  signUpWithEmail,
} from "@/lib/auth-service";
import { firebaseErrorCode, getAuthErrorMessage } from "@/lib/auth-error-messages";

type Mode = "signin" | "signup";

export function LoginForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);
  const [next, setNext] = useState("/");

  useEffect(() => {
    void Promise.resolve().then(() => {
      const target = new URLSearchParams(window.location.search).get("next");
      if (target && target.startsWith("/")) setNext(target);
    });
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setError(null);
    setResetSent(false);
    setSubmitting(true);
    try {
      if (mode === "signup") {
        await signUpWithEmail(displayName, email, password);
      } else {
        await signInWithEmail(email, password);
      }
      router.push(next);
    } catch (err) {
      setError(getAuthErrorMessage(firebaseErrorCode(err)));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogle() {
    if (googleSubmitting) return;
    setError(null);
    setResetSent(false);
    setGoogleSubmitting(true);
    try {
      await signInWithGoogle();
      router.push(next);
    } catch (err) {
      setError(getAuthErrorMessage(firebaseErrorCode(err)));
    } finally {
      setGoogleSubmitting(false);
    }
  }

  async function handleForgotPassword() {
    if (!email.trim()) {
      setError("Escribe tu correo arriba y toca de nuevo en “Olvidé mi contraseña”.");
      return;
    }
    setError(null);
    try {
      await resetPassword(email.trim());
      setResetSent(true);
    } catch (err) {
      setError(getAuthErrorMessage(firebaseErrorCode(err)));
    }
  }

  const busy = submitting || googleSubmitting;

  return (
    <div>
      <div className="flex gap-1 rounded-full bg-secondary p-1">
        <button
          type="button"
          onClick={() => setMode("signin")}
          className={`min-h-10 flex-1 rounded-full text-sm font-semibold transition ${
            mode === "signin" ? "bg-foreground text-background" : "text-muted-foreground"
          }`}
        >
          Iniciar sesión
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`min-h-10 flex-1 rounded-full text-sm font-semibold transition ${
            mode === "signup" ? "bg-foreground text-background" : "text-muted-foreground"
          }`}
        >
          Crear cuenta
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-7 space-y-4">
        {mode === "signup" && (
          <div>
            <label htmlFor="displayName" className="block text-sm font-semibold">
              Nombre
            </label>
            <input
              id="displayName"
              type="text"
              autoComplete="name"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="mt-2 min-h-13 w-full rounded-xl border border-border-2 bg-background px-4 text-base outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </div>
        )}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 min-h-13 w-full rounded-xl border border-border-2 bg-background px-4 text-base outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-semibold">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 min-h-13 w-full rounded-xl border border-border-2 bg-background px-4 text-base outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>

        {mode === "signin" && (
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm font-medium text-accent underline underline-offset-4"
          >
            Olvidé mi contraseña
          </button>
        )}

        {resetSent && (
          <div role="status" className="rounded-xl bg-brand-green/10 p-4 text-sm text-foreground">
            Te enviamos un correo para restablecer tu contraseña.
          </div>
        )}
        {error && (
          <div role="alert" className="rounded-xl bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={busy}
          className="flex min-h-13 w-full items-center justify-center rounded-full bg-foreground px-6 font-semibold text-background transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Un momento…" : mode === "signup" ? "Crear cuenta" : "Iniciar sesión"}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs uppercase tracking-widest text-muted-foreground">o</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <button
        type="button"
        onClick={handleGoogle}
        disabled={busy}
        className="flex min-h-13 w-full items-center justify-center gap-2 rounded-full border border-border-2 bg-background px-6 font-semibold text-foreground transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
      >
        {googleSubmitting ? "Un momento…" : "Continuar con Google"}
      </button>
    </div>
  );
}
