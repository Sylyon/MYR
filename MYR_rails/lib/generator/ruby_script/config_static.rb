require 'yaml'
require 'erb'
puts "config_static.rb Start"

PATHFILE_YAML = "lib/generator/config_variables/"
PATHFILE_IN ="lib/generator/templates/statics/"
PATHFILE_OUT = "public/stylesheets/pages/"

FILENAME_YAML = "config.yaml"


data = YAML::load(File.open(PATHFILE_YAML+FILENAME_YAML))

files_in = PATHFILE_IN+"*"

Dir.glob(files_in).each do |file_path|
	file_path =Pathname.new(file_path)
	file_name = file_path.basename
    if file_name.extname == ".erb" # if file_name is an erb file
    	file_name = file_path.basename(".*") # remove the extention (here .erb)
    	if file_name.extname == ".html" # if file_name is an html file
    		inputfile = File.open(file_path)
			outfile = File.open(PATHFILE_OUT+file_name.to_s,"w")

			renderer = ERB.new(inputfile.read)
			output = renderer.result()
			outfile.write(output)

			outfile.close
			inputfile.close
		end
	end
end


puts "config_log.rb End"