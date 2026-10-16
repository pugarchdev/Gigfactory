"use client";

import React, { useState } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { submitCareerApplication } from '@/lib/careerApi';
import { validateField, validateAll } from './careerValidation';
import CareerInterestedInField from './CareerInterestedInField';
import CareerFileInput from './CareerFileInput';
import CareerSuccessCard from './CareerSuccessCard';

const INITIAL_FORM = {
  fullName: '',
  email: '',
  phone: '',
  portfolio: '',
  interestedIn: '',
  otherInterestedIn: '',
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
    const fieldError = validateField(id, value);
    setErrors((prev) => ({ ...prev, [id]: fieldError }));
  };

  const handleInputBlur = (fieldId) => {
    setTouched((prev) => ({ ...prev, [fieldId]: true }));
    const fieldError = validateField(fieldId, formData[fieldId]);
    setErrors((prev) => ({ ...prev, [fieldId]: fieldError }));
  };

  const handleInterestedInChange = (option) => {
    setFormData((prev) => ({
      ...prev,
      interestedIn: option,
      otherInterestedIn: option.toLowerCase() === 'other' ? prev.otherInterestedIn : '',
    }));
    setTouched((prev) => ({ ...prev, interestedIn: true }));
    const fieldError = validateField('interestedIn', option);
    setErrors((prev) => ({
      ...prev,
      interestedIn: fieldError,
      otherInterestedIn: option.toLowerCase() === 'other' ? prev.otherInterestedIn : '',
    }));
  };

  const handleOtherInterestedInChange = (val) => {
    setFormData((prev) => ({ ...prev, otherInterestedIn: val }));
    const fieldError = validateField('otherInterestedIn', val);
    setErrors((prev) => ({ ...prev, otherInterestedIn: fieldError }));
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

    const allTouched = {
      fullName: true,
      email: true,
      phone: true,
      interestedIn: true,
      otherInterestedIn: true,
      portfolio: true,
      cv: true,
    };
    setTouched(allTouched);

    const validationErrors = validateAll(formData, cvFile);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
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
      data.append('interestedIn', formData.interestedIn.trim());
      if (formData.interestedIn.toLowerCase() === 'other' && formData.otherInterestedIn.trim()) {
        data.append('otherInterestedIn', formData.otherInterestedIn.trim());
      }
      if (formData.portfolio.trim()) {
        data.append('portfolio', formData.portfolio.trim());
      }
      if (cvFile) {
        data.append('cv', cvFile);
      }

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
                  onBlur={() => handleInputBlur('fullName')}
                  placeholder="Enter your full name"
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
                  onBlur={() => handleInputBlur('email')}
                  placeholder="name@example.com"
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
                  onBlur={() => handleInputBlur('phone')}
                  placeholder="+91 98765 43210"
                  className={getInputClass('phone')}
                />
                {touched.phone && errors.phone && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* Interested In Dropdown */}
              <CareerInterestedInField
                value={formData.interestedIn}
                otherValue={formData.otherInterestedIn}
                onChange={handleInterestedInChange}
                onOtherChange={handleOtherInterestedInChange}
                onBlur={handleInputBlur}
                error={errors.interestedIn}
                otherError={errors.otherInterestedIn}
                touched={touched.interestedIn}
                otherTouched={touched.otherInterestedIn}
              />

              {/* Portfolio Link */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="portfolio">
                  Portfolio Link <span className="text-gray-500 text-xs font-normal">(Optional)</span>
                </label>
                <input
                  type="url"
                  id="portfolio"
                  value={formData.portfolio}
                  onChange={handleInputChange}
                  onBlur={() => handleInputBlur('portfolio')}
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
              <CareerFileInput
                file={cvFile}
                onChange={handleFileChange}
                touched={touched.cv}
                error={errors.cv}
              />

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
          <CareerSuccessCard onReset={handleReset} />
        )}
      </div>
    </section>
  );
}
