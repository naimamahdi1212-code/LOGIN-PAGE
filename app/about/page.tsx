"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // Where Supabase sends the user after they click the magic link.
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
    } else {
      setStatus("sent");
    }
  }

  return (
    <div className="login-wrap">
      <div className="login-box">
        <h1 style={{ fontSize: "1.5rem" }}>Sign in</h1>
        <p style={{ color: "#94a3b8", marginTop: "0.25rem" }}>
          Enter your email to sign in
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "sending" || status === "sent"}
          />
          <button type="submit" disabled={status === "sending" || status === "sent"}>
            {status === "sending" ? "Sending…" : "Send login link"}
          </button>
        </form>

        {status === "sent" && (
          <div className="message success">
            Check your email for a login link (and check spam if you don't
            see it within a minute).
          </div>
        )}

        {status === "error" && (
          <div className="message error">
            Something went wrong: {errorMsg}
          </div>
        )}
      </div>
    </div>
  );
}
