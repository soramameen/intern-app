import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          {/* ロゴ */}
          <Link href="/intern" className="flex items-center">
            <span className="text-blue-600 font-bold text-2xl">Intern App</span>
          </Link>

          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/intern"
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
            >
              ホーム
            </Link>
            <Link
              href="/intern/interns"
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
            >
              インターン生一覧
            </Link>
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition duration-200">
                求人情報
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200">
                <Link
                  href="/intern/jobs"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
                >
                  新着求人
                </Link>
                <Link
                  href="/intern/companies"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
                >
                  企業一覧
                </Link>
              </div>
            </div>
            <div className="h-5 border-r border-gray-300"></div>
            <Link
              href="/intern/login"
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
            >
              ログイン
            </Link>
            <Link href="/intern/signup">
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition duration-200">
                新規登録
              </button>
            </Link>
            <Link
              href="/company"
              className="text-gray-500 hover:text-blue-600 transition duration-200 text-sm"
            >
              企業向けページ
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
              href="/intern"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              ホーム
            </Link>
            <Link
              href="/intern/interns"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              インターン生一覧
            </Link>
            <Link
              href="/intern/jobs"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              求人情報
            </Link>
            <Link
              href="/intern/login"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              ログイン
            </Link>
            <Link
              href="/intern/signup"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              新規登録
            </Link>
            <Link
              href="/company"
              className="block px-3 py-2 rounded-md text-sm text-gray-500 hover:bg-blue-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              企業向けページ
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
