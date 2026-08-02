"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import {
  DiningGroupError,
  DiningGroupInvite,
  joinDiningGroup,
  loadDiningGroup,
} from "@/lib/dining-groups";

const playStoreUrl = "https://play.google.com/store/apps/details?id=com.cata.app";

const copy = {
  loading: "Preparando tu lugar en la mesa…",
  unavailableTitle: "Esta invitación no está disponible",
  unavailableBody: "El enlace puede haber vencido, ser incorrecto o el anfitrión pudo haber cerrado las invitaciones.",
  connectionTitle: "No pudimos abrir la invitación",
  connectionBody: "Revisa tu conexión e inténtalo de nuevo.",
  closedTitle: "Esta mesa ya no acepta invitados",
  closedBody: "Pídele al anfitrión una nueva invitación o confirma que la mesa siga abierta.",
};

type ViewState =
  | { name: "loading" }
  | { name: "unavailable" }
  | { name: "connection" }
  | { name: "ready"; invite: DiningGroupInvite }
  | { name: "success"; invite: DiningGroupInvite; guestName?: string };

async function resolveInvite(): Promise<ViewState> {
  const tableId = new URLSearchParams(window.location.search).get("table")?.trim();
  if (!tableId || tableId.length > 256 || tableId.includes("/")) {
    return { name: "unavailable" };
  }

  try {
    const invite = await loadDiningGroup(tableId);
    if (invite.alreadyJoined) return { name: "success", invite };
    if (!invite.inviteOpen || invite.status !== "open") return { name: "unavailable" };
    return { name: "ready", invite };
  } catch (error) {
    return {
      name: error instanceof DiningGroupError && error.reason === "connection" ? "connection" : "unavailable",
    };
  }
}

function MemberStack({ members }: { members: DiningGroupInvite["members"] }) {
  if (!members.length) return <p className="text-sm text-muted-foreground">Sé la primera persona en unirse.</p>;

  const visible = members.slice(0, 5);
  return (
    <div className="flex items-center justify-center md:justify-start">
      <div className="flex -space-x-2" aria-label={`${members.length} personas ya están en la mesa`}>
        {visible.map((member, index) => (
          <div
            key={`${member.name}-${index}`}
            title={member.name}
            className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-card bg-brand-gold text-sm font-bold text-foreground"
          >
            {member.photoURL ? (
              <span
                role="img"
                aria-label={member.name}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${JSON.stringify(member.photoURL).slice(1, -1)})` }}
              />
            ) : (
              member.name.slice(0, 1).toUpperCase()
            )}
          </div>
        ))}
      </div>
      <p className="ml-3 text-sm text-muted-foreground">
        {members.length === 1 ? "1 persona ya está aquí" : `${members.length} personas ya están aquí`}
      </p>
    </div>
  );
}

function StatusCard({ state, onRetry }: { state: "unavailable" | "connection"; onRetry: () => void }) {
  const isConnection = state === "connection";
  return (
    <div className="text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-3xl" aria-hidden="true">🍽️</div>
      <h1 className="mt-6 text-3xl font-semibold">{isConnection ? copy.connectionTitle : copy.unavailableTitle}</h1>
      <p className="mx-auto mt-4 max-w-md leading-7 text-muted-foreground">
        {isConnection ? copy.connectionBody : copy.unavailableBody}
      </p>
      {isConnection && (
        <button type="button" onClick={onRetry} className="mt-7 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background">
          Intentar de nuevo
        </button>
      )}
      <Link href="/" className="mt-6 block text-sm font-medium text-accent underline underline-offset-4">Ir a CATA</Link>
    </div>
  );
}

export function JoinTableClient() {
  const [state, setState] = useState<ViewState>({ name: "loading" });
  const [displayName, setDisplayName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    void resolveInvite().then(setState);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state.name !== "ready" || !displayName.trim() || submitting) return;

    setSubmitting(true);
    setSubmitError(false);
    try {
      await joinDiningGroup(state.invite.id, state.invite.uid, displayName);
      setState({ name: "success", invite: state.invite, guestName: displayName.trim() });
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (state.name === "loading") {
    return (
      <div className="text-center" role="status">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-border border-t-accent" />
        <p className="mt-5 text-sm text-muted-foreground">{copy.loading}</p>
      </div>
    );
  }

  if (state.name === "unavailable" || state.name === "connection") {
    return <StatusCard state={state.name} onRetry={() => {
      setState({ name: "loading" });
      void resolveInvite().then(setState);
    }} />;
  }

  if (state.name === "success") {
    return (
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/15 text-3xl" aria-hidden="true">✓</div>
        <p className="mt-6 font-hand text-2xl font-semibold text-accent">¡Ya estás en la mesa!</p>
        <h1 className="mt-2 text-4xl font-semibold">{state.invite.name}</h1>
        <p className="mt-3 text-muted-foreground">
          {state.guestName ? `${state.guestName}, tu lugar quedó guardado.` : "Tu lugar ya estaba guardado."}
        </p>
        <div className="mt-8 rounded-2xl bg-secondary p-5 text-sm leading-6 text-muted-foreground">
          Abre CATA para dividir la cuenta, ordenar y participar con el grupo. Esas funciones están disponibles únicamente dentro de la app.
        </div>
        <a href={playStoreUrl} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-12 items-center rounded-full bg-foreground px-6 font-semibold text-background transition hover:bg-accent">
          Descargar para Android
        </a>
        <p className="mt-4 text-sm text-muted-foreground">Versión para iPhone: próximamente en App Store.</p>
      </div>
    );
  }

  const { invite } = state;
  return (
    <div>
      {invite.restaurantPhoto && (
        <div
          role="img"
          aria-label={invite.restaurantName}
          className="mb-7 h-40 rounded-2xl bg-surface-3 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(to top, rgba(26,26,24,.25), transparent), url(${JSON.stringify(invite.restaurantPhoto).slice(1, -1)})` }}
        />
      )}
      <p className="font-hand text-2xl font-semibold text-accent">Te invitaron a compartir la mesa</p>
      <h1 className="mt-2 text-4xl font-semibold leading-tight">{invite.name}</h1>
      <p className="mt-3 text-muted-foreground">{invite.restaurantName}</p>
      <div className="mt-6"><MemberStack members={invite.members} /></div>

      <form onSubmit={handleSubmit} className="mt-9">
        <label htmlFor="guest-name" className="block text-sm font-semibold">¿Cómo te llamas?</label>
        <input
          id="guest-name"
          name="guest-name"
          type="text"
          autoComplete="name"
          maxLength={60}
          required
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
          placeholder="Tu nombre"
          className="mt-2 min-h-13 w-full rounded-xl border border-border-2 bg-background px-4 text-base outline-none transition placeholder:text-muted-foreground/70 focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
        {submitError && (
          <div role="alert" className="mt-4 rounded-xl bg-destructive/10 p-4 text-sm text-destructive">
            <p className="font-semibold">{copy.closedTitle}</p>
            <p className="mt-1">{copy.closedBody}</p>
          </div>
        )}
        <button
          type="submit"
          disabled={submitting || !displayName.trim()}
          className="mt-5 flex min-h-13 w-full items-center justify-center rounded-full bg-foreground px-6 font-semibold text-background transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Guardando tu lugar…" : "Unirme a la mesa"}
        </button>
      </form>
      <p className="mt-5 text-center text-xs leading-5 text-muted-foreground">
        Al continuar se crea un acceso temporal seguro para añadirte a esta mesa.
      </p>
    </div>
  );
}
