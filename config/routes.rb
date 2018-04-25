Rails.application.routes.draw do
  root "static#welcome"
  get "/signin", to: "sessions#new"
  get '/auth/facebook/callback', to: 'sessions#omnicreate'
  post "/sessions/create", to: "sessions#create"
  get "/signout", to: "sessions#destroy"
  delete "/signout", to: "sessions#destroy"
  resources :benefits
  resources :vitamins
  resources :users do
    resources :vitamin_packs, only: [:show, :new, :edit]
  end
  resources :vitamin_packs
end
