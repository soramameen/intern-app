"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function CompanyLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/companies/sign_in",
        { company: { email, password } },
        { withCredentials: true }
      );
      setMessage(response.data.message);
      window.location.href = "/company/me";
    } catch (error) {
      setMessage("ログイン失敗");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "0 auto" }}>
      <h1>企業ログイン</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メール"
          style={{ display: "block", width: "100%", marginBottom: "1rem" }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード"
          style={{ display: "block", width: "100%", marginBottom: "1rem" }}
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            background: "#0070f3",
            color: "white",
            borderRadius: "5px",
          }}
        >
          ログイン
        </button>
      </form>
      {message && <p>{message}</p>}
      <p>
        <Link href="/company/signup">登録</Link>
      </p>
    </div>
  );
}
