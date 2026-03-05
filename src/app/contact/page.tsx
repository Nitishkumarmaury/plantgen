"use client";

import { useState } from "react";
import { FadeIn } from "@/components/ui/Animations";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  CheckCircle2,
  Instagram,
} from "lucide-react";

const contactMethods = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    detail: "+91 78888 88888",
    subtitle: "Fastest way to reach us",
    href: "https://wa.me/917888888888",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Phone,
    title: "Call Us",
    detail: "+91 78888 88888",
    subtitle: "Mon-Sat, 9 AM – 8 PM",
    href: "tel:+917888888888",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Mail,
    title: "Email",
    detail: "hello@plantgen.live",
    subtitle: "We reply within 24 hours",
    href: "mailto:hello@plantgen.live",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: Instagram,
    title: "Instagram",
    detail: "@plantgen.live",
    subtitle: "Follow us for updates",
    href: "https://instagram.com/plantgen.live",
    color: "bg-pink-50 text-pink-600",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build WhatsApp URL with message
    const text = `Hi Plantgen! I'm ${form.name} (${form.phone}). ${form.message}`;
    window.open(
      `https://wa.me/917888888888?text=${encodeURIComponent(text)}`,
      "_blank"
    );
    setSubmitted(true);
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-sage-900 mb-3">
              Get in Touch
            </h1>
            <p className="text-sage-500 max-w-lg mx-auto">
              Have a question about plant gifting, corporate orders, or
              delivery? We&apos;d love to hear from you.
            </p>
          </div>
        </FadeIn>

        {/* Contact Methods */}
        <FadeIn delay={0.05}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {contactMethods.map((m) => (
              <a
                key={m.title}
                href={m.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl p-5 border border-sage-100 hover:border-brand-200 hover:shadow-sm transition-all text-center group"
              >
                <div
                  className={`w-10 h-10 ${m.color} rounded-xl flex items-center justify-center mx-auto mb-3`}
                >
                  <m.icon className="w-5 h-5" />
                </div>
                <p className="text-sm font-semibold text-sage-900">{m.title}</p>
                <p className="text-xs text-sage-500 mt-1">{m.detail}</p>
                <p className="text-xs text-sage-400 mt-0.5">{m.subtitle}</p>
              </a>
            ))}
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Quick Message Form */}
          <FadeIn delay={0.1}>
            <div className="bg-white rounded-2xl p-6 border border-sage-100">
              <h2 className="text-lg font-semibold text-sage-900 mb-1">
                Send a Quick Message
              </h2>
              <p className="text-sm text-sage-500 mb-6">
                We&apos;ll open WhatsApp with your message ready to send.
              </p>

              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-3" />
                  <p className="font-medium text-sage-900 mb-1">
                    Message Ready!
                  </p>
                  <p className="text-sm text-sage-500">
                    Complete sending on WhatsApp. We&apos;ll reply ASAP!
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", phone: "", message: "" });
                    }}
                    className="mt-4 text-sm text-brand-600 hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-sage-600 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      required
                      className="w-full px-4 py-3 bg-sage-50 border border-sage-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-200 focus:border-brand-400 transition-all"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-sage-600 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, phone: e.target.value }))
                      }
                      required
                      className="w-full px-4 py-3 bg-sage-50 border border-sage-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-200 focus:border-brand-400 transition-all"
                      placeholder="10-digit phone"
                      maxLength={10}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-sage-600 mb-1.5">
                      Message
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, message: e.target.value }))
                      }
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-sage-50 border border-sage-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-200 focus:border-brand-400 transition-all resize-none"
                      placeholder="How can we help?"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 text-white font-medium rounded-xl hover:bg-brand-700 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    Send via WhatsApp
                  </button>
                </form>
              )}
            </div>
          </FadeIn>

          {/* Info */}
          <FadeIn delay={0.15}>
            <div className="space-y-6">
              {/* Location */}
              <div className="bg-white rounded-2xl p-6 border border-sage-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sage-900">Delivery Area</h3>
                    <p className="text-sm text-sage-500">
                      Chandigarh & Tricity
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-sage-600">
                  <p>✓ Chandigarh (all sectors)</p>
                  <p>✓ Mohali (Phases & sectors)</p>
                  <p>✓ Panchkula</p>
                  <p>✓ Zirakpur</p>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white rounded-2xl p-6 border border-sage-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-earth-50 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-earth-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sage-900">Business Hours</h3>
                    <p className="text-sm text-sage-500">
                      When we&apos;re available
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-sage-600">
                  <div className="flex justify-between">
                    <span>Monday – Saturday</span>
                    <span className="font-medium">9:00 AM – 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium">10:00 AM – 6:00 PM</span>
                  </div>
                  <p className="text-xs text-sage-400 pt-1">
                    * Same-day delivery for orders before 2 PM
                  </p>
                </div>
              </div>

              {/* Corporate */}
              <div className="bg-sage-900 rounded-2xl p-6 text-white">
                <h3 className="font-semibold mb-2">Corporate Orders?</h3>
                <p className="text-sm text-sage-300 mb-4">
                  Planning bulk plant gifts for your team, clients, or events?
                  We offer custom branding, competitive pricing, and dedicated support.
                </p>
                <a
                  href="https://wa.me/917888888888?text=Hi, I'm interested in corporate plant gifting for my company."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 rounded-xl text-sm font-medium hover:bg-brand-700 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Get Corporate Quote
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
