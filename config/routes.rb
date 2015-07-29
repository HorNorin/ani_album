Rails.application.routes.draw do
 root "home#index"
 resources :albums, only: :index
end
