"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import PrismDecoration from "@/components/prism-decoration";

const steps = [
  { id: "personal", label: "PERSONAL" },
  { id: "employment", label: "EMPLOYMENT" },
  { id: "review", label: "REVIEW" },
];

export default function ApplicationForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", panNumber: "",
    annualIncome: "", city: "", employmentType: "",
  });

  function updateField(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section id="apply" className="bg-slate-veil/60 px-8 py-[108px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-[800px]"
        >
        <div className="section-number mb-6">
          <span className="text-[14px] font-[400] text-bone-white/50 tracking-[0.02em]">
            / 05
          </span>
        </div>
        <h2 className="mt-4 text-[56px] sm:text-[105px] font-[400] text-bone-white leading-[1.0] tracking-[-0.02em]">
          Application
          <br />
          <span className="font-[700]">submitted.</span>
        </h2>
          <p className="mt-8 text-[22px] font-[400] text-bone-white/60 leading-[1.4] max-w-[500px]">
            We&apos;ll match you with the best cards based on your profile. 
            Check your email for recommendations within 24 hours.
          </p>
          <button
            onClick={() => { setSubmitted(false); setStep(0); setFormData({ fullName: "", email: "", phone: "", panNumber: "", annualIncome: "", city: "", employmentType: "" }); }}
            className="mt-10 inline-flex items-center gap-2 text-[14px] font-[400] text-bone-white border border-bone-white px-[15px] py-[9px] tracking-[0.02em] hover:border-gunmetal-blue hover:text-gunmetal-blue transition-colors"
          >
            START OVER
            <ArrowRight size={14} />
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="apply" className="relative bg-slate-veil/60 px-8 py-[108px] overflow-hidden">
      <PrismDecoration count={2} variant="subtle" />
      <div className="relative z-10 max-w-[1400px]">
        <div className="section-number mb-6">
          <span className="text-[14px] font-[400] text-bone-white/50 tracking-[0.02em]">
            / 05
          </span>
        </div>
        <h2 className="mt-4 text-[56px] sm:text-[105px] font-[400] text-bone-white leading-[1.0] tracking-[-0.02em] max-w-[1100px]">
          Find your
          <br />
          <span className="font-[700]">perfect card.</span>
        </h2>
        <p className="mt-6 text-[18px] font-[400] text-bone-white/60 leading-[1.5] max-w-[480px]">
          Answer a few questions. Get matched with cards from 7 leading Indian banks.
        </p>

        <div className="mt-16 flex items-center gap-4 mb-16">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <span className={cn(
                  "text-[14px] font-[400] transition-colors tracking-[0.02em]",
                  i <= step ? "text-bone-white" : "text-bone-white/30"
                )}>
                  {i < step ? "✓" : s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={cn(
                  "w-8 h-px transition-colors",
                  i < step ? "bg-bone-white/40" : "bg-bone-white/10"
                )} />
              )}
            </div>
          ))}
        </div>

        <div className="max-w-[640px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {step === 0 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-[14px] font-[400] text-bone-white/50 tracking-[0.02em] mb-3">
                      FULL NAME
                    </label>
                    <input type="text" value={formData.fullName} onChange={(e) => updateField("fullName", e.target.value)}
                      placeholder="Divyanshu Mishra"
                      className="w-full bg-transparent border-b border-bone-white/20 pb-3 text-[18px] font-[400] text-bone-white placeholder:text-bone-white/20 outline-none focus:border-bone-white/60 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[14px] font-[400] text-bone-white/50 tracking-[0.02em] mb-3">EMAIL</label>
                    <input type="email" value={formData.email} onChange={(e) => updateField("email", e.target.value)}
                      placeholder="divyanshu@gmail.com"
                      className="w-full bg-transparent border-b border-bone-white/20 pb-3 text-[18px] font-[400] text-bone-white placeholder:text-bone-white/20 outline-none focus:border-bone-white/60 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[14px] font-[400] text-bone-white/50 tracking-[0.02em] mb-3">PHONE</label>
                    <input type="tel" value={formData.phone} onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-transparent border-b border-bone-white/20 pb-3 text-[18px] font-[400] text-bone-white placeholder:text-bone-white/20 outline-none focus:border-bone-white/60 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[14px] font-[400] text-bone-white/50 tracking-[0.02em] mb-3">PAN NUMBER</label>
                    <input type="text" value={formData.panNumber} onChange={(e) => updateField("panNumber", e.target.value)}
                      placeholder="ABCDE1234F"
                      className="w-full bg-transparent border-b border-bone-white/20 pb-3 text-[18px] font-[400] text-bone-white placeholder:text-bone-white/20 outline-none focus:border-bone-white/60 transition-colors uppercase" />
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-[14px] font-[400] text-bone-white/50 tracking-[0.02em] mb-3">ANNUAL INCOME (₹)</label>
                    <input type="text" value={formData.annualIncome} onChange={(e) => updateField("annualIncome", e.target.value)}
                      placeholder="₹8,00,000"
                      className="w-full bg-transparent border-b border-bone-white/20 pb-3 text-[18px] font-[400] text-bone-white placeholder:text-bone-white/20 outline-none focus:border-bone-white/60 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[14px] font-[400] text-bone-white/50 tracking-[0.02em] mb-3">CITY</label>
                    <input type="text" value={formData.city} onChange={(e) => updateField("city", e.target.value)}
                      placeholder="Bengaluru"
                      className="w-full bg-transparent border-b border-bone-white/20 pb-3 text-[18px] font-[400] text-bone-white placeholder:text-bone-white/20 outline-none focus:border-bone-white/60 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[14px] font-[400] text-bone-white/50 tracking-[0.02em] mb-3">EMPLOYMENT</label>
                    <select value={formData.employmentType} onChange={(e) => updateField("employmentType", e.target.value)}
                      className="w-full bg-transparent border-b border-bone-white/20 pb-3 text-[18px] font-[400] text-bone-white outline-none focus:border-bone-white/60 transition-colors appearance-none">
                      <option value="" className="bg-slate-veil">Select type</option>
                      <option value="salaried" className="bg-slate-veil">Salaried</option>
                      <option value="self-employed" className="bg-slate-veil">Self-employed</option>
                      <option value="student" className="bg-slate-veil">Student</option>
                      <option value="retired" className="bg-slate-veil">Retired</option>
                    </select>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div className="border border-bone-white/10 p-8">
                    <h4 className="text-[14px] font-[400] text-bone-white/50 tracking-[0.02em] mb-6">SUMMARY</h4>
                    <div className="space-y-4">
                      {[
                        { label: "Name", value: formData.fullName }, { label: "Email", value: formData.email },
                        { label: "Phone", value: formData.phone }, { label: "PAN", value: formData.panNumber },
                        { label: "Income", value: formData.annualIncome }, { label: "City", value: formData.city },
                        { label: "Employment", value: formData.employmentType },
                      ].map((item) => (
                        <div key={item.label} className="flex justify-between text-[15px] font-[400] border-b border-bone-white/5 pb-3">
                          <span className="text-bone-white/40">{item.label}</span>
                          <span className="text-bone-white">{item.value || "—"}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-[14px] font-[400] text-bone-white/30 leading-[1.6]">
                    By submitting, you agree to our terms and privacy policy. Your data is encrypted.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-10 pt-6 border-t border-bone-white/10">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="text-[14px] font-[400] text-bone-white/50 hover:text-bone-white transition-colors disabled:opacity-30 inline-flex items-center gap-2"
            >
              <ArrowLeft size={14} /> BACK
            </button>

            {step < steps.length - 1 ? (
              <button
                onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
                className="inline-flex items-center gap-2 text-[14px] font-[400] text-bone-white border border-bone-white px-[15px] py-[9px] tracking-[0.02em] hover:border-gunmetal-blue hover:text-gunmetal-blue transition-colors"
              >
                CONTINUE <ArrowRight size={14} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="inline-flex items-center gap-2 text-[14px] font-[400] text-bone-white border border-bone-white px-[15px] py-[9px] tracking-[0.02em] hover:border-gunmetal-blue hover:text-gunmetal-blue transition-colors disabled:opacity-50"
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : "GET MATCHED"}
                {!loading && <ArrowRight size={14} />}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
