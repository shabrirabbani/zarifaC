"use client";

import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type Props = {
  description: string;
};

export default function ProductDescription({ description }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  const descParsing =
    typeof description === "string" ? JSON.parse(description) : description;

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between border-b border-gray-300 py-2 w-full"
      >
        <span className="font-medium">Description</span>
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
            <BlocksRenderer content={descParsing} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
