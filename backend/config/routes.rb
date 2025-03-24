Rails.application.routes.draw do
  # API名前空間内のすべてのルート
  namespace :api do
    # インターン用ルート
    devise_for :interns, 
      controllers: {
        sessions: 'api/sessions',
        registrations: 'api/registrations'
      },
      path: 'interns', # URLを/api/interns/にする
      path_names: {
        sign_in: 'sign_in',
        sign_out: 'sign_out',
        sign_up: 'sign_up'
      },
      defaults: { format: :json }
    
    # インターン関連リソース
    resources :interns, only: [:index, :create] do
      collection do
        get :me # /api/interns/meでユーザー情報を取得
      end
    end

     # 企業用ルートを名前空間内に定義
    devise_scope :company do
      post 'companies/sign_up', to: 'company_registrations#create'
      post 'companies/sign_in', to: 'company_sessions#create' 
      delete 'companies/sign_out', to: 'company_sessions#destroy'
    end
    
    # 残りのルート
    resources :interns, only: [:index, :create] do
      collection do
        get :me
      end
    end
    
    resources :companies, only: [] do
      collection do
        get :me
      end
    end
  end

  # Deviseのルートを名前空間の外に定義
  devise_for :companies, 
    controllers: { 
      sessions: 'api/company_sessions',
      registrations: 'api/company_registrations'
    },
    skip: [:sessions, :registrations]  # 明示的なルートを使うのでスキップ
  
  # ヘルスチェック用エンドポイント
  get "/health", to: proc { [200, {}, ["OK"]] }
end