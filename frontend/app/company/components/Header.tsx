import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { Company } from "@/app/types";
import {
  Menu,
  X,
  ChevronDown,
  User,
  Building,
  Briefcase,
  LogOut,
} from "lucide-react";

export default function CompanyHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/companies/me",
          {
            withCredentials: true,
          }
        );
        setIsLoggedIn(true);
        setCompany(response.data);
        setLoading(false);
      } catch (err) {
        setIsLoggedIn(false);
        setLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.delete("http://localhost:3000/api/companies/sign_out", {
        withCredentials: true,
      });
      setIsLoggedIn(false);
      window.location.href = "/company";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          {/* ロゴ */}
          <Link href="/company" className="flex items-center">
            <Building className="h-6 w-6 text-blue-600 mr-2" />
            <span className="text-blue-600 font-bold text-xl">
              企業向けポータル
            </span>
          </Link>

          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/company"
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
            >
              ホーム
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  href="/company/interns"
                  className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
                >
                  インターン生一覧
                </Link>
                <Link
                  href="/company/offers"
                  className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
                >
                  送信済みオファー
                </Link>

                <div className="h-5 border-r border-gray-300"></div>

                <div className="relative group">
                  <button className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition duration-200">
                    {loading
                      ? "読み込み中..."
                      : company
                      ? company.name
                      : "マイページ"}
                    <ChevronDown className="ml-1 w-4 h-4" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200">
                    <Link
                      href="/company/me"
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 flex items-center"
                    >
                      <User className="h-4 w-4 mr-2" />
                      マイページ
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      ログアウト
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/company/login"
                  className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
                >
                  ログイン
                </Link>
                <Link href="/company/signup">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition duration-200">
                    新規登録
                  </button>
                </Link>
              </>
            )}

            <Link
              href="/intern"
              className="text-gray-500 hover:text-blue-600 transition duration-200 text-sm"
            >
              インターン生向けページ
            </Link>
          </nav>

          {/* モバイルメニューボタン */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* モバイルメニュー */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/company"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              ホーム
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  href="/company/interns"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  インターン生一覧
                </Link>
                <Link
                  href="/company/offers"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  送信済みオファー
                </Link>
                <Link
                  href="/company/me"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  マイページ
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50"
                >
                  ログアウト
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/company/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ログイン
                </Link>
                <Link
                  href="/company/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  新規登録
                </Link>
              </>
            )}

            <Link
              href="/intern"
              className="block px-3 py-2 rounded-md text-sm text-gray-500 hover:bg-blue-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              インターン生向けページ
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
