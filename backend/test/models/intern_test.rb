# test/models/intern_test.rb
require "test_helper"

class InternTest < ActiveSupport::TestCase
  # 最もシンプルなテスト - インターンモデルが存在することを確認
  test "インターンモデルが存在すること" do
    intern = Intern.new
    assert_kind_of Intern, intern
  end

  # メールアドレスを毎回ユニークにして重複を避ける
  test "基本的な属性が設定できること" do
    # タイムスタンプを使って一意のメールアドレスを生成
    unique_email = "intern_#{Time.now.to_i}@example.com"
    
    intern = Intern.new(
      name: "山田太郎",
      email: unique_email,
      password: "password123"
    )
    
    assert_equal "山田太郎", intern.name
    assert_equal unique_email, intern.email
  end

  # バリデーションの基本的なテスト
  test "名前が必須であること" do
    # タイムスタンプを使って一意のメールアドレスを生成
    unique_email = "intern_validation_#{Time.now.to_i}@example.com"
    
    intern = Intern.new(
      email: unique_email,
      password: "password123"
    )
    
    assert_not intern.valid?
    # エラーメッセージの言語によって異なるため、キーの存在だけチェック
    assert intern.errors[:name].any?
  end
end