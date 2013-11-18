Oomerang::Application.routes.draw do

  devise_for :users

  root to: "users#index"
  post "/items/found" => "items#found"
  post "/items/lost" => "items#lost"
  get "/users/logged" => "users#isLogged"

  resources :users, :items, :locations

  

  get "/mailertest" => "users#mailertest"

end
