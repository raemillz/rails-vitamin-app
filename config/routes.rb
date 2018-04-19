Rails.application.routes.draw do
  resources :benefits
  resources :vitamin_packs
  resources :vitamins
  resources :users
  root "static#welcome"
end
