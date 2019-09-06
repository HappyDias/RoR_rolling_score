Rails.application.routes.draw do
  root 'static#index'
  namespace :api do
  	match "rollscore" => "rollscore#post", :via => :post
  	match "rollscore" => "rollscore#index", :via => :get
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
