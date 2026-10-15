"use client";

import React, { useState } from 'react';
import { Check, AlertCircle, Loader2, FileCheck, Upload } from 'lucide-react';
import { submitCareerApplication } from '@/lib/careerApi';
import { validateField, validateAll } from './careerValidation';

const INITIAL_FORM = {
  fullName: '',
  email: '',
  phone: '',
  portfolio: '',
  coverLetter: '',
};

export default function CareerForm() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [cvFile, setCvFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Real-time quick validation response
    const fieldError = validateField(id, value);
    setErrors((prev) => ({ ...prev, [id]: fieldError }));
  };

  const handleInputBlur = (e) => {
    const { id, value } = e.target;
    setTouched((prev) => ({ ...prev, [id]: true }));
    const fieldError = validateField(id, value);
    setErrors((prev) => ({ ...prev, [id]: fieldError }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setCvFile(file);
    setTouched((prev) => ({ ...prev, cv: true }));
    const fileError = validateField('cv', null, file);
    setErrors((prev) => ({ ...prev, cv: fileError }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    // Mark all fields as touched
    const allTouched = {
      fullName: true,
      email: true,
      phone: true,
      portfolio: true,
      cv: true,
      coverLetter: true,
    };
    setTouched(allTouched);

    const validationErrors = validateAll(formData, cvFile);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      // Focus the first invalid field
      const firstErrorField = Object.keys(validationErrors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) element.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append('fullName', formData.fullName.trim());
      data.append('email', formData.email.trim());
      data.append('phone', formData.phone.trim());
      if (formData.portfolio.trim()) data.append('portfolio', formData.portfolio.trim());
      if (formData.coverLetter.trim()) data.append('coverLetter', formData.coverLetter.trim());
      if (cvFile) data.append('cv', cvFile);

      await submitCareerApplication(data);
      setIsSubmitted(true);
    } catch (err) {
      setServerError(err.message || 'Failed to submit application. Please try again.');
      if (err.field) {
        setErrors((prev) => ({ ...prev, [err.field]: err.message }));
        setTouched((prev) => ({ ...prev, [err.field]: true }));
        const element = document.getElementById(err.field);
        if (element) element.focus();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setCvFile(null);
    setErrors({});
    setTouched({});
    setServerError('');
    setIsSubmitted(false);
  };

  const getInputClass = (field) => {
    const hasError = touched[field] && Boolean(errors[field]);
    const isValid = touched[field] && !errors[field] && Boolean(formData[field]);

    const base =
      'w-full rounded-xl px-4 py-3 placeholder-gray-500 border transition-all text-base text-white outline-none';

    if (hasError) {
      return `${base} bg-[#0b0e14] border-red-500/80 focus:border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.15)]`;
    }
    if (isValid) {
      return `${base} bg-[#0b0e14] border-[#22c55e]/60 focus:border-[#22c55e]`;
    }
    return `${base} bg-[#0b0e14] border-[#232d3b] focus:border-[#22c55e]`;
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    return bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(1)} KB`
      : `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <section id="application-form" className="py-20 px-6 lg:px-12 border-t border-white/5" style={{ backgroundColor: '#06080b' }}>
      <div className="max-w-2xl mx-auto">
        {!isSubmitted ? (
          <div
            id="formContent"
            className="rounded-3xl p-8 md:p-12 shadow-2xl transition-all"
            style={{
              backgroundColor: '#121820',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
              Apply for Full Time Position at Gigfactory
            </h2>
            <p className="text-gray-400 text-sm mb-8">
              Fill in your details below and our talent acquisition team will review your application.
            </p>

            {serverError && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{serverError}</span>
              </div>
            )}

            <form id="careersForm" onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="fullName">
                  Full Name <span className="text-[#22c55e]">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder=""
                  className={getInputClass('fullName')}
                />
                {touched.fullName && errors.fullName && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="email">
                  Email Address <span className="text-[#22c55e]">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder=""
                  className={getInputClass('email')}
                />
                {touched.email && errors.email && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="phone">
                  Phone Number <span className="text-[#22c55e]">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder=""
                  className={getInputClass('phone')}
                />
                {touched.phone && errors.phone && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* Portfolio */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="portfolio">
                  Portfolio Link <span className="text-gray-500 text-xs font-normal">(Optional)</span>
                </label>
                <input
                  type="url"
                  id="portfolio"
                  value={formData.portfolio}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder="https://myportfolio.com"
                  className={getInputClass('portfolio')}
                />
                {touched.portfolio && errors.portfolio && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.portfolio}</span>
                  </p>
                )}
              </div>

              {/* CV Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="cv">
                  Upload CV (PDF/DOC) <span className="text-[#22c55e]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="cv"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className={`w-full text-sm text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#22c55e]/10 file:text-[#4ade80] hover:file:bg-[#22c55e]/20 cursor-pointer border rounded-xl py-2 px-3 bg-[#0b0e14] ${
                      touched.cv && errors.cv ? 'border-red-500/80' : cvFile ? 'border-[#22c55e]/60' : 'border-[#232d3b]'
                    }`}
                  />
                </div>
                {cvFile && !errors.cv && (
                  <p className="text-[#4ade80] text-xs mt-1.5 flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 shrink-0" />
                    <span>{cvFile.name} ({formatFileSize(cvFile.size)})</span>
                  </p>
                )}
                {touched.cv && errors.cv && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.cv}</span>
                  </p>
                )}
              </div>

              {/* Cover Letter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="coverLetter">
                  Cover Letter <span className="text-gray-500 text-xs font-normal">(Optional)</span>
                </label>
                <textarea
                  id="coverLetter"
                  rows={4}
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder="Tell us about your background, experience with digital construction workflows, and why you want to join Gigfactory..."
                  className={getInputClass('coverLetter')}
                />
                {touched.coverLetter && errors.coverLetter && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.coverLetter}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold py-4 rounded-xl transition-all duration-200 shadow-lg shadow-[#22c55e]/20 text-base cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <span>Submit Application</span>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div
            id="thankYouCard"
            className="rounded-3xl p-10 md:p-12 text-center space-y-6 shadow-2xl animate-in fade-in duration-300"
            style={{
              backgroundColor: '#121820',
              border: '1px solid rgba(34, 197, 94, 0.3)',
            }}
          >
            <div className="w-16 h-16 bg-[#22c55e]/15 border-2 border-[#22c55e] rounded-full flex items-center justify-center mx-auto text-[#4ade80]">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white">
              Thank you for your interest!
            </h3>
            <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto leading-relaxed">
              Our talent acquisition team will review your application and get in touch shortly.
            </p>
            {/* <div className="pt-4">
              <button
                onClick={handleReset}
                className="text-xs text-gray-400 hover:text-[#4ade80] underline transition-colors cursor-pointer"
              >
                Submit another application
              </button>
            </div> */}
          </div>
        )}
      </div>
    </section>
  );
}
