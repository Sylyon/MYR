require 'test_helper'

class AndroidControllerTest < ActionController::TestCase
  test "should get who" do
    get :who
    assert_response :success
  end

  test "should get whois" do
    get :whois
    assert_response :success
  end

end
