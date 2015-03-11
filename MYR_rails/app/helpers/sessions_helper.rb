module SessionsHelper
  def sign_in(user)
    cookies.signed[:user_id] = user.id
    self.current_user=user
  end
  
  def sign_out
    cookies.delete(:user_id)
	self.current_user=nil
  end
  
  def current_user 
    @current_user ||= Member.find_by_id(cookies.signed[:user_id])
  end
  
  def current_user=(user)
    @current_user = user
  end

  def tabToString(tab)
	rep=""
	if tab.size>0
		if tab.size>1
			for i in 0..tab.size-2
				rep=rep+tab[i].to_s+", "
			end
		end
		rep=rep+tab[tab.size-1].to_s
	end
	return rep
  end
  
  def stringToTab(myString)
	rep=[]
	if myString != nil
		rep = myString.split(",")
	end
	return rep
  end
  
  
  def sign_in?
    !current_user.nil?
  end
  
  def sign_A?
	rep=false
	if !current_user.nil?
		if current_user.role=="administrator"
			rep=true
		end
	end
    
  end
  
  def is_admin?
	if current_user.role=="administrator"
		true
	else
		false
	end
  end
  
  def is_leader?
	rep=false
	if Team.first != nil
		for i in Team.first.id..Team.last.id
			if Team.find_by_id(i) != nil
				if cookies.signed[:user_id] == Team.find_by_id(i).leader_id
					rep=true
				end
			end
		end
	end
	return rep
  end


end
