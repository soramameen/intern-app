"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    university: "",
    grade: "",
    skills: "",
    bio: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/interns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intern: { ...formData, grade: parseInt(formData.grade) },
        }),
      });
      if (response.ok) {
        setMessage("登録成功！");
        setFormData({
          name: "",
          university: "",
          grade: "",
          skills: "",
          bio: "",
        });
      } else {
        const data = await response.json();
        setMessage(`エラー: ${data.errors.join(", ")}`);
      }
    } catch (error) {
      setMessage("通信エラーが発生しました");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">インターン生登録</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">名前</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">大学</label>
          <input
            type="text"
            name="university"
            value={formData.university}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">学年</label>
          <input
            type="number"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            min="1"
            max="6"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">スキル</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">一言</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          登録
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
