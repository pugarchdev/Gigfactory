"use client";

import React from 'react';
import { AlertCircle, FileCheck } from 'lucide-react';

export default function CareerFileInput({
  file,
  onChange,
  touched,
  error,
}) {
  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    return bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(1)} KB`
      : `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="cv">
        Upload CV (PDF/DOC) <span className="text-[#22c55e]">*</span>
      </label>
      <div className="relative">
        <input
          type="file"
          id="cv"
          accept=".pdf,.doc,.docx"
          onChange={onChange}
          className={`w-full text-sm text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#22c55e]/10 file:text-[#4ade80] hover:file:bg-[#22c55e]/20 cursor-pointer border rounded-xl py-2 px-3 bg-[#0b0e14] ${
            touched && error
              ? 'border-red-500/80'
              : file
              ? 'border-[#22c55e]/60'
              : 'border-[#232d3b]'
          }`}
        />
      </div>
      {file && !error && (
        <p className="text-[#4ade80] text-xs mt-1.5 flex items-center gap-1.5">
          <FileCheck className="w-3.5 h-3.5 shrink-0" />
          <span>
            {file.name} ({formatFileSize(file.size)})
          </span>
        </p>
      )}
      {touched && error && (
        <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
