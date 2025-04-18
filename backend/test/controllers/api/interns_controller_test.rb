# test/controllers/api/interns_controller_test.rb
require "test_helper"

class Api::InternsControllerTest < ActionDispatch::IntegrationTest
  # 最もシンプルなテスト - インターン一覧を取得できるか確認
  test "インターン一覧が取得できること" do
    # 直接URLを指定
    get "/api/interns"
    assert_response :success
  end

  # JSONレスポンスの基本的な確認
  test "インターン一覧がJSON形式で返されること" do
    # 直接URLを指定
    get "/api/interns"
    
    assert_response :success
    assert_equal "application/json; charset=utf-8", @response.content_type
    
    # レスポンスがJSONとして解析できることを確認
    json_response = JSON.parse(@response.body)
    assert_kind_of Array, json_response
  end
end