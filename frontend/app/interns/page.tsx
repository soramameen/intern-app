"use client";
import { useState, useEffect } from "react";
import { Intern } from "@/app/types";

export default function Page() {
  const [internDatas, setInternDatas] = useState<Intern[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/interns")
      .then((response) => {
        if (!response.ok) throw new Error("データ取得に失敗しました");
        return response.json();
      })
      .then((data) => setInternDatas(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">インターン生一覧</h1>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">名前</th>
              <th className="border p-2 text-left">大学</th>
              <th className="border p-2 text-left">学年</th>
              <th className="border p-2 text-left">スキル</th>
              <th className="border p-2 text-left">一言</th>
            </tr>
          </thead>
          <tbody>
            {internDatas && internDatas.length > 0 ? (
              internDatas.map((intern) => (
                <tr key={intern.id} className="border-b">
                  <td className="p-2">{intern.name}</td>
                  <td className="p-2">{intern.university}</td>
                  <td className="p-2">{intern.grade}</td>
                  <td className="p-2">{intern.skills}</td>
                  <td className="p-2">{intern.bio}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  データがありません
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
