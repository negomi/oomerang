Oomerang::Application.routes.draw do

  devise_for :users, controllers: { registrations: "registrations" }

  root to: "users#index"
  post "/items/found" => "items#found"
  post "/items/lost" => "items#lost"
  get "/users/logged" => "users#isLogged"
  get "/mailertest" => "users#mailertest"
  get "/welcome" => "users#show"
  get "/users/:user_id/items" => "items#show_all"

  resources :users, :items, :locations

  resources :users do
    resources :items
  end

end
