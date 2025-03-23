"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function CompanyHome() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        await axios.get("http://localhost:3000/api/companies/me", {
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
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        Intern App for Companies
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
        優秀なインターン生を見つけ、あなたの企業にオファーを送りましょう！
      </p>
      {isLoggedIn ? (
        <div>
          <p>ログイン中です。インターン生を探してオファーを送りましょう。</p>
          <Link href="/company/me">
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
              企業マイページ
            </button>
          </Link>
          <Link href="/interns">
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
              インターン生一覧
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <p>ログインまたは登録して、インターン生にオファーを送りましょう！</p>
          <Link href="/company/login">
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
              企業ログイン
            </button>
          </Link>
          <Link href="/company/signup">
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
              企業登録
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
