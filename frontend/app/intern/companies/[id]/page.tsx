"use client";

import { useState, useEffect, use } from "react";
import axios from "axios";
import Link from "next/link";
import { Company } from "@/app/types";
interface Params {
  id: string;
}

export default function SimpleCompanyDetailPage({
  params,
}: {
  params: Params;
}) {
  const id = params.id;
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // 企業の詳細データを取得
    const fetchCompanyDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/companies/${id}`,
          {
            withCredentials: true,
          }
        );
        setCompany(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching company:", err);
        setError("企業情報の取得に失敗しました");
        setLoading(false);
      }
    };

    fetchCompanyDetail();
  }, [id]);

  if (loading) return <div className="p-8 text-center">読み込み中...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!company)
    return <div className="p-8 text-center">企業情報が見つかりません</div>;

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="py-8">
          <div className="mb-6">
            <Link
              href="/intern/companies"
              className="text-blue-600 hover:text-blue-800"
            >
              ← 企業一覧に戻る
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {company.name}
              </h1>

              {company.industry && (
                <div className="text-gray-600 mb-4">
                  <span className="font-medium">業界:</span> {company.industry}
                </div>
              )}

              {company.description && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2 text-gray-800">
                    企業概要
                  </h2>
                  <p className="text-gray-700 whitespace-pre-line">
                    {company.description}
                  </p>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4 mt-4">
                <h2 className="text-lg font-semibold mb-2 text-gray-800">
                  連絡先情報
                </h2>
                {company.email && (
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">メール:</span> {company.email}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
