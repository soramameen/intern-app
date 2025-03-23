"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function InternHome() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        await axios.get("http://localhost:3000/api/interns/me", {
          withCredentials: true,
        });
        setIsLoggedIn(true);
      } catch (err) {
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Intern App</h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
        インターン生のためのスキル共有プラットフォームへようこそ！
      </p>
      {isLoggedIn ? (
        <div>
          <p>ログイン中です。あなたの情報をチェックしましょう。</p>
          <Link href="/intern/me">
            <button
              style={{
                padding: "0.5rem 1rem",
                fontSize: "1rem",
                background: "#0070f3",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "1rem",
              }}
            >
              マイページ
            </button>
          </Link>
          <Link href="/intern/interns">
            <button
              style={{
                padding: "0.5rem 1rem",
                fontSize: "1rem",
                background: "#0070f3",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              インターン希望生一覧
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <p>ログインまたは登録して、あなたのスキルをシェアしましょう！</p>
          <Link href="/intern/login">
            <button
              style={{
                padding: "0.5rem 1rem",
                fontSize: "1rem",
                background: "#0070f3",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "1rem",
              }}
            >
              ログイン
            </button>
          </Link>
          <Link href="/intern/signup">
            <button
              style={{
                padding: "0.5rem 1rem",
                fontSize: "1rem",
                background: "#0070f3",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              登録
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
