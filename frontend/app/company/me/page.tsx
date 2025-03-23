"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Company } from "@/app/types";
export default function CompanyMe() {
  const [company, setCompany] = useState<Company | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/companies/me",
          { withCredentials: true }
        );
        setCompany(response.data);
      } catch (err) {
        setError("ログインしてください");
        window.location.href = "/company/login";
      }
    };
    fetchCompany();
  }, []);

  if (!company) return <p>読み込み中...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>企業マイページ</h1>
      <p>企業名: {company.name}</p>
      <p>メール: {company.email}</p>
      <p>業界: {company.industry}</p>
      <p>概要: {company.description}</p>
      {error && <p>{error}</p>}
    </div>
  );
}
