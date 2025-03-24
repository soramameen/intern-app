# test/test_helper.rb
ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require "rails/test_help"

class ActiveSupport::TestCase
  # フィクスチャの使用を一時的に無効化
  # fixtures :all
  
  # テスト実行前に必要なセットアップを行うメソッド
  # setup do
  #   # 必要に応じてテスト開始前の初期化処理をここに記述
  # end
  
  # テスト実行後のクリーンアップメソッド
  # teardown do
  #   # 必要に応じてテスト終了後のクリーンアップ処理をここに記述
  # end
  
  # ヘルパーメソッド：JSONレスポンスをパースする
  def json_response
    @json_response ||= JSON.parse(response.body)
  end
  
  # ヘルパーメソッド：一意のメールアドレスを生成する
  def unique_email(prefix = "test")
    "#{prefix}_#{Time.now.to_i}_#{rand(1000)}@example.com"
  end
end