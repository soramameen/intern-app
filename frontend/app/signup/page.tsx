"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { FormData } from "@/app/types";

export default function Signup() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    passwordConfirmation: "",
    name: "",
    university: "",
    grade: "",
    skills: "",
    bio: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/interns/sign_up",
        { intern: formData },
        { withCredentials: true }
      );
      setMessage(response.data.message);
      window.location.href = "/me";
    } catch (error) {
      setMessage("登録に失敗しました");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>アカウント登録</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="メールアドレス"
          style={{
            display: "block",
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
          }}
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="パスワード"
          style={{
            display: "block",
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
          }}
        />
        <input
          type="password"
          name="passwordConfirmation"
          value={formData.passwordConfirmation}
          onChange={handleChange}
          placeholder="パスワード（確認）"
          style={{
            display: "block",
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
          }}
        />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="名前"
          style={{
            display: "block",
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
          }}
        />
        <input
          type="text"
          name="university"
          value={formData.university}
          onChange={handleChange}
          placeholder="大学"
          style={{
            display: "block",
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
          }}
        />
        <input
          type="number"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          placeholder="学年"
          style={{
            display: "block",
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
          }}
        />
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="スキル（例: Ruby, React）"
          style={{
            display: "block",
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
          }}
        />
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="自己紹介"
          style={{
            display: "block",
            width: "100%",
            padding: "0.5rem",
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
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          登録
        </button>
      </form>
      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
      <p style={{ marginTop: "1rem" }}>
        すでにアカウントをお持ちですか？ <Link href="/login">ログイン</Link>
      </p>
    </div>
  );
}
