class UserMailer < ActionMailer::Base
  default from: "Oomerang <no-reply@oomerang.it>"

  def welcome_user_email(user, login_url)
    @user = user                     # This @user was created in the users_controller.rb's def create...
    @login_url = login_url
    #mail(to: @user.email, subject: 'Welcome to Oomerang!') # this format should work, but doesn't?
    mail(to: @user[:email], subject: 'Welcome to Oomerang!')
  end

  # def farewell_user_email(user)
  #   @user = user
  #   #mail(to: @user.email, subject: "Oomerang: We're sorry to see you go...") # this format should work, but doesn't?
  #   mail(to: @user[:email], subject: "Oomerang: We're sorry to see you go...")
  # end

  # def processed_lost_item_email(processed, seeker, lost_item, returned_url)
  #   @processed = processed
  #   @seeker = seeker
  #   @lost_item = lost_item
  #   @returned_url = returned_url
  #   #mail(to: @seeker.email], subject: 'Oomerang: Confirming you ' + @processed + ' a new lost item...') # this format should work, but doesn't?
  #   mail(to: @seeker[:email], subject: 'Oomerang: Confirming you ' + @processed + ' a new lost item...')
  # end

  # def processed_found_item_email(processed, finder, found_item, returned_url)
  #   @processed = processed
  #   @finder = finder
  #   @found_item = found_item
  #   @returned_url = returned_url
  #   #mail(to: @finder.email, subject: 'Oomerang: Confirming you ' + @processed + ' a new found item...') # this format should work, but doesn't?
  #   mail(to: @finder[:email], subject: 'Oomerang: Confirming you ' + @processed + ' a new found item...')
  # end


  def connect_to_seeker_email(item,finder,seeker)
    @item = item
    @finder = finder
    @seeker = seeker
    mail(to: @seeker.email, subject: 'Someone may have found your lost item!')
  end

  def connect_to_finder_email(item,answer,seeker,finder)
    @item = item
    @answer = answer
    @seeker = seeker
    @finder = finder
    mail(to: @finder.email, subject: 'Someone might be the owner of the item you found!')
  end

end