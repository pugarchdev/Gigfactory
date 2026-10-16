"use client";

import React from 'react';
import { AlertCircle, ChevronDown } from 'lucide-react';
import { INTERESTED_IN_OPTIONS } from './careerValidation';

export default function CareerInterestedInField({
  value,
  otherValue,
  onChange,
  onOtherChange,
  onBlur,
  error,
  otherError,
  touched,
  otherTouched,
}) {
  const isOther = value?.toLowerCase() === 'other';

  const getSelectClass = () => {
    const hasError = touched && Boolean(error);
    const isValid = touched && !error && Boolean(value);
    const base =
      'w-full rounded-xl px-4 py-3.5 border transition-all text-base text-white outline-none appearance-none pr-10 cursor-pointer';

    if (hasError) {
      return `${base} bg-[#0b0e14] border-red-500/80 focus:border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.15)]`;
    }
    if (isValid || value) {
      return `${base} bg-[#0b0e14] border-[#22c55e] focus:border-[#22c55e] shadow-[0_0_12px_rgba(34,197,94,0.15)]`;
    }
    return `${base} bg-[#0b0e14] border-[#232d3b] hover:border-gray-600 focus:border-[#22c55e] focus:shadow-[0_0_12px_rgba(34,197,94,0.15)]`;
  };

  const getOtherInputClass = () => {
    const hasError = otherTouched && Boolean(otherError);
    const isValid = otherTouched && !otherError && Boolean(otherValue);
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
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300" htmlFor="interestedIn">
        Interested In <span className="text-[#22c55e]">*</span>
      </label>

      {/* Dropdown Container */}
      <div className="relative">
        <select
          id="interestedIn"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => onBlur('interestedIn')}
          className={getSelectClass()}
        >

          {INTERESTED_IN_OPTIONS.map((opt) => (
            <option
              key={opt}
              value={opt}
              className="bg-[#121820] text-white py-2"
            >
              {opt === 'other' ? 'Other' : opt}
            </option>
          ))}
        </select>

        {/* Chevron icon */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white">
          <ChevronDown className="w-5 h-5 text-gray-300" />
        </div>
      </div>

      {/* Dropdown validation error */}
      {touched && error && (
        <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}

      {/* Input field for "Other" */}
      {isOther && (
        <div className="pt-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <label className="block text-xs font-medium text-gray-400 mb-1.5" htmlFor="otherInterestedIn">
            Please specify your answer <span className="text-[#22c55e]">*</span>
          </label>
          <input
            type="text"
            id="otherInterestedIn"
            value={otherValue || ''}
            onChange={(e) => onOtherChange(e.target.value)}
            onBlur={() => onBlur('otherInterestedIn')}
            placeholder="e.g. Interior Design, Structural Analysis, MEP Engineering..."
            className={getOtherInputClass()}
            autoFocus
          />
          {otherTouched && otherError && (
            <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{otherError}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
