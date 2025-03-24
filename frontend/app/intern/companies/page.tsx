"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Company } from "@/app/types";
export default function SimpleCompaniesListPage() {
  const [companies, setCompanies] = useState<Company[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // 企業の一覧データを取得
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/companies",
          {
            withCredentials: true,
          }
        );
        setCompanies(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching companies:", err);
        setError("企業データの取得に失敗しました");
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) return <div className="p-8 text-center">読み込み中...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">企業一覧</h1>

          {companies.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center shadow-md border border-gray-200">
              <p className="text-gray-600">登録されている企業がありません</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {companies.map((company) => (
                  <li key={company.id} className="hover:bg-gray-50">
                    <Link
                      href={`/intern/companies/${company.id}`}
                      className="block p-6"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900 mb-1">
                            {company.name}
                          </h2>
                          {company.industry && (
                            <p className="text-sm text-gray-600 mb-2">
                              {company.industry}
                            </p>
                          )}
                          {company.description && (
                            <p className="text-gray-700 text-sm line-clamp-2 mt-2">
                              {company.description}
                            </p>
                          )}
                        </div>
                        <div className="text-blue-600 font-medium">詳細</div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
