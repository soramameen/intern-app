"use client";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/interns/sign_in",
        { intern: { email, password } },
        { withCredentials: true } // クッキーを送信
      );
      setMessage(response.data.message);
      // 成功したらマイページへ
      window.location.href = "/me";
    } catch (error) {
      if (error) {
        setMessage("エラーが発生しました");
      }
    }
  };

  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレス"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード"
        />
        <button type="submit">ログイン</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
