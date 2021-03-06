Rails.application.routes.draw do


  # Default root

    root 'static_pages#home'  

  # Resources

    resources :coordinates
    resources :trackers
    resources :members
    resources :teams
    resources :robots
    resources :attempts
    resources :missions
    resources :markers
    resources :sessions

  # GET

    get 'home', to: 'static_pages#home'
    get 'contact', to: 'static_pages#contact'
    get 'real-time', to: 'real_time#show'
    get 'markersCreation', to:'admin_markers#show'

  # Ajax

    get 'what', to: 'what#what'
    get 'getMissionLength', to: 'real_time#getMissionLength'
    get 'gatherCoordsBetweenDates', to: 'coordinates#gatherCoordsBetweenDates'
    get 'gatherCoordsSince', to: 'coordinates#gatherCoordsSince'
    get 'map_panel', to: 'real_time#map_panel'
    get 'getNewTrackers', to: 'real_time#getNewTrackers'


  # Authentication

    match '/signup' => 'members#new', :via => [:get]
    match '/signin' => 'sessions#new', :via => [:get]
    match '/signout' => 'sessions#delete', :via => [:get]
    
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
