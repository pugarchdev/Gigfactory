import React, { useState } from 'react'
import { recruitmentApi } from '../../lib/api'

const FreelancerForm = ({ onClose }) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        // 1. Identity & Accountability
        fullName: '', designation: '', linkedinUrl: '', location: '',

        // 2. Legal & Tax Identity
        legalNamePan: '', personalPan: '',

        // 3. Service Selection
        selectedServices: [], // BIM, Audit, Peer, BOQ, Viz
        bimDetails: { softwareStack: [], maxLod: '', cdeExperience: '' },
        auditDetails: { equipmentOwned: '', serviceRadius: '' },
        peerReviewDetails: { teamExperience: '', specialisation: '' },
        boqDetails: { measurementStandards: '', estimationSoftware: '' },
        vizDetails: { renderingEngines: '', hardwareCapacity: '', animationCapability: 'No' },

        // 4. Evidence & Commercials
        portfolioUrl: '', commercialBasis: '', baseRate: '', noticePeriod: '', availability: '',

        // 5. Final Declaration
        declarationAccepted: false, signatureName: '', submissionDate: new Date().toISOString().split('T')[0]
    })

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        if (type === 'checkbox' && name === 'declarationAccepted') {
            setFormData(prev => ({ ...prev, [name]: checked }))
        } else {
            setFormData(prev => ({ ...prev, [name]: value }))
        }
    }

    const handleServiceToggle = (service) => {
        setFormData(prev => {
            const services = prev.selectedServices.includes(service)
                ? prev.selectedServices.filter(s => s !== service)
                : [...prev.selectedServices, service]
            return { ...prev, selectedServices: services }
        })
    }

    const handleNestedChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: { ...prev[section], [field]: value }
        }))
    }

    const handleSoftwareToggle = (software) => {
        setFormData(prev => {
            const currentStack = prev.bimDetails.softwareStack
            const newStack = currentStack.includes(software)
                ? currentStack.filter(s => s !== software)
                : [...currentStack, software]
            return { ...prev, bimDetails: { ...prev.bimDetails, softwareStack: newStack } }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.declarationAccepted) {
            alert("Please accept the final declaration.")
            return
        }

        setIsSubmitting(true)

        try {
            await recruitmentApi.submitFreelancer(formData)
            alert("Application submitted successfully! Our team will contact you for technical vetting.")
            onClose()
        } catch (error) {
            console.error('Failed to submit freelancer application:', error)
            alert("Failed to submit application. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    // Reusable Tailwind classes
    const inputBaseStyle = "w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6EDD4D] focus:ring-1 focus:ring-[#6EDD4D] transition-all placeholder:text-zinc-600"
    const labelStyle = "block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2"
    
    // Helper component for Section Headers
    const SectionHeader = ({ number, title }) => (
        <h3 className="text-[#6EDD4D] text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#6EDD4D]/20 text-[#6EDD4D] text-xs">
                {number}
            </span>
            {title}
            <div className="h-px bg-zinc-800 flex-grow"></div>
        </h3>
    )

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 overflow-y-auto bg-zinc-950/80 backdrop-blur-md">
            <div 
                className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 md:p-12 shadow-2xl my-8 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-8 pb-6 border-b border-zinc-800">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">Apply as a Freelancer / Individual</h2>
                        <p className="text-zinc-400 mt-2">Join the Gigfactory network as an independent expert.</p>
                    </div>
                    <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors p-2 text-3xl leading-none">
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-12">

                    {/* Section 1: Identity & Accountability */}
                    <div>
                        <SectionHeader number="1" title="Identity & Accountability" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelStyle}>Full Name *</label>
                                <input type="text" name="fullName" required value={formData.fullName} onChange={handleInputChange} placeholder="Your professional name" className={inputBaseStyle} />
                            </div>
                            <div>
                                <label className={labelStyle}>Designation / Role *</label>
                                <input type="text" name="designation" required value={formData.designation} onChange={handleInputChange} placeholder="e.g., BIM Modeller, Structural Engineer" className={inputBaseStyle} />
                            </div>
                            <div>
                                <label className={labelStyle}>LinkedIn Profile URL</label>
                                <input type="url" name="linkedinUrl" value={formData.linkedinUrl} onChange={handleInputChange} placeholder="Your personal LinkedIn profile URL" className={inputBaseStyle} />
                            </div>
                            <div>
                                <label className={labelStyle}>Current Location *</label>
                                <input type="text" name="location" required value={formData.location} onChange={handleInputChange} placeholder="City, Country" className={inputBaseStyle} />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Legal & Tax Identity */}
                    <div>
                        <SectionHeader number="2" title="Legal & Tax Identity (Individual)" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelStyle}>Legal Name (as per PAN) *</label>
                                <input type="text" name="legalNamePan" required value={formData.legalNamePan} onChange={handleInputChange} placeholder="Full name exactly as on PAN card" className={inputBaseStyle} />
                            </div>
                            <div>
                                <label className={labelStyle}>Personal PAN Card Number *</label>
                                <input type="text" name="personalPan" required value={formData.personalPan} onChange={handleInputChange} placeholder="10-character PAN" className={inputBaseStyle} />
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Service Selection & Technical Vetting */}
                    <div>
                        <SectionHeader number="3" title="Service Selection & Technical Vetting" />
                        <p className="text-zinc-400 text-sm mb-4">Select services you personally offer (check all applicable)</p>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                            {[
                                { id: 'BIM', label: 'BIM & 2D Drafting' },
                                { id: 'Audit', label: 'As-Built Audit' },
                                { id: 'Peer', label: 'Peer Review' },
                                { id: 'BOQ', label: 'BOQ Creation' },
                                { id: 'Viz', label: '3D Visualisation' }
                            ].map(service => {
                                const isActive = formData.selectedServices.includes(service.id);
                                return (
                                    <div
                                        key={service.id}
                                        onClick={() => handleServiceToggle(service.id)}
                                        className={`cursor-pointer rounded-xl border p-4 flex flex-col items-center justify-center text-center gap-2 transition-all ${
                                            isActive 
                                            ? 'border-[#6EDD4D] bg-[#6EDD4D]/10 text-white shadow-[0_0_15px_rgba(110,221,77,0.1)]' 
                                            : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-600'
                                        }`}
                                    >
                                        <div className={`w-5 h-5 rounded flex items-center justify-center border ${isActive ? 'bg-[#6EDD4D] border-[#6EDD4D] text-zinc-950' : 'border-zinc-600 bg-zinc-900'}`}>
                                            {isActive && <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>}
                                        </div>
                                        <span className="font-bold text-sm">{service.label}</span>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Dynamic Sub-Panels */}
                        <div className="space-y-6">
                            
                            {/* BIM Details */}
                            {formData.selectedServices.includes('BIM') && (
                                <div className="bg-zinc-950/50 border border-zinc-800 rounded-2xl p-6">
                                    <h4 className="text-white font-bold mb-4">BIM & 2D Drafting Details</h4>
                                    <div className="mb-6">
                                        <label className={labelStyle}>Software Stack</label>
                                        <div className="flex flex-wrap gap-3">
                                            {['Revit', 'AutoCAD', 'Navisworks', 'Tekla', 'Civil 3D'].map(sw => {
                                                const isSelected = formData.bimDetails.softwareStack.includes(sw);
                                                return (
                                                    <label key={sw} className={`cursor-pointer px-4 py-2 rounded-full text-sm font-bold border transition-all ${isSelected ? 'bg-[#6EDD4D] text-zinc-950 border-[#6EDD4D]' : 'bg-zinc-900 text-zinc-400 border-zinc-700 hover:border-zinc-500'}`}>
                                                        <input type="checkbox" className="hidden" checked={isSelected} onChange={() => handleSoftwareToggle(sw)} />
                                                        {sw}
                                                    </label>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className={labelStyle}>Max LOD Capability</label>
                                            <select className={`${inputBaseStyle} [&>option]:bg-zinc-900`} value={formData.bimDetails.maxLod} onChange={(e) => handleNestedChange('bimDetails', 'maxLod', e.target.value)}>
                                                <option value="">Select option</option>
                                                <option value="LOD 300">LOD 300</option>
                                                <option value="LOD 350">LOD 350</option>
                                                <option value="LOD 400">LOD 400</option>
                                                <option value="LOD 500">LOD 500</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className={labelStyle}>CDE Experience</label>
                                            <input type="text" className={inputBaseStyle} value={formData.bimDetails.cdeExperience} onChange={(e) => handleNestedChange('bimDetails', 'cdeExperience', e.target.value)} placeholder="e.g., BIM 360, ACC, ProjectWise" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* As-Built Audit Details */}
                            {formData.selectedServices.includes('Audit') && (
                                <div className="bg-zinc-950/50 border border-zinc-800 rounded-2xl p-6">
                                    <h4 className="text-white font-bold mb-4">As-Built Audit Details</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className={labelStyle}>Equipment Owned</label>
                                            <input type="text" className={inputBaseStyle} value={formData.auditDetails.equipmentOwned} onChange={(e) => handleNestedChange('auditDetails', 'equipmentOwned', e.target.value)} placeholder="Laser Scanner, Total Station, Drone, etc." />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Service Radius</label>
                                            <select className={`${inputBaseStyle} [&>option]:bg-zinc-900`} value={formData.auditDetails.serviceRadius} onChange={(e) => handleNestedChange('auditDetails', 'serviceRadius', e.target.value)}>
                                                <option value="">Select option</option>
                                                <option value="City-wide">City-wide</option>
                                                <option value="State-wide">State-wide</option>
                                                <option value="Nationwide">Nationwide</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Peer Review Details */}
                            {formData.selectedServices.includes('Peer') && (
                                <div className="bg-zinc-950/50 border border-zinc-800 rounded-2xl p-6">
                                    <h4 className="text-white font-bold mb-4">Peer Review Details</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className={labelStyle}>Total Years of Experience *</label>
                                            <input type="text" className={inputBaseStyle} required value={formData.peerReviewDetails.teamExperience} onChange={(e) => handleNestedChange('peerReviewDetails', 'teamExperience', e.target.value)} placeholder="Design + on-site combined" />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Specialisation</label>
                                            <select className={`${inputBaseStyle} [&>option]:bg-zinc-900`} value={formData.peerReviewDetails.specialisation} onChange={(e) => handleNestedChange('peerReviewDetails', 'specialisation', e.target.value)}>
                                                <option value="">Select option</option>
                                                <option value="Structural">Structural</option>
                                                <option value="MEP">MEP</option>
                                                <option value="Architectural">Architectural</option>
                                                <option value="Fire & Life Safety">Fire & Life Safety</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* BOQ Details */}
                            {formData.selectedServices.includes('BOQ') && (
                                <div className="bg-zinc-950/50 border border-zinc-800 rounded-2xl p-6">
                                    <h4 className="text-white font-bold mb-4">BOQ (Bill of Quantities) Creation Details</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className={labelStyle}>Preferred Measurement Standards</label>
                                            <select className={`${inputBaseStyle} [&>option]:bg-zinc-900`} value={formData.boqDetails.measurementStandards} onChange={(e) => handleNestedChange('boqDetails', 'measurementStandards', e.target.value)}>
                                                <option value="">Select option</option>
                                                <option value="IS 1200">IS 1200</option>
                                                <option value="RICS">RICS</option>
                                                <option value="NRM2">NRM2</option>
                                                <option value="SMM7">SMM7</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Estimation Software</label>
                                            <input type="text" className={inputBaseStyle} value={formData.boqDetails.estimationSoftware} onChange={(e) => handleNestedChange('boqDetails', 'estimationSoftware', e.target.value)} placeholder="e.g., CostX, PlanSwift, Excel" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 3D Visualisation Details */}
                            {formData.selectedServices.includes('Viz') && (
                                <div className="bg-zinc-950/50 border border-zinc-800 rounded-2xl p-6">
                                    <h4 className="text-white font-bold mb-4">3D Visualisation & Rendering Details</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2">
                                            <label className={labelStyle}>Rendering Engine(s)</label>
                                            <input type="text" className={inputBaseStyle} value={formData.vizDetails.renderingEngines} onChange={(e) => handleNestedChange('vizDetails', 'renderingEngines', e.target.value)} placeholder="e.g., V-Ray, Corona, Lumion, Unreal Engine" />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Hardware Capacity</label>
                                            <select className={`${inputBaseStyle} [&>option]:bg-zinc-900`} value={formData.vizDetails.hardwareCapacity} onChange={(e) => handleNestedChange('vizDetails', 'hardwareCapacity', e.target.value)}>
                                                <option value="">Select option</option>
                                                <option value="Dedicated Render Farm / High-end GPU">Dedicated Render Farm / High-end GPU</option>
                                                <option value="Cloud Rendering">Cloud Rendering</option>
                                                <option value="Standard Workstation">Standard Workstation</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Animation Capability</label>
                                            <select className={`${inputBaseStyle} [&>option]:bg-zinc-900`} value={formData.vizDetails.animationCapability} onChange={(e) => handleNestedChange('vizDetails', 'animationCapability', e.target.value)}>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                    {/* Section 4: Evidence & Commercials */}
                    <div>
                        <SectionHeader number="4" title="Evidence & Commercials" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className={labelStyle}>Portfolio / Work Samples URL</label>
                                <input type="url" name="portfolioUrl" value={formData.portfolioUrl} onChange={handleInputChange} placeholder="Dropbox / Drive / Behance / Website link" className={inputBaseStyle} />
                            </div>
                            <div>
                                <label className={labelStyle}>Standard Commercial Basis</label>
                                <select className={`${inputBaseStyle} [&>option]:bg-zinc-900`} name="commercialBasis" value={formData.commercialBasis} onChange={handleInputChange}>
                                    <option value="">Select option</option>
                                    <option value="Hourly Rate">Hourly Rate</option>
                                    <option value="Per Sq. Ft.">Per Sq. Ft.</option>
                                    <option value="Per Sheet">Per Sheet</option>
                                    <option value="Fixed Project Fee">Fixed Project Fee</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelStyle}>Base Rate (INR / Unit)</label>
                                <input type="number" name="baseRate" value={formData.baseRate} onChange={handleInputChange} placeholder="Numeric value" className={inputBaseStyle} />
                            </div>
                            <div>
                                <label className={labelStyle}>Notice Period / Lead Time</label>
                                <select className={`${inputBaseStyle} [&>option]:bg-zinc-900`} name="noticePeriod" value={formData.noticePeriod} onChange={handleInputChange}>
                                    <option value="">Select option</option>
                                    <option value="Immediate">Immediate</option>
                                    <option value="1 Week">1 Week</option>
                                    <option value="2 Weeks">2 Weeks</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelStyle}>Availability</label>
                                <select className={`${inputBaseStyle} [&>option]:bg-zinc-900`} name="availability" value={formData.availability} onChange={handleInputChange}>
                                    <option value="">Select option</option>
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Project Basis">Project Basis</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Section 5: Final Declaration */}
                    <div className="bg-[#6EDD4D]/5 border border-[#6EDD4D]/20 rounded-[1.5rem] p-6 md:p-8">
                        <SectionHeader number="5" title="Final Declaration" />
                        
                        <div className="flex items-start gap-4 mb-8">
                            <input
                                type="checkbox"
                                name="declarationAccepted"
                                checked={formData.declarationAccepted}
                                onChange={handleInputChange}
                                className="mt-1 w-5 h-5 accent-[#6EDD4D] bg-zinc-900 border-zinc-700 rounded cursor-pointer"
                            />
                            <label onClick={() => handleInputChange({ target: { name: 'declarationAccepted', type: 'checkbox', checked: !formData.declarationAccepted } })} className="text-zinc-300 text-sm md:text-base leading-relaxed cursor-pointer select-none">
                                I hereby certify that all PAN details provided are authentic. I understand that onboarding is subject to a technical audit of my previous work.
                            </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelStyle}>Signature *</label>
                                <input type="text" name="signatureName" required value={formData.signatureName} onChange={handleInputChange} placeholder="Type your full name as signature" className={`${inputBaseStyle} bg-zinc-950/50`} />
                            </div>
                            <div>
                                <label className={labelStyle}>Date</label>
                                <input type="date" name="submissionDate" value={formData.submissionDate} readOnly className={`${inputBaseStyle} bg-zinc-950/50 [color-scheme:dark]`} />
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex justify-end gap-4 pt-8 border-t border-zinc-800">
                        <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl font-bold text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">
                            Cancel
                        </button>
                        <button type="submit" className="px-8 py-3 rounded-xl font-bold bg-[#6EDD4D] text-zinc-950 hover:bg-[#5bc43f] hover:shadow-[0_0_20px_rgba(110,221,77,0.3)] transition-all">
                            Submit Application
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default FreelancerForm