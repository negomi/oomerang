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
end
