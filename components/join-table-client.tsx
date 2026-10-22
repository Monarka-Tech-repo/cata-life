"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import {
  DiningGroupError,
  DiningGroupInvite,
  joinDiningGroup,
  loadDiningGroup,
} from "@/lib/dining-groups";
import { useI18n } from "@/components/locale-provider";

const playStoreUrl = "https://play.google.com/store/apps/details?id=com.cata.app";

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
  const { t } = useI18n();
  const copy = t.joinTable;
  if (!members.length) return <p className="text-sm text-muted-foreground">{copy.beFirst}</p>;

  const visible = members.slice(0, 5);
  return (
    <div className="flex items-center justify-center md:justify-start">
      <div className="flex -space-x-2" aria-label={copy.peopleAtTable(members.length)}>
        {visible.map((member, index) => (
          <div
            key={`${member.name}-${index}`}
            title={member.name || copy.defaultGuest}
            className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-card bg-brand-gold text-sm font-bold text-foreground"
          >
            {member.photoURL ? (
              <span
                role="img"
                aria-label={member.name || copy.defaultGuest}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${JSON.stringify(member.photoURL).slice(1, -1)})` }}
              />
            ) : (
              (member.name || copy.defaultGuest).slice(0, 1).toUpperCase()
            )}
          </div>
        ))}
      </div>
      <p className="ml-3 text-sm text-muted-foreground">
        {copy.peopleHere(members.length)}
      </p>
    </div>
  );
}

function StatusCard({ state, onRetry }: { state: "unavailable" | "connection"; onRetry: () => void }) {
  const { t, href } = useI18n();
  const copy = t.joinTable;
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
          {t.common.retry}
        </button>
      )}
      <Link href={href("/")} className="mt-6 block text-sm font-medium text-accent underline underline-offset-4">{copy.goToCata}</Link>
    </div>
  );
}

export function JoinTableClient() {
  const { t } = useI18n();
  const copy = t.joinTable;
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
        <p className="mt-6 font-hand text-2xl font-semibold text-accent">{copy.joinedEyebrow}</p>
        <h1 className="mt-2 text-4xl font-semibold">{state.invite.name || copy.defaultTableName}</h1>
        <p className="mt-3 text-muted-foreground">
          {state.guestName ? copy.placeSaved(state.guestName) : copy.placeAlreadySaved}
        </p>
        <div className="mt-8 rounded-2xl bg-secondary p-5 text-sm leading-6 text-muted-foreground">
          {copy.openAppNote}
        </div>
        <a href={playStoreUrl} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-12 items-center rounded-full bg-foreground px-6 font-semibold text-background transition hover:bg-accent">
          {copy.downloadAndroid}
        </a>
        <p className="mt-4 text-sm text-muted-foreground">{copy.iphoneSoon}</p>
      </div>
    );
  }

  const { invite } = state;
  return (
    <div>
      {invite.restaurantPhoto && (
        <div
          role="img"
          aria-label={invite.restaurantName || copy.defaultRestaurant}
          className="mb-7 h-40 rounded-2xl bg-surface-3 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(to top, rgba(26,26,24,.25), transparent), url(${JSON.stringify(invite.restaurantPhoto).slice(1, -1)})` }}
        />
      )}
      <p className="font-hand text-2xl font-semibold text-accent">{copy.invitedEyebrow}</p>
      <h1 className="mt-2 text-4xl font-semibold leading-tight">{invite.name || copy.defaultTableName}</h1>
      <p className="mt-3 text-muted-foreground">{invite.restaurantName || copy.defaultRestaurant}</p>
      <div className="mt-6"><MemberStack members={invite.members} /></div>

      <form onSubmit={handleSubmit} className="mt-9">
        <label htmlFor="guest-name" className="block text-sm font-semibold">{copy.nameLabel}</label>
        <input
          id="guest-name"
          name="guest-name"
          type="text"
          autoComplete="name"
          maxLength={60}
          required
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
          placeholder={copy.namePlaceholder}
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
          {submitting ? copy.saving : copy.join}
        </button>
      </form>
      <p className="mt-5 text-center text-xs leading-5 text-muted-foreground">
        {copy.temporaryAccess}
      </p>
    </div>
  );
}
