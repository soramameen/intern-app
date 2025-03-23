"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { ArrowRight, Award, Briefcase, Users } from "lucide-react";

export default function InternHome() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 求人情報のダミーデータ
  const jobListings = [
    {
      id: 1,
      company: "テックイノベーション株式会社",
      position: "フロントエンドエンジニア",
      location: "東京",
      type: "リモート可",
      description:
        "最新のウェブテクノロジーを用いた開発プロジェクトに参加していただきます。React、Next.jsの経験があると望ましいです。",
    },
    {
      id: 2,
      company: "グローバルソフト",
      position: "バックエンドエンジニア",
      location: "大阪",
      type: "週3日〜",
      description:
        "Ruby on Railsを用いたAPIの開発をお任せします。チームでの開発経験を積みたい方におすすめです。",
    },
    {
      id: 3,
      company: "スタートアップ企画",
      position: "フルスタックエンジニア",
      location: "福岡",
      type: "フルリモート",
      description:
        "急成長中のスタートアップで、サービス開発の全般に携わっていただきます。様々な技術に触れるチャンスです。",
    },
  ];

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
    <div className="pt-20 pb-16">
      {/* ヒーローセクション */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Intern App</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
              インターン生のためのスキル共有と企業のマッチングプラットフォーム
            </p>

            {isLoggedIn ? (
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/intern/me">
                  <button className="bg-white text-blue-700 hover:bg-blue-50 transition duration-300 font-medium py-3 px-6 rounded-lg shadow-md flex items-center justify-center">
                    マイページ
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </Link>
                <Link href="/intern/interns">
                  <button className="bg-blue-500 hover:bg-blue-400 text-white transition duration-300 font-medium py-3 px-6 rounded-lg shadow-md flex items-center justify-center">
                    インターン希望生一覧
                    <Users className="ml-2 h-5 w-5" />
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/intern/login">
                  <button className="bg-white text-blue-700 hover:bg-blue-50 transition duration-300 font-medium py-3 px-6 rounded-lg shadow-md">
                    ログイン
                  </button>
                </Link>
                <Link href="/intern/signup">
                  <button className="bg-blue-500 hover:bg-blue-400 text-white transition duration-300 font-medium py-3 px-6 rounded-lg shadow-md">
                    新規登録
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 特徴セクション */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              プラットフォームの特徴
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              学生と企業をつなぐ、最高のインターン体験
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-blue-600 mb-4">
                <Users className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">スキルマッチング</h3>
              <p className="text-gray-600">
                あなたのスキルと経験に最適なインターンシップを見つけることができます。
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-blue-600 mb-4">
                <Briefcase className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">多様な求人</h3>
              <p className="text-gray-600">
                スタートアップから大企業まで、様々な業界の求人から選べます。
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-blue-600 mb-4">
                <Award className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">キャリア支援</h3>
              <p className="text-gray-600">
                インターンシップを通じて実務経験を積み、将来のキャリアにつなげましょう。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 求人セクション */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">注目の求人</h2>
            <p className="mt-4 text-xl text-gray-600">
              あなたのスキルを活かせるインターンシップ
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobListings.map((job) => (
              <div
                key={job.id}
                className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition duration-300"
              >
                <div className="border-b border-gray-200 bg-blue-50 p-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {job.position}
                  </h3>
                  <p className="text-blue-600 font-medium">{job.company}</p>
                </div>
                <div className="p-4">
                  <div className="flex items-center text-gray-600 mb-3">
                    <span className="font-medium mr-2">勤務地:</span>
                    {job.location}
                  </div>
                  <div className="flex items-center text-gray-600 mb-3">
                    <span className="font-medium mr-2">勤務形態:</span>
                    {job.type}
                  </div>
                  <p className="text-gray-700 mb-4">{job.description}</p>
                  <div className="pt-2">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition duration-300 flex items-center justify-center">
                      詳細を見る
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/intern/jobs"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              すべての求人を見る
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* CTAセクション */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <h2 className="text-3xl font-bold mb-4">
            あなたのキャリアをスタートさせましょう
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            インターンシップを通じて、実務経験を積み、将来のキャリアへの第一歩を踏み出しましょう。
          </p>
          <Link href={isLoggedIn ? "/intern/jobs" : "/intern/signup"}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-medium transition duration-300 text-lg">
              {isLoggedIn ? "求人を探す" : "今すぐ登録する"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
