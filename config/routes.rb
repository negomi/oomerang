Oomerang::Application.routes.draw do

  devise_for :users, controllers: { registrations: "registrations" }

  root to: "users#index"
  post "/items/found" => "items#found"
  post "/items/lost" => "items#lost"
  get "/users/logged" => "users#isLogged"
  get "/mailertest" => "users#mailertest"
  get "/welcome" => "users#show"

  resources :users, :items, :locations

end
