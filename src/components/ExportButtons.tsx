"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Download, Link as LinkIcon, Check } from "lucide-react";

interface ExportButtonsProps {
  targetId?: string;
}

export default function ExportButtons({ targetId }: ExportButtonsProps) {
  const [isCopied, setIsCopied] = useState(false);

  const exportToPDF = () => {
    window.print();
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto no-print">
      <Button 
        onClick={exportToPDF} 
        className="w-full sm:w-auto rounded-full font-medium shadow-md transition-all hover:scale-105"
      >
        <Download className="w-4 h-4 mr-2" />
        Save as PDF
      </Button>
      
      <Button 
        variant="outline" 
        onClick={copyShareLink}
        className="w-full sm:w-auto rounded-full font-medium transition-all hover:scale-105"
      >
        {isCopied ? (
          <>
            <Check className="w-4 h-4 mr-2 text-emerald-500" />
            Copied!
          </>
        ) : (
          <>
            <LinkIcon className="w-4 h-4 mr-2" />
            Share Link
          </>
        )}
      </Button>
    </div>
  );
}
