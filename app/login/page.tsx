"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, FormEvent } from "react";
import { signIn } from "@/lib/auth";
import { useRouter } from "next/navigation";

const OTHER_FEATURE_LOGIN_DISABLED = true; // Toggle this to enable/disable phone login (optional)

const SignInPage = () => {

    const router=useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneLoginDisabled, setPhoneLoginDisabled] = useState(false);

    // Utility to clear all messages
    const clearMessages = () => {
        setError("");
        setSuccess("");
    };

    // Remove any feedback when an input or event is triggered
    const handleInput = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setter(e.target.value);
        clearMessages();
    };

    const handleEmailInput = handleInput(setEmail);
    const handlePasswordInput = handleInput(setPassword);
    const handlePhoneInput = handleInput(setPhone);

    const handleSignin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        clearMessages();
        try {
            const data = await signIn(email, password);
            if (data) {
                setSuccess("Login successful.");
                setEmail("");
                setPassword("");
                router.push("/dashboard")
            } else {
                setError("Login failed. Please try again.");
            }
        } catch (error: any) {
            setError(error?.message || "An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center px-4 py-12 bg-[#0b0b10]">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/50 shadow-[0_20px_80px_rgba(0,0,0,0.6)] backdrop-blur">
                <div className="px-6 pt-7 pb-6">
                    <div className="flex items-center justify-center text-white mb-6">
                        <Image src="/logo_text.png" alt="DevFlow" width={224} height={224} />
                        {/* <div className="h-6 w-6 rounded-md bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-[0_8px_30px_rgba(139,92,246,0.35)]" /> */}
                        {/* <span className="font-semibold tracking-tight">DevFlow</span> */}
                    </div>

                    <div className="text-center mb-6">
                        <h1 className="text-xl font-semibold text-white">Log in to your account</h1>
                        <p className="mt-1 text-sm text-white/60">Sign in to your DevFlow dashboard</p>
                    </div>

                    <div className="space-y-2">
                        <button
                            type="button"
                            disabled={OTHER_FEATURE_LOGIN_DISABLED}
                            title={OTHER_FEATURE_LOGIN_DISABLED ? "GitHub login is temporarily unavailable. Please log in with email." : ""}
                            className={`w-full h-10 rounded-lg border border-white/10 bg-white/5 text-sm text-white hover:bg-white/10 transition flex items-center justify-center gap-2 ${OTHER_FEATURE_LOGIN_DISABLED ? "cursor-not-allowed opacity-50" : ""}`}
                        >
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="text-white/90">
                                    <path d="M12 2C6.477 2 2 6.475 2 12a10 10 0 0 0 6.838 9.488c.5.092.682-.217.682-.483 0-.238-.01-1.022-.014-1.853-2.782.605-3.369-1.18-3.369-1.18-.455-1.156-1.11-1.464-1.11-1.464-.908-.621.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.091-.647.35-1.087.636-1.337-2.22-.252-4.555-1.11-4.555-4.943 0-1.092.39-1.984 1.03-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.026 2.748-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.591 1.028 2.683 0 3.842-2.338 4.687-4.566 4.934.36.309.68.919.68 1.852 0 1.337-.012 2.415-.012 2.743 0 .268.18.58.688.481A10.001 10.001 0 0 0 22 12c0-5.525-4.477-10-10-10Z" />
                                </svg>
                            </span>
                            Continue with GitHub
                        </button>
                        <button
                            type="button"
                            disabled={OTHER_FEATURE_LOGIN_DISABLED}
                            title={OTHER_FEATURE_LOGIN_DISABLED ? "Google login is temporarily unavailable. Please log in with email." : ""}
                            className={`w-full h-10 rounded-lg border border-white/10 bg-white/5 text-sm text-white hover:bg-white/10 transition flex items-center justify-center gap-2 ${OTHER_FEATURE_LOGIN_DISABLED ? "cursor-not-allowed opacity-50" : ""}`}
                        >
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10">
                                <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.2-1.4 3.5-5.5 3.5-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.1.8 3.8 1.5l2.6-2.6C17.8 3.8 15.2 2.4 12 2.4 6.8 2.4 2.6 6.6 2.6 11.6S6.8 20.8 12 20.8c6.9 0 8.6-4.8 8.6-7.2 0-.5-.1-1-.2-1.4H12Z" />
                                    <path fill="#34A853" d="M3.7 7.3l3.2 2.3c.9-2 2.9-3.4 5.1-3.4 1.9 0 3.1.8 3.8 1.5l2.6-2.6C17.8 3.8 15.2 2.4 12 2.4c-3.6 0-6.7 2-8.3 4.9Z" />
                                    <path fill="#FBBC05" d="M12 20.8c3.1 0 5.7-1 7.6-2.8l-3.5-2.7c-.9.6-2.1 1-4.1 1-2.9 0-5.3-2-6.2-4.6l-3.1 2.4c1.6 3.1 4.9 5.7 9.3 5.7Z" />
                                    <path fill="#4285F4" d="M20.4 13.6c.1-.4.2-.9.2-1.4 0-.5-.1-1-.2-1.4H12v2.8h5.5c-.2 1.2-1.4 3.5-5.5 3.5v3.7c3.1 0 5.7-1 7.6-2.8 1.2-1.1 1.9-2.6 1.9-4.4Z" />
                                </svg>
                            </span>
                            Continue with Google
                        </button>
                    </div>

                    <div className="my-5 flex items-center gap-3">
                        <div className="h-px flex-1 bg-white/10" />
                        <div className="text-xs text-white/50">or log in with Email</div>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>

                    <form onSubmit={handleSignin} className="space-y-3">
                        <div>
                            <label className="block text-xs text-white/60 mb-1" htmlFor="email">Email address</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={handleEmailInput}
                                className="w-full h-10 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20"
                                required
                                disabled={loading}
                                autoComplete="username"
                                placeholder="Email address"
                            />
                        </div>

                        <div>
                            <label className="block text-xs text-white/60 mb-1" htmlFor="password">Password</label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={handlePasswordInput}
                                    className="w-full h-10 rounded-lg border border-white/10 bg-white/5 px-3 pr-10 text-sm text-white placeholder:text-white/30 outline-none focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20"
                                    required
                                    disabled={loading}
                                    autoComplete="new-password"
                                    placeholder="Password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute inset-y-0 right-0 px-3 text-white/60 hover:text-white transition"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    disabled={loading}
                                >
                                    {showPassword ? (
                                        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                                            <path d="M3.28 2.22 2.22 3.28l4.05 4.05C4.2 8.89 2.7 10.89 2 12c1.73 2.75 4.8 6 10 6 2.03 0 3.78-.5 5.28-1.25l3.44 3.44 1.06-1.06L3.28 2.22ZM12 16c-2.2 0-4-1.8-4-4 0-.56.12-1.09.33-1.56l5.23 5.23c-.47.21-1 .33-1.56.33Zm9.9-4c-.56-.89-1.66-2.39-3.35-3.73l-1.13 1.13c1.16.92 2 1.95 2.53 2.6-.98 1.25-3.51 4-7.95 4-.83 0-1.61-.1-2.33-.28l-1.6-1.6c.58.53 1.34.88 2.18.88 1.8 0 3.25-1.45 3.25-3.25 0-.84-.35-1.6-.88-2.18l-1.58-1.58c.71-.17 1.45-.24 2.21-.24 4.44 0 6.97 2.75 7.95 4Z" />
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                                            <path d="M12 5c5.2 0 8.27 3.25 10 6-1.73 2.75-4.8 6-10 6S3.73 13.75 2 11c1.73-2.75 4.8-6 10-6Zm0 2C7.56 7 5.03 9.75 4.05 11 5.03 12.25 7.56 15 12 15s6.97-2.75 7.95-4C18.97 9.75 16.44 7 12 7Zm0 1.5A2.5 2.5 0 1 1 9.5 11 2.5 2.5 0 0 1 12 8.5Z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="my-5 flex items-center gap-3">
                        <div className="h-px flex-1 bg-white/10" />
                        <div className="text-xs text-white/50">or log in with phone</div>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>
                        <div>
                            <label className="block text-xs text-white/60 mb-1" htmlFor="phone">
                                Phone number <span className="text-white/40">(optional)</span>
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                value={phone}
                                onChange={handlePhoneInput}
                                onFocus={() => {
                                    if (OTHER_FEATURE_LOGIN_DISABLED) setPhoneLoginDisabled(true);
                                }}
                                onClick={() => {
                                    if (OTHER_FEATURE_LOGIN_DISABLED) setPhoneLoginDisabled(true);
                                }}
                                className={`w-full h-10 rounded-lg border px-3 text-sm outline-none transition ${OTHER_FEATURE_LOGIN_DISABLED
                                        ? "border-white/10 bg-white/5 text-white/50 placeholder:text-white/20 cursor-not-allowed"
                                        : "border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20"
                                    }`}
                                placeholder="1 (000-000-0000)"
                                disabled={OTHER_FEATURE_LOGIN_DISABLED || loading}
                                autoComplete="tel"
                            />
                            {(OTHER_FEATURE_LOGIN_DISABLED && phoneLoginDisabled) && (
                                <div className="mt-2 text-xs text-red-400">
                                    Phone/OTP login is temporarily unavailable. Please log in with email.
                                </div>
                            )}
                        </div>

                        {error && (
                            <div className="pt-1 text-sm text-red-400">{error}</div>
                        )}
                        {success && (
                            <div className="pt-1 text-sm text-emerald-400">{success}</div>
                        )}

                        <button
                            type="submit"
                            className={`w-full h-10 rounded-lg font-medium text-sm text-white transition ${loading ? "bg-violet-500/60 cursor-not-allowed" : "bg-violet-600 hover:bg-violet-500"
                                }`}
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Log In"}
                        </button>
                    </form>

                    <div className="mt-5 text-center text-xs text-white/60">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-white hover:text-white/90 underline underline-offset-4">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;