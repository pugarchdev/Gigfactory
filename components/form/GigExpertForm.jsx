'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const GigExpertForm = ({ isOpen, onClose }) => {
    const router = useRouter();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        expertType: '',
        expertTypeOther: '',
        experience: '',
        phone: '',
        email: '',
        location: '',
        workGeography: '',
        teamSize: '',
        teamComposition: '',
        gigExpertTypes: [],
        gigExpertTypeOther: '',
        designOrBuild: '',
        projectTypes: [],
        projectTypeOther: '',
        keyWorkAreas: ''
    });

    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleToggle = (listName, type) => {
        setFormData(prev => {
            const currentList = prev[listName];
            const newList = currentList.includes(type)
                ? currentList.filter(item => item !== type)
                : [...currentList, type];
            return { ...prev, [listName]: newList };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSending(true);

        // Simulate API delay
        setTimeout(() => {
            setIsSending(false);
            setIsSubmitted(true);
            console.log('Form Data:', formData);
        }, 1500);
    };

    const gigExpertTypeOptions = [
        'Architectural Schematic/ Designers', 'Interior Fitouts', 'Landscaping',
        'BOQ', 'GFC', 'Mechnical', 'Electrical', 'Plumbing', '3D',
        'Structural Engineer', 'BIM'
    ];

    const projectTypeOptions = [
        'Bunglow/Villa', 'Commercial', 'Industrial',
        'Warehousing', 'Specialised', 'Residential apartments 2bhk/ 3bhk'
    ];

    // Reusable Tailwind classes
    const inputClass = "w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-700 focus:outline-none focus:border-[#6EDD4D] focus:shadow-[0_0_15px_rgba(110,221,77,0.1)] transition-all";
    const labelClass = "block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2";
    const sectionHeaderClass = "flex items-center gap-4 mb-8 border-b border-zinc-800/50 pb-4";

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
            {/* Blurred Backdrop */}
            <div
                className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md transition-opacity"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-4xl bg-zinc-900/90 backdrop-blur-xl border border-[#6EDD4D]/20 rounded-[2.5rem] shadow-[0_0_60px_rgba(110,221,77,0.1)] overflow-y-auto max-h-[90vh] no-scrollbar animate-in zoom-in-95 duration-300">

                {/* Header Area */}
                <div className="sticky top-0 z-20 p-8 md:p-12 bg-zinc-900/80 backdrop-blur-md flex justify-between items-start border-b border-zinc-800/50">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tighter uppercase">
                            GigExpert <span className="text-[#6EDD4D]">Feedback</span>
                        </h2>
                        <p className="text-zinc-500 text-xs font-medium leading-relaxed max-w-md uppercase tracking-wider">
                            Data points for classification and platform optimization.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-950 border border-zinc-800 text-zinc-500 hover:text-[#6EDD4D] hover:border-[#6EDD4D] transition-all"
                    >
                        <i className="fa-solid fa-xmark text-lg"></i>
                    </button>
                </div>

                {!isSubmitted ? (
                    <form className="p-8 md:p-12 space-y-12" onSubmit={handleSubmit}>

                        {/* SECTION 1: GENERAL */}
                        <div>
                            <div className={sectionHeaderClass}>
                                <span className="text-[#6EDD4D] font-mono text-xl">01</span>
                                <h3 className="text-lg font-bold text-white uppercase tracking-widest">General Information</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClass}>Name of Gig Expert *</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Full Name" className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Type of Expert? *</label>
                                    <select name="expertType" value={formData.expertType} onChange={handleInputChange} required className={inputClass}>
                                        <option value="">Select option</option>
                                        <option value="Existing GE">Existing GE</option>
                                        <option value="Existing GO">Existing GO</option>
                                        <option value="New GE">New GE</option>
                                        <option value="New GO">New GO</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                {formData.expertType === 'Other' && (
                                    <div className="md:col-span-2 animate-in slide-in-from-top-2">
                                        <label className={labelClass}>Specify Expert Type</label>
                                        <input type="text" name="expertTypeOther" value={formData.expertTypeOther} onChange={handleInputChange} required className={inputClass} />
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-4 md:col-span-2">
                                    <div>
                                        <label className={labelClass}>Experience (Years) *</label>
                                        <input type="number" name="experience" value={formData.experience} onChange={handleInputChange} required placeholder="0" min="0" className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Phone Number *</label>
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="+91" className={inputClass} />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>Email ID *</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="email@domain.com" className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Location (City) *</label>
                                    <input type="text" name="location" value={formData.location} onChange={handleInputChange} required placeholder="e.g. Mumbai" className={inputClass} />
                                </div>
                            </div>
                        </div>

                        {/* SECTION 2: EXPERTISE */}
                        <div>
                            <div className={sectionHeaderClass}>
                                <span className="text-[#6EDD4D] font-mono text-xl">02</span>
                                <h3 className="text-lg font-bold text-white uppercase tracking-widest">Professional Expertise</h3>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <label className={labelClass}>Type of GigExpert (Multi-select)</label>
                                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                                        {gigExpertTypeOptions.map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => handleToggle('gigExpertTypes', type)}
                                                className={`text-left px-4 py-3 rounded-xl border text-[10px] font-bold uppercase tracking-tight transition-all duration-300 ${formData.gigExpertTypes.includes(type)
                                                        ? 'bg-[#6EDD4D] border-[#6EDD4D] text-zinc-950 shadow-[0_0_15px_rgba(110,221,77,0.3)]'
                                                        : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                                                    }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className={labelClass}>Operational Scope *</label>
                                        <select name="designOrBuild" value={formData.designOrBuild} onChange={handleInputChange} required className={inputClass}>
                                            <option value="">Select option</option>
                                            <option value="Design">Design Only</option>
                                            <option value="Build">Build Only</option>
                                            <option value="Both">Both (Design & Build)</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>Targeted Project Types</label>
                                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                                        {projectTypeOptions.map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => handleToggle('projectTypes', type)}
                                                className={`text-left px-4 py-3 rounded-xl border text-[10px] font-bold uppercase tracking-tight transition-all duration-300 ${formData.projectTypes.includes(type)
                                                        ? 'bg-[#6EDD4D] border-[#6EDD4D] text-zinc-950 shadow-[0_0_15px_rgba(110,221,77,0.3)]'
                                                        : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                                                    }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>Key Work Areas & Specializations</label>
                                    <textarea name="keyWorkAreas" value={formData.keyWorkAreas} onChange={handleInputChange} rows="4" placeholder="Describe your core strengths..." className={inputClass}></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex flex-col md:flex-row gap-4 pt-10 border-t border-zinc-800/50">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 text-center py-4 rounded-xl border border-zinc-800 text-zinc-500 font-bold uppercase tracking-widest text-xs hover:bg-zinc-800 hover:text-white transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSending}
                                className="flex-[2] bg-[#6EDD4D] text-zinc-950 font-bold py-4 rounded-xl hover:shadow-[0_0_25px_rgba(110,221,77,0.4)] transition-all uppercase tracking-widest text-xs disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isSending ? (
                                    <>Processing <i className="fa-solid fa-circle-notch animate-spin"></i></>
                                ) : (
                                    <>Submit Feedback <i className="fa-solid fa-arrow-right ml-2"></i></>
                                )}
                            </button>
                        </div>
                    </form>
                ) : (
                    /* SUCCESS STATE */
                    <div className="p-20 flex flex-col items-center text-center animate-in zoom-in-95 fade-in duration-700">
                        <div className="w-28 h-28 bg-[#6EDD4D]/10 border border-[#6EDD4D]/20 rounded-full flex items-center justify-center mb-8 relative">
                            <div className="absolute inset-0 rounded-full bg-[#6EDD4D]/20 animate-ping"></div>
                            <i className="fa-solid fa-check text-5xl text-[#6EDD4D] relative z-10"></i>
                        </div>
                        <h3 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase">Submission Complete</h3>
                        <p className="text-zinc-500 text-lg max-w-sm mb-12 font-medium">
                            We've received your data. This helps us optimize our GigExpert classification.
                        </p>
                        <button
                            onClick={onClose}
                            className="px-12 py-4 bg-zinc-800 text-white font-bold rounded-xl hover:bg-[#6EDD4D] hover:text-zinc-950 transition-all uppercase tracking-widest text-xs"
                        >
                            Back to Website
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GigExpertForm;