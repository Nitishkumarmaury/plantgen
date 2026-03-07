"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Gift,
  Building2,
  PartyPopper,
  HandHeart,
  Send,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";
import { sanitizeInput } from "@/lib/sanitize";

const EVENT_TYPES = [
  { label: "Corporate Gifting", icon: Building2 },
  { label: "Birthday / Anniversary", icon: Gift },
  { label: "Party / Celebration", icon: PartyPopper },
  { label: "Welcome / Onboarding Gift", icon: HandHeart },
  { label: "Festival / Holiday", icon: Sparkles },
  { label: "Other", icon: Gift },
] as const;

const BUDGET_OPTIONS = [
  "₹800 – ₹2,000",
  "₹2,000 – ₹5,000",
  "₹5,000 – ₹15,000",
  "₹15,000 – ₹50,000",
  "₹50,000+",
  "Not sure yet",
] as const;

interface FormData {
  name: string;
  phone: string;
  eventType: string;
  plantCount: string;
  budget: string;
  message: string;
}

export default function CustomOrderPage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    eventType: "",
    plantCount: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const isValid =
    form.name.trim().length >= 2 &&
    /^[6-9]\d{9}$/.test(form.phone.trim()) &&
    form.eventType !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    const lines = [
      `Hi Plantgen! I'd like to place a custom plant gift order.`,
      ``,
      `Name: ${sanitizeInput(form.name.trim())}`,
      `Phone: ${form.phone.trim()}`,
      `Event: ${form.eventType}`,
      form.plantCount ? `Plants needed: ${sanitizeInput(form.plantCount.trim())}` : "",
      form.budget ? `Budget: ${form.budget}` : "",
      form.message ? `Message: ${sanitizeInput(form.message.trim())}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(WHATSAPP_URL(lines), "_blank");
    setSubmitted(true);
  };

  const update = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  if (submitted) {
    return (
      <div className="pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto text-center px-4"
        >
          <CheckCircle2 className="w-16 h-16 text-brand-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">
            Request Sent!
          </h1>
          <p className="text-neutral-500 mb-6">
            Your custom order request has been sent via WhatsApp. Our team
            will get back to you shortly.
          </p>
          <button
            onClick={() => {
              setForm({ name: "", phone: "", eventType: "", plantCount: "", budget: "", message: "" });
              setSubmitted(false);
            }}
            className="px-6 py-3 bg-neutral-900 text-white rounded-xl font-medium hover:bg-neutral-800 transition-colors"
          >
            Submit Another Request
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 bg-brand-50 px-3 py-1 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Custom Orders
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-3">
            Request a Custom Plant Gift
          </h1>
          <p className="text-neutral-500 max-w-lg mx-auto">
            Planning for an event, corporate gifting, or a special celebration?
            Tell us what you need and we&apos;ll curate the perfect plant gifts.
          </p>
        </motion.div>

        {/* Use cases */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10"
        >
          {[
            "Events & Celebrations",
            "Corporate Welcome Kits",
            "Party Favours",
            "Office Desk Gifts",
            "Festival Gifting",
            "Bulk Orders (50+)",
          ].map((item) => (
            <div
              key={item}
              className="bg-brand-50/50 border border-brand-100 rounded-xl px-4 py-3 text-center"
            >
              <p className="text-sm font-medium text-brand-800">{item}</p>
            </div>
          ))}
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 space-y-6"
        >
          {/* Name & Phone */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="co-name" className="block text-sm font-medium text-neutral-700 mb-1.5">
                Your Name *
              </label>
              <input
                id="co-name"
                type="text"
                required
                maxLength={100}
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Rahul Sharma"
                className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-200 focus:border-brand-400 transition-all"
              />
            </div>
            <div>
              <label htmlFor="co-phone" className="block text-sm font-medium text-neutral-700 mb-1.5">
                Phone Number *
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 border border-r-0 border-neutral-200 bg-neutral-50 rounded-l-xl text-sm text-neutral-500">
                  +91
                </span>
                <input
                  id="co-phone"
                  type="tel"
                  required
                  maxLength={10}
                  pattern="[6-9][0-9]{9}"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="9555179269"
                  className="flex-1 px-4 py-2.5 border border-neutral-200 rounded-r-xl text-sm focus:ring-2 focus:ring-brand-200 focus:border-brand-400 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Event Type */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Event Type *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {EVENT_TYPES.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => update("eventType", label)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                    form.eventType === label
                      ? "border-brand-500 bg-brand-50 text-brand-700"
                      : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Plant count & budget */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="co-count" className="block text-sm font-medium text-neutral-700 mb-1.5">
                Number of Plants
              </label>
              <input
                id="co-count"
                type="text"
                maxLength={10}
                value={form.plantCount}
                onChange={(e) => update("plantCount", e.target.value)}
                placeholder="e.g. 25"
                className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-200 focus:border-brand-400 transition-all"
              />
            </div>
            <div>
              <label htmlFor="co-budget" className="block text-sm font-medium text-neutral-700 mb-1.5">
                Budget Range
              </label>
              <select
                id="co-budget"
                value={form.budget}
                onChange={(e) => update("budget", e.target.value)}
                className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-200 focus:border-brand-400 transition-all bg-white"
              >
                <option value="">Select budget</option>
                {BUDGET_OPTIONS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="co-message" className="block text-sm font-medium text-neutral-700 mb-1.5">
              Additional Details
            </label>
            <textarea
              id="co-message"
              rows={3}
              maxLength={500}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="Any preferences — plant types, pot colors, branding, delivery date..."
              className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-200 focus:border-brand-400 transition-all resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all ${
              isValid
                ? "bg-[#25D366] text-white hover:bg-[#20BD5A] active:scale-[0.98] shadow-lg shadow-[#25D366]/20"
                : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
            }`}
          >
            <Send className="w-4 h-4" />
            Send Request via WhatsApp
          </button>

          <p className="text-xs text-center text-neutral-400">
            Your details will be sent to our WhatsApp. We reply within 30 minutes during business hours.
          </p>
        </motion.form>
      </div>
    </div>
  );
}
