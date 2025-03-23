Rails.application.routes.draw do
  devise_for :companies
  namespace :api do
    devise_for :interns, 
      controllers: { sessions: 'api/sessions',
      registrations: 'api/registrations'}, # ← 登録コントローラを指定
      skip: [:registrations, :passwords]
    devise_scope :api_intern do
        post 'interns/sign_up', to: 'registrations#create'
        post 'interns/sign_in', to: 'sessions#create'
        delete 'interns/sign_out', to: 'sessions#destroy'
    end

    resources :interns, only: [:index, :create] do
      get :me, on: :collection
    end
    # 企業ルート
    devise_for :companies, 
        controllers: { 
          sessions: 'api/company_sessions',
          registrations: 'api/company_registrations' },

      defaults: { format: :json }

    devise_scope :company do
      post 'companies/sign_in', to: 'company_sessions#create'
      delete 'companies/sign_out', to: 'company_sessions#destroy'
      post 'companies/sign_up', to: 'company_registrations#create'
    end
    resources :companies, only: [] do
      get :me, on: :collection
    end
  end
end
