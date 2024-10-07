import { useState, useEffect } from "react";

type SizeType = "EU" | "US" | "mm";

interface SizeMapping {
  [key: string]: number;
}

const sizeMappings: Record<SizeType, SizeMapping> = {
  EU: {
    "35": 220,
    "35.5": 225,
    "36": 230,
    "37": 235,
    "37.5": 240,
    "38": 245,
    "39": 250,
    "40": 255,
    "41": 260,
    "42": 265,
    "43": 270,
    "44": 275,
    "45": 280,
    "45.5": 285,
  },
  US: {
    "5": 220,
    "5.5": 225,
    "6": 230,
    "6.5": 235,
    "7": 240,
    "7.5": 245,
    "8": 250,
    "8.5": 255,
    "9": 260,
    "9.5": 265,
    "10": 270,
    "10.5": 275,
    "11": 280,
    "11.5": 285,
  },
  mm: {},
};

// 사이즈 변환 훅
export const useSizeConversion = (
  sizeType: SizeType | null,
  sneakerSize?: number | null
) => {
  const [convertedSize, setConvertedSize] = useState<number | null | undefined>(
    sneakerSize
  );

  useEffect(() => {
    if (!sneakerSize || !sizeType || sizeType === "mm") {
      setConvertedSize(sneakerSize);
    } else {
      const sizeKey = sneakerSize.toString();
      const converted = sizeMappings[sizeType]?.[sizeKey];
      if (converted !== undefined) {
        setConvertedSize(converted);
        console.log(`convertedSize: ${converted}`);
      } else {
        console.error(`Size conversion failed for ${sizeType} ${sneakerSize}`);
        setConvertedSize(undefined);
      }
    }
  }, [sizeType, sneakerSize]);

  return convertedSize;
};
