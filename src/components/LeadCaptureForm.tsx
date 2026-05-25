"use client";

import { useState } from "react";

type Props = {
  monthlySavings: number;
  annualSavings: number;
};

export default function LeadCaptureForm({
  monthlySavings,
  annualSavings,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    const payload = {
      email: formData.get("email"),
      companyName: formData.get("company"),
      role: formData.get("role"),
      teamSize: formData.get("teamSize"),
      monthlySavings,
      annualSavings,
    };

    try {
      await fetch("/api/save-lead", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      await fetch("/api/send-email", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setSuccess(true);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  if (success) {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6">
        <p className="text-emerald-300 font-semibold">
          Audit emailed successfully.
        </p>

        <p className="text-zinc-400 text-sm mt-2">
          Check your inbox for the audit summary.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-5">
      <div>
        <h2 className="text-2xl font-bold">
          Get the full audit report
        </h2>

        <p className="text-zinc-400 mt-2">
          Receive your audit summary and future optimization alerts.
        </p>
      </div>

      <form action={handleSubmit} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm text-zinc-300">
              Email address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="founder@startup.com"
              className="bg-black border border-zinc-700 rounded-xl px-4 py-3 w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="company" className="text-sm text-zinc-300">
              Company name
            </label>

            <input
              id="company"
              name="company"
              type="text"
              placeholder="Acme AI"
              className="bg-black border border-zinc-700 rounded-xl px-4 py-3 w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="role" className="text-sm text-zinc-300">
              Role
            </label>

            <input
              id="role"
              name="role"
              type="text"
              placeholder="Founder"
              className="bg-black border border-zinc-700 rounded-xl px-4 py-3 w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="teamSize" className="text-sm text-zinc-300">
              Team size
            </label>

            <input
              id="teamSize"
              name="teamSize"
              type="number"
              min="1"
              placeholder="12"
              className="bg-black border border-zinc-700 rounded-xl px-4 py-3 w-full"
            />
          </div>

          <input
            type="text"
            name="website"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-white text-black px-5 py-3 rounded-xl font-semibold"
        >
          {loading ? "Sending..." : "Email me this audit"}
        </button>
      </form>
    </div>
  );
}