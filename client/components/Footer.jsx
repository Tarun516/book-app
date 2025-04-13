// components/FooterClient.jsx
"use client";

import { useState, useEffect } from "react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="text-center py-4 text-gray-500 text-sm">
      © {currentYear || ""} Book Exchange Portal
    </footer>
  );
}
