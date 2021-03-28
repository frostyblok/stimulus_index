Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'users#index'

  resources :users do
    member do
      get '/users_json' => 'users#users_json'
    end
  end
end
