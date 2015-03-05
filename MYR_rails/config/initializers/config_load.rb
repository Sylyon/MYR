require 'yaml'
require 'erb'
puts "config_log.rb Start"

PATHFILE_YAML = "config/"
FILENAME_YAML = "config.yaml"
PATHFILE_IN ="public/stylesheets/pages/"
FILENAME_IN = "test.html.erb"
PATHFILE_OUT = "public/stylesheets/pages/"
FILENAME_OUT = "test_output.html.erb"

data = YAML::load(File.open(PATHFILE_YAML+FILENAME_YAML))
inputfile = File.open(PATHFILE_IN+FILENAME_IN)
outfile = File.open(PATHFILE_OUT+FILENAME_OUT,"w")

renderer = ERB.new(inputfile.read)
output = renderer.result()
outfile.write(output)

outfile.close
inputfile.close

puts "config_log.rb End"