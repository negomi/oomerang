class RegistrationsController < Devise::RegistrationsController

  def create
    super
    login_url = "http://www.oomerang.it"
    UserMailer.welcome_user_email(@user, login_url).deliver unless @user.invalid?
  end

end