"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useUserAuth } from "@/context/UserAuthContext";

type AuthView = "login" | "register" | "reset";

export default function AuthModal() {
  const { showAuthModal, closeAuthModal, login, register, resetPassword } = useUserAuth();
  const [view, setView] = useState<AuthView>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
    setShowPassword(false);
    setResetSent(false);
  };

  const switchView = (v: AuthView) => {
    resetForm();
    setView(v);
  };

  const handleClose = () => {
    resetForm();
    setView("login");
    closeAuthModal();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      handleClose();
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code || "";
      if (code === "auth/user-not-found" || code === "auth/invalid-credential") {
        setError("No account found with this email. Please sign up.");
      } else if (code === "auth/wrong-password") {
        setError("Incorrect password. Try again.");
      } else if (code === "auth/too-many-requests") {
        setError("Too many attempts. Please try again later.");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await register(email, password);
      handleClose();
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code || "";
      if (code === "auth/email-already-in-use") {
        setError("This email is already registered. Please login.");
      } else if (code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (code === "auth/weak-password") {
        setError("Password is too weak. Use at least 6 characters.");
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }
    setLoading(true);
    try {
      await resetPassword(email);
      setResetSent(true);
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code || "";
      if (code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else {
        setError("Failed to send reset email. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {showAuthModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="relative px-6 pt-6 pb-4">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center">
                <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-serif font-bold text-lg">P</span>
                </div>
                <h2 className="text-xl font-bold text-neutral-900">
                  {view === "login" && "Welcome back"}
                  {view === "register" && "Create account"}
                  {view === "reset" && "Reset password"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {view === "login" && "Sign in to place your order"}
                  {view === "register" && "Sign up to start ordering"}
                  {view === "reset" && "We'll send you a reset link"}
                </p>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mx-6 mb-3 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Login Form */}
            {view === "login" && (
              <form onSubmit={handleLogin} className="px-6 pb-6 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-neutral-200 focus:border-neutral-400 transition-all"
                      placeholder="you@example.com"
                      required
                      autoFocus
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-neutral-200 focus:border-neutral-400 transition-all"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => switchView("reset")}
                    className="text-xs text-neutral-600 hover:text-neutral-900 font-medium"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-neutral-900 text-white font-semibold rounded-xl hover:bg-neutral-800 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Sign In
                </button>

                <p className="text-center text-sm text-gray-500 pt-2">
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => switchView("register")}
                    className="text-neutral-900 hover:text-brand-700 font-semibold"
                  >
                    Sign Up
                  </button>
                </p>
              </form>
            )}

            {/* Register Form */}
            {view === "register" && (
              <form onSubmit={handleRegister} className="px-6 pb-6 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-neutral-200 focus:border-neutral-400 transition-all"
                      placeholder="you@example.com"
                      required
                      autoFocus
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-neutral-200 focus:border-neutral-400 transition-all"
                      placeholder="At least 6 characters"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-neutral-200 focus:border-neutral-400 transition-all"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-neutral-900 text-white font-semibold rounded-xl hover:bg-neutral-800 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Create Account
                </button>

                <p className="text-center text-sm text-gray-500 pt-2">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => switchView("login")}
                    className="text-neutral-900 hover:text-brand-700 font-semibold"
                  >
                    Sign In
                  </button>
                </p>
              </form>
            )}

            {/* Reset Password Form */}
            {view === "reset" && (
              <div className="px-6 pb-6">
                {resetSent ? (
                  <div className="text-center py-4">
                    <div className="w-14 h-14 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Mail className="w-7 h-7 text-brand-700" />
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Password reset link sent to <strong>{email}</strong>. Check your inbox.
                    </p>
                    <button
                      onClick={() => switchView("login")}
                      className="text-sm text-neutral-900 hover:text-brand-700 font-semibold"
                    >
                      Back to Sign In
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleReset} className="space-y-3">
                    <button
                      type="button"
                      onClick={() => switchView("login")}
                      className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 mb-2"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Back to login
                    </button>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-neutral-200 focus:border-neutral-400 transition-all"
                          placeholder="you@example.com"
                          required
                          autoFocus
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 bg-neutral-900 text-white font-semibold rounded-xl hover:bg-neutral-800 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                    >
                      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                      Send Reset Link
                    </button>
                  </form>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
