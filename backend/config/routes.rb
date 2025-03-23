Rails.application.routes.draw do
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
  end
end
