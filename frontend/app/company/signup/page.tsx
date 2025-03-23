"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function CompanySignup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    name: "",
    industry: "",
    description: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/companies/sign_up",
        { company: formData },
        { withCredentials: true }
      );
      setMessage(response.data.message);
      window.location.href = "/company/me";
    } catch (error) {
      setMessage("登録失敗");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "0 auto" }}>
      <h1>企業登録</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="メール"
          style={{ display: "block", width: "100%", marginBottom: "1rem" }}
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="パスワード"
          style={{ display: "block", width: "100%", marginBottom: "1rem" }}
        />
        <input
          type="password"
          name="passwordConfirmation"
          value={formData.passwordConfirmation}
          onChange={handleChange}
          placeholder="パスワード確認"
          style={{ display: "block", width: "100%", marginBottom: "1rem" }}
        />
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="企業名"
          style={{ display: "block", width: "100%", marginBottom: "1rem" }}
        />
        <input
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          placeholder="業界"
          style={{ display: "block", width: "100%", marginBottom: "1rem" }}
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="企業概要"
          style={{
            display: "block",
            width: "100%",
            marginBottom: "1rem",
            minHeight: "100px",
          }}
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
          登録
        </button>
      </form>
      {message && <p>{message}</p>}
      <p>
        <Link href="/company/login">ログイン</Link>
      </p>
    </div>
  );
}
