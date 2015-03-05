module ConstantDefault

  def myCSS
	"layout/styles/layout.css".html_safe
  end
  def myLogo
	"/stylesheets/images/default/logo.PNG".html_safe
  end
  def myBackGtroungImg
	"/stylesheets/images/demo/backgrounds/1.png".html_safe
  end
  
  ################################
  def myENSTA_Bretagne
	"ENSTA Bretagne".html_safe
  end
  def myENSTA_Bretagne_shortText
	"French Graduate and Post-graduate Engineering School and Research Institute based in Brest".html_safe
  end
  def myENSTA_Bretagne_logo
	"/stylesheets/images/default/Logo_ENSTA_Bretagne.jpg".html_safe
  end
  def myENSTA_Bretagne_pach
	"http://www.ensta-bretagne.eu/".html_safe
  end
  
  def myAland
	"Åland University".html_safe 
  end
  def myAland_shortText
	"University of Applied Sciences based in Åland".html_safe
  end
  def myAland_logo
	"/stylesheets/images/default/Logo_Aland2.png".html_safe
  end
  def myAland_pach
	"http://www.ha.ax/text.con?iPage=28&iLan=1".html_safe
  end
  
  def myWRSC
	"WRSC".html_safe
  end
  def myWRSC_shortText
	"World Robotic Sailing Championship".html_safe
  end
  def myWRSC_logo
	"/stylesheets/images/default/Logo_WRSC.jpg".html_safe
  end 
  def myWRSC_pach
	"http://wrsc2014.com/".html_safe
  end
  ##########

  def myTitle
	"Default Title".html_safe
  end
  def myHome
	"Home".html_safe
  end
  def myFollow
	"Follow a regatta".html_safe
  end
  
  def myRealTime
	"Real Time".html_safe
  end
  def myRealTime_shortText
	"Click here to follow the WRSC 2015".html_safe
  end
  
  def myReplay
	"Replay".html_safe
  end
  def myReplay_shortText
	"Click here to replay an event of the WRSC 2015".html_safe
  end  
  
  def myAccount
	"My Account".html_safe
  end
  def myTeam
	"My Team".html_safe
  end
  def myOwnInfo
	"My Own Information".html_safe
  end
  def myContact
	"Contact Us".html_safe
  end
  ###########
  class MyProjectMember1
	  attr_accessor :myName

	  def initialize(items)
		@myName = items
	  end

	  # Expose private binding() method.
	  def get_binding
		binding()
	  end

  end

merdre = MyProjectMember1.new("items")


  #####
  def myAboutUs
	"Members of the project".html_safe
  end
  def myQuestion1
	"What is Monitor Your Robot ?".html_safe
  end
  def myAnswer1
	"This site has been created by students of ENSTA Bretagne for the WRSC 2014 in Galway and allows anyboby to track the robots during the competition.".html_safe
  end
  def myQuestion2
	"What is the WRSC ?".html_safe
  end
  def myAnswer2
	"The WRSC is the World Robotic Sailing Championship. The 2014 edition takes place in Galway, Ireland between the 8th and the 13th September.".html_safe
  end
  def myQuestion3
	"How can I follow the competition ?".html_safe
  end
  def myAnswer3
	"To follow the WRSC 2014 in real time just click on the tab <%= link_to \"Real-Time\", view_path%> !".html_safe
  end
  
end