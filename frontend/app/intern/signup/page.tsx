"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
  User,
  Mail,
  Lock,
  Book,
  Briefcase,
  GraduationCap,
  FileText,
  AlertCircle,
} from "lucide-react";

export default function Signup() {
  const [formData, setFormData] = useState({
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
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/interns/sign_up",
        { intern: formData },
        { withCredentials: true }
      );
      setMessage(response.data.message);
      window.location.href = "/intern/me";
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors(["登録に失敗しました。もう一度お試しください。"]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16 flex justify-center bg-gray-50">
      <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">アカウント登録</h1>
          <p className="mt-2 text-gray-600">
            インターンシップを見つけるために新しいアカウントを作成しましょう
          </p>
        </div>

        {errors.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            <div className="flex items-center mb-1">
              <AlertCircle className="h-5 w-5 mr-2" />
              <p className="font-medium">登録に問題がありました</p>
            </div>
            <ul className="ml-7 list-disc">
              {errors.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 基本情報 */}
            <div className="md:col-span-2">
              <h2 className="text-lg font-medium text-gray-800 mb-3">
                基本情報
              </h2>
            </div>

            {/* メールアドレス */}
            <div className="md:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                メールアドレス
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* パスワード */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                パスワード
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="パスワード"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* パスワード確認 */}
            <div>
              <label
                htmlFor="passwordConfirmation"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                パスワード（確認）
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="passwordConfirmation"
                  type="password"
                  name="passwordConfirmation"
                  value={formData.passwordConfirmation}
                  onChange={handleChange}
                  placeholder="パスワード確認"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* プロフィール情報 */}
            <div className="md:col-span-2 mt-2">
              <h2 className="text-lg font-medium text-gray-800 mb-3">
                プロフィール情報
              </h2>
            </div>

            {/* 名前 */}
            <div className="md:col-span-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                名前
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="名前"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* 大学 */}
            <div>
              <label
                htmlFor="university"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                大学
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Book className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="university"
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  placeholder="大学名"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* 学年 */}
            <div>
              <label
                htmlFor="grade"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                学年
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <GraduationCap className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                >
                  <option value="">学年を選択</option>
                  <option value="1">1年生</option>
                  <option value="2">2年生</option>
                  <option value="3">3年生</option>
                  <option value="4">4年生</option>
                  <option value="5">修士1年</option>
                  <option value="6">修士2年</option>
                </select>
              </div>
            </div>

            {/* スキル */}
            <div className="md:col-span-2">
              <label
                htmlFor="skills"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                スキル
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="skills"
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="スキル（例: React, Rails, Python）"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                カンマで区切って入力してください
              </p>
            </div>

            {/* 自己紹介 */}
            <div className="md:col-span-2">
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                自己紹介
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="あなた自身や興味のある分野、希望するインターンシップについて教えてください"
                  rows={4}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "登録中..." : "アカウント登録"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            すでにアカウントをお持ちですか？{" "}
            <Link
              href="/intern/login"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ログイン
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
