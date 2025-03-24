"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Intern } from "@/app/types";

export default function NewOfferPage() {
  const searchParams = useSearchParams();
  const internId = searchParams.get("intern_id");

  const [intern, setIntern] = useState<Intern | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    position: "",
    message: "",
  });

  useEffect(() => {
    // インターン生の情報を取得
    const fetchInternData = async () => {
      if (!internId) {
        setError("インターン生IDが指定されていません");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/api/interns/${internId}`,
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

    fetchInternData();
  }, [internId]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/offers",
        {
          offer: {
            intern_id: internId,
            position: formData.position,
            message: formData.message,
          },
        },
        {
          withCredentials: true,
        }
      );

      setSuccessMessage("オファーを送信しました");
      // フォームをリセット
      setFormData({
        position: "",
        message: "",
      });
    } catch (err: any) {
      console.error("Error submitting offer:", err);
      if (err.response && err.response.data && err.response.data.errors) {
        setError(err.response.data.errors.join(", "));
      } else {
        setError("オファーの送信に失敗しました。もう一度お試しください。");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-center">読み込み中...</div>;
  if (error && !intern)
    return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
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
          <h1 className="text-3xl font-bold mb-6">オファーを送る</h1>

          {intern && (
            <div className="mb-8 p-4 bg-blue-50 rounded-md">
              <h2 className="text-lg font-semibold mb-2">送信先:</h2>
              <p className="text-gray-700">
                <span className="font-medium">{intern.name}</span> -{" "}
                {intern.university}
              </p>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 text-green-700 border-l-4 border-green-500 rounded">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="position"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                ポジション・職種 *
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="例: フロントエンドエンジニア、バックエンド開発、UIデザイナー"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                メッセージ *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={6}
                placeholder="オファーの内容や条件、期待することなどを記入してください"
              />
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 border-l-4 border-red-500 rounded">
                {error}
              </div>
            )}

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={submitting}
                className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium ${
                  submitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {submitting ? "送信中..." : "オファーを送信する"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
