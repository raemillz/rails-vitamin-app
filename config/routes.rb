Rails.application.routes.draw do
  root "static#welcome"
  get "/signin", to: "sessions#new"
  post "/sessions/create", to: "sessions#create"
  delete "/signout", to: "sessions#destroy"
  resources :benefits
  resources :vitamins
  resources :users do
    resources :vitamin_packs, only: [:index, :show, :new, :edit]
  end
end
