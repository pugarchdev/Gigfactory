"use client";

export default function TabNavigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "media", label: "Media" },
    { id: "blog", label: "Blog" },
    { id: "achievements", label: "Achievements" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-center">
      <div className="bg-neutral-900/60 p-1.5 rounded-full border border-neutral-800 flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-[#6EDD4D] text-black shadow-lg shadow-[#6EDD4D]/20"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}