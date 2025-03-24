# config/initializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # 開発環境用の設定
    origins ENV.fetch('FRONTEND_URL', 'http://localhost:3001')
    
    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true,
      max_age: 86400 # プリフライトリクエストの結果を24時間キャッシュ
  end
  
  # 本番環境用の設定（必要に応じて追加）
  # allow do
  #   origins 'https://yourdomain.com'
  #   resource '*',
  #     headers: :any,
  #     methods: [:get, :post, :put, :patch, :delete, :options, :head],
  #     credentials: true
  # end
end