"use client";
import React, { useState } from "react";
import gsap from "gsap";

export default function Contact() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        gsap.fromTo(".success-msg", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" });
      }, 0);
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 bg-black relative">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white text-center mb-12">Let&apos;s Connect</h2>
        <form onSubmit={handleSubmit} className="space-y-8 bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-md">
          {status === "success" ? (
            <div className="success-msg text-center py-20">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-3xl font-bold text-cyan-400">Message Sent!</h3>
              <p className="text-gray-400 mt-2">I&apos;ll get back to you shortly.</p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <label className="text-sm text-gray-400 uppercase tracking-widest">Name</label>
                <input required type="text" className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400 uppercase tracking-widest">Email</label>
                <input required type="email" className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors" placeholder="name@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400 uppercase tracking-widest">Message</label>
                <textarea required rows={4} className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors" placeholder="Hello..."></textarea>
              </div>
              <button disabled={status === "submitting"} type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-shadow duration-300 disabled:opacity-50 flex justify-center items-center">
                {status === "submitting" ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Send Message"
                )}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
