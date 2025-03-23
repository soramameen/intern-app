"use client";
import { useEffect, useState } from "react";
import { Intern } from "@/app/types";
import axios from "axios";

export default function Me() {
  const [intern, setIntern] = useState<Intern | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIntern = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/interns/me",
          {
            withCredentials: true, // クッキーを送信
          }
        );
        setIntern(response.data);
      } catch (err) {
        setError("ログインしてください");
        window.location.href = "/login";
      }
    };
    fetchIntern();
  }, []);
  const handleLogout = async () => {
    try {
      await axios.delete("http://localhost:3000/api/interns/sign_out", {
        withCredentials: true,
      });
      setIntern(null);
      window.location.href = "/login";
    } catch (err) {
      setError("ログアウトに失敗しました");
    }
  };
  if (!intern) return <p>読み込み中...</p>;

  return (
    <div>
      <h1>マイページ</h1>
      <p>名前: {intern.name}</p>
      <p>メールアドレス: {intern.email}</p>
      <p>大学: {intern.university}</p>
      <p>学年: {intern.grade}</p>
      <p>スキル: {intern.skills}</p>
      <p>自己紹介: {intern.bio}</p>
      <button onClick={handleLogout}>ログアウト</button>
      {error && <p>{error}</p>}
    </div>
  );
}
