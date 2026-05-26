import React, { useState } from 'react';
import { FaqItem } from '../types';
import { LucideIcon } from './LucideIcon';

interface FaqSectionProps {
  items: FaqItem[];
}

export const FaqSection: React.FC<FaqSectionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faq-section" className="w-full space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="bg-neutral-900/60 border border-neutral-800 rounded-xl overflow-hidden transition-all duration-300 hover:border-red-900/30"
          >
            <button
              onClick={() => toggleIndex(index)}
              className="w-full flex items-center justify-between p-4 text-left font-semibold text-sm text-neutral-100 hover:text-white transition-colors py-4.5 cursor-pointer"
            >
              <span className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-red-600"></span>
                {item.question}
              </span>
              <span className={`text-neutral-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-red-500' : ''}`}>
                <LucideIcon name="ChevronDown" className="h-4 w-4" />
              </span>
            </button>

            {/* Expansible Panel */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? 'max-h-60 border-t border-neutral-800/85 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-4 bg-neutral-950/40 text-xs text-neutral-300 leading-relaxed font-sans">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default FaqSection;
