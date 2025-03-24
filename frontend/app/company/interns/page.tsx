"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Intern } from "@/app/types";

export default function CompanyInternsList() {
  const [interns, setInterns] = useState<Intern[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // インターン生の一覧データを取得
    const fetchInterns = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/interns", {
          withCredentials: true,
        });
        setInterns(response.data);
        setLoading(false);
      } catch (err) {
        setError("インターン生データの取得に失敗しました");
        setLoading(false);
      }
    };

    fetchInterns();
  }, []);

  if (loading) return <div className="p-8 text-center">読み込み中...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">インターン生一覧</h1>

      {interns.length === 0 ? (
        <p className="text-center py-8">インターン生のデータがありません</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interns.map((intern) => (
            <div
              key={intern.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{intern.name}</h2>
                <p className="text-gray-600 mb-2">
                  {intern.university} - {intern.grade}年
                </p>

                {intern.skills && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-500 mb-1">スキル:</p>
                    <div className="flex flex-wrap gap-1">
                      {intern.skills.split(",").map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {intern.bio || "自己紹介はありません"}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <Link
                    href={`/company/interns/${intern.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    詳細を見る
                  </Link>

                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm font-medium"
                    onClick={() =>
                      (window.location.href = `/company/offers/new?intern_id=${intern.id}`)
                    }
                  >
                    オファーする
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
