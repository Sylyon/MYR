namespace :config do 
	desc "Load config"
	task(:load) do
		ruby "#{Rails.root}/config/config_load.rb"
		puts "Load config completed"
	end
end