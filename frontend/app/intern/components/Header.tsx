import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 p-4 bg-gray-100 text-center shadow-sm z-10">
      <Link href="/intern" className="inline-block">
        <h2 className="m-0 text-2xl font-semibold">Intern App</h2>
      </Link>
      <nav className="mt-2">
        <Link href="/intern" className="mr-4 text-blue-600 hover:text-blue-800">
          ホーム
        </Link>
        <Link
          href="/intern/signup"
          className="mr-4 text-blue-600 hover:text-blue-800"
        >
          登録
        </Link>
        <Link
          href="/intern/login"
          className="mr-4 text-blue-600 hover:text-blue-800"
        >
          ログイン
        </Link>
        <Link
          href="/intern/interns"
          className="mr-4 text-blue-600 hover:text-blue-800"
        >
          インターン生一覧
        </Link>
        <Link href="/company" className="text-blue-600 hover:text-blue-800">
          企業向けページ
        </Link>
      </nav>
    </header>
  );
}
