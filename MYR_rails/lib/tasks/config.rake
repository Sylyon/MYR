namespace :config do 
	desc "Load config"
	task(:load) do
		ruby "#{Rails.root}/lib/generator/ruby_script/config_static.rb"
		puts "Load config completed"
	end
end