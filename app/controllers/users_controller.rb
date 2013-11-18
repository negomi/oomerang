class UsersController < ApplicationController
  include UsersHelper

  def isLogged
    resp = user_signed_in?;
    respond_to do |format|
      format.json {render :json => [resp]}
    end
  end

  def new
  end

  def create
  end

  def update
  end

  def edit
  end

  def destroy
  end

  def index
  end

  def show
  end

  def mailertest

    #@user = User.new(params[:user])
    @user = User.find(1)
    @login_url = "http://www.oomerang.it/login"
    UserMailer.welcome_user_email(@user, @login_url).deliver  # calls method in app/Mailers/user_mailer.rb file


    #@user = User.new(params[:user])
    @user = User.find(5)
    UserMailer.farewell_user_email(@user).deliver


    #@seeker = User.new(params[:user])
    #@lost_item = Item.new(params[:item])
    @processed = "added"
    @seeker = User.find(3)
    @lost_item = Item.find(3)
    @returned_url = "http://www.oomerang.it?item_id=3"
    UserMailer.processed_lost_item_email(@processed, @seeker, @lost_item, @returned_url).deliver       # calls method in app/Mailers/user_mailer.rb file


    #@finder = User.new(params[:user])
    #@found_item = Item.new(params[:item])
    @processed = "added"
    @finder = User.find(6)
    @found_item = Item.find(8)
    @returned_url = "http://www.oomerang.it?item_id=8"
    UserMailer.processed_found_item_email(@processed, @finder, @found_item, @returned_url).deliver      # calls method in app/Mailers/user_mailer.rb file


    #@seeker = User.new(params[:user])
    #@lost_item = Item.new(params[:item])
    @processed = "edited"
    @seeker = User.find(3)
    @lost_item = Item.find(3)
    @returned_url = "http://www.oomerang.it?item_id=2"
    UserMailer.processed_lost_item_email(@processed, @seeker, @lost_item, @returned_url).deliver      # calls method in app/Mailers/user_mailer.rb file


    #@finder = User.new(params[:user])
    #@found_item = Item.new(params[:item])
    @processed = "edited"
    @finder = User.find(6)
    @found_item = Item.find(8)
    @returned_url = "http://www.oomerang.it?item_id=5"
    UserMailer.processed_found_item_email(@processed, @finder, @found_item, @returned_url).deliver     # calls method in app/Mailers/user_mailer.rb file


    #@seeker = User.new(params[:user])
    #@lost_item = Item.new(params[:item])
    @processed = "removed"
    @seeker = User.find(3)
    @lost_item = Item.find(3)
    @returned_url = "http://www.oomerang.it?item_id=3"
    UserMailer.processed_lost_item_email(@processed, @seeker, @lost_item, @returned_url).deliver    # calls method in app/Mailers/user_mailer.rb file


    #@finder = User.new(params[:user])
    #@found_item = Item.new(params[:item])
    @processed = "removed"
    @finder = User.find(6)
    @found_item = Item.find(8)
    @returned_url = "http://www.oomerang.it?item_id=4"
    UserMailer.processed_found_item_email(@processed, @finder, @found_item, @returned_url).deliver  # calls method in app/Mailers/user_mailer.rb file


    #@seeker = User.new(params[:user])
    #@lost_item = Item.new(params[:item])
    #@finder = User.new(params[:user])
    #@found_item = Item.new(params[:item])
    @seeker = User.find(3)
    @lost_item = Item.find(3)
    @finder = User.find(6)
    @found_item = Item.find(8)
    @returned_url = "http://www.oomerang.it?item_id=9"
    UserMailer.connect_to_seeker_email(@seeker, @finder, @lost_item, @found_item, @returned_url).deliver   # calls method in app/Mailers/user_mailer.rb file


    #@seeker = User.new(params[:user])
    #@lost_item = Item.new(params[:item])
    #@finder = User.new(params[:user])
    #@found_item = Item.new(params[:item])
    @seeker = User.find(3)
    @lost_item = Item.find(3)
    @finder = User.find(6)
    @found_item = Item.find(8)
    @returned_url = "http://www.oomerang.it?item_id=11"
    UserMailer.connect_to_finder_email(@seeker, @finder, @lost_item, @found_item, @returned_url).deliver   # calls method in app/Mailers/user_mailer.rb file

  end
end
