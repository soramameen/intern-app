"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Intern } from "@/app/types";

export default function InternDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  const [intern, setIntern] = useState<Intern | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // インターン生の詳細データを取得
    const fetchInternDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/interns/${id}`,
          {
            withCredentials: true,
          }
        );
        setIntern(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching intern:", err);
        setError("インターン生データの取得に失敗しました");
        setLoading(false);
      }
    };

    fetchInternDetail();
  }, [id]);

  if (loading) return <div className="p-8 text-center">読み込み中...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!intern)
    return <div className="p-8 text-center">インターン生が見つかりません</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/company/interns"
          className="text-blue-600 hover:text-blue-800"
        >
          ← インターン生一覧に戻る
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-2">{intern.name}</h1>
          <p className="text-xl text-gray-600 mb-6">
            {intern.university} - {intern.grade}年生
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-lg font-semibold mb-3 text-gray-800">
                スキル
              </h2>
              {intern.skills ? (
                <div className="flex flex-wrap gap-2">
                  {intern.skills.split(",").map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">スキル情報はありません</p>
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3 text-gray-800">
                連絡先
              </h2>
              <p className="text-gray-700">
                <span className="font-medium">メール:</span> {intern.email}
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              自己紹介
            </h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-700 whitespace-pre-line">
                {intern.bio || "自己紹介はありません"}
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Link
              href={`/company/offers/new?intern_id=${intern.id}`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium text-center inline-block"
            >
              オファーを送る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
