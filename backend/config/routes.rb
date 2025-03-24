Rails.application.routes.draw do
  # API名前空間内のすべてのルート
  namespace :api do
    # インターン用ルート
    devise_for :interns, 
      controllers: {
        sessions: 'api/sessions',
        registrations: 'api/registrations'
      },
      path: 'interns',
      path_names: {
        sign_in: 'sign_in',
        sign_out: 'sign_out',
        sign_up: 'sign_up'
      },
      defaults: { format: :json }
    
    # インターン関連リソース
    resources :interns, only: [:index, :create] do
      collection do
        get :me
      end
    end

    # 企業用ルートはひとまず単純化
    resources :companies, only: [] do
      collection do
        get :me
      end
    end
    
    # 明示的なルートとして追加
    post 'companies/sign_up', to: 'company_registrations#create'
    post 'companies/sign_in', to: 'company_sessions#create'
    delete 'companies/sign_out', to: 'company_sessions#destroy'
  end

  # ヘルスチェック用エンドポイント
  get "/health", to: proc { [200, {}, ["OK"]] }
end