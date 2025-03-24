"use client";

import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";
import Header from "./components/Header";
export default function InternLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* ヘッダー */}
      <Header />

      {/* メインコンテンツ */}
      <main style={{ flex: 1, padding: "2rem" }}>{children}</main>
    </div>
  );
}
