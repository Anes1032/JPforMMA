Rails.application.routes.draw do
  devise_for :users, skip: [:unlocks, :passwords, :registrations, :sessions], controllers: { sessions: 'users/sessions' }
  devise_scope :user do
    get 'login', to: 'devise/sessions#new', as: :new_user_session
    post 'login', to: 'devise/sessions#create', as: :user_session
    delete 'logout', to: 'devise/sessions#destroy', as: :destroy_user_session
  end

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  get 'posts', to: 'posts#index'
  get 'posts/top', to: 'posts#top'
  post 'posts', to: 'posts#create'
  get 'posts/:id', to: 'posts#show'
  patch 'posts/:id', to: 'posts#update'
  put 'posts/:id', to: 'posts#update'
  delete 'posts/:id', to: 'posts#destroy'

  get 'tags', to: 'tags#index'
  get 'tags/:id', to: 'tags#show'

  get 'fighters', to: 'fighters#index'
  get 'fighters/:id', to: 'fighters#show'

  get 'users', to: 'users#index'
  post 'users', to: 'users#create'

  get '/' => redirect('/admin')

  get 'test', to: 'test#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
