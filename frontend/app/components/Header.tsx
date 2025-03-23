"use client"; // クライアントコンポーネントとして指定

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function Header() {
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

  const handleLogout = async () => {
    try {
      await axios.delete("http://localhost:3000/api/interns/sign_out", {
        withCredentials: true,
      });
      setIsLoggedIn(false);
      window.location.href = "/login";
    } catch (err) {
      console.error("ログアウトエラー:", err);
    }
  };

  return (
    <header
      style={{
        padding: "1rem",
        background: "#f0f0f0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <Link href="/">
          <h2 style={{ margin: 0 }}>Intern App</h2>
        </Link>
      </div>
      <nav>
        <Link href="/" style={{ marginRight: "1rem" }}>
          ホーム
        </Link>
        <Link href="/interns" style={{ marginRight: "1rem" }}>
          インターン生一覧を見る
        </Link>

        {isLoggedIn ? (
          <>
            <Link href="/me" style={{ marginRight: "1rem" }}>
              マイページ
            </Link>
            <button onClick={handleLogout} style={{ cursor: "pointer" }}>
              ログアウト
            </button>
          </>
        ) : (
          <Link href="/login">ログイン</Link>
        )}
      </nav>
    </header>
  );
}
