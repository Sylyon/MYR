// Commands use to create the project with the database

rails new MYR_rails

cd MYR_rails
echo Creating database
		rails generate scaffold marker name:string description:text latitude:decimal longitude:decimal datetime:datetime mission_id:integer
		rails generate scaffold mission name:string description:text
		rails generate scaffold attempt name:string start:datetime end:datetime robot_id:integer mission_id:integer tracker_id:integer
		rails generate scaffold robot name:string category:string team_id:integer
		rails generate scaffold team name:string logo:string description:text
		rails generate scaffold member name:string password:string email:string role:string logo:string team_id:integer
		rails generate scaffold tracker token:string description:integer
		rails generate scaffold coordinate latitude:decimal longitude:decimal datetime:datetime tracker_id:integer
		rails generate controler What what
		rails generate scaffold home
		rails g migration RemoveLatitudeFromCoordinates latitude:decimal 
		rails g migration RemoveLongitudeFromCoordinates longitude:decimal
		rails g migration AddLatidudeToCoordinates latitude:float
		rails g migration AddLongitudeToCoordinates longitude:float
		rails g migration RemoveLatitudeFromMarkers latitude:decimal 
		rails g migration RemoveLongitudeFromMarkers longitude:decimal
		rails g migration AddLatidudeToMarkers latitude:float
		rails g migration AddLongitudeToMarkers longitude:float
		rails destroy scaffold home
		rails generate controller StaticPages home contact
		rails g migration AddStartToMissions start:datetime
		rails g migration AddEndToMissions end:datetime
		rails generate scaffold session
		rails g migration AddPasswordDigestToMembers password_digest:string
		rails g migration RemovePasswordFromMembers password:string
		rails g migration AddLeaderToTeam leader_id:integer



echo migrating database
rake db:migrate

// END 
