"use client";

import InternList from "@/app/components/InternList";

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto p-4 mt-10">
      <h1 className="text-2xl font-bold mb-4">インターン生一覧</h1>
      <InternList />
    </div>
  );
}
