Rails.application.routes.draw do
  root "static#welcome"
  devise_for :users, :skip => [:sessions], controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  resources :users do
    resources :vitamin_packs do
      resources :vitamins
    end
  end
  get "/users/signin", to: "sessions#new"
  get "/signin", to: "sessions#new"
  post "/sessions/create", to: "sessions#create"
  get "/signout", to: "sessions#destroy"
  delete "/signout", to: "sessions#destroy"
  resources :benefits
  resources :vitamins
  resources :vitamin_packs
  get "vitamins/popular", to: "vitamins#most_popular"
  post "vitamins/popular", to: "vitamins#most_popular"
end
