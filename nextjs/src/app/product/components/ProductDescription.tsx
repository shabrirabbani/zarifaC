"use client";

import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type Props = {
  description?: string | null;
};

export default function ProductDescription({ description }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  let descParsing: any = null;

  try {
    if (description) {
      descParsing =
        typeof description === "string" ? JSON.parse(description) : description;
    }
  } catch (err) {
    console.warn("Invalid description JSON:", err);
    descParsing = null;
  }

  const hasContent =
    descParsing && Array.isArray(descParsing) && descParsing.length > 0;

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between border-b border-gray-300 py-2 w-full"
      >
        <span className="font-medium text-xs md:text-sm text-gray-600 tracking-wider">
          Description
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="text-xs text-gray-600 mt-2 font-light tracking-wider">
              {hasContent ? (
                <BlocksRenderer content={descParsing} />
              ) : (
                <p className="italic text-gray-400">
                  No description available.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
