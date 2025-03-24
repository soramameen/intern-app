# test/controllers/api/sessions_controller_test.rb
require "test_helper"

class Api::SessionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    # テスト用のインターン生を作成（毎回ユニークなメールアドレスを使用）
    unique_email = "test_#{Time.now.to_i}@example.com"
    @intern = Intern.create!(
      name: "テストユーザー",
      email: unique_email,
      password: "password123"
    )
  end

  # 最もシンプルなログインテスト
  test "有効な認証情報でログインできること" do
    # routes.rbの設定に基づいて正しいパスを使用
    post "/api/interns/sign_in", params: {
      intern: {
        email: @intern.email,
        password: "password123"
      }
    }, as: :json
    
    assert_response :success
  end
end