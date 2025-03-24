# test/models/company_test.rb
require "test_helper"

class CompanyTest < ActiveSupport::TestCase
  # フィクスチャをクリアして最もシンプルなテスト
  def setup
    # テスト毎にデータをクリア（オプション）
    # Company.delete_all
  end

  # 最もシンプルなテスト - 企業モデルが存在することを確認
  test "企業モデルが存在すること" do
    company = Company.new
    assert_kind_of Company, company
  end

  # メールアドレスを毎回ユニークにして重複を避ける
  test "基本的な属性が設定できること" do
    # タイムスタンプを使って一意のメールアドレスを生成
    unique_email = "company_#{Time.now.to_i}@example.com"
    
    company = Company.new(
      name: "テスト株式会社",
      email: unique_email,
      password: "password123"
    )
    
    assert_equal "テスト株式会社", company.name
    assert_equal unique_email, company.email
  end

  # バリデーションの基本的なテスト
  test "企業名が必須であること" do
    # タイムスタンプを使って一意のメールアドレスを生成
    unique_email = "company_validation_#{Time.now.to_i}@example.com"
    
    company = Company.new(
      email: unique_email,
      password: "password123"
    )
    
    assert_not company.valid?
    # エラーメッセージの言語によって異なるため、キーの存在だけチェック
    assert company.errors[:name].any?
  end
end