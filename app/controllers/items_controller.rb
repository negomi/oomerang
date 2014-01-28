class ItemsController < ApplicationController

  def index
    items = Item.all
    itemsInfo = []
    items.each do |i|
      itemsInfo.push(
        {id:i.id,
        status:i.status,
        lat:i.location.latitude,
        lng:i.location.longtitude,
        title:i.title,
        # cat1:Category.find_by_id(i.category.parent_id).name,
        # cat2:i.category.name,
        date:i.location.date.strftime("%m/%d/%Y"),
        time:i.location.time.strftime("%I:%M%p"),
        place:i.location.details,
        extra_info:i.details,
        secret:i.secret_info
        })
    end
    respond_to do |format|
      format.json {render :json => itemsInfo}
    end
  end

  def lost
    l = Location.new
    l.latitude = params[:latitude]
    l.longtitude = params[:longitude]
    l.date = params[:date]
    l.time = params[:time]
    l.details = params[:place]

    # c = Category.find_by_name(params[:cat2])

    i = Item.new
    i.status = params[:status]
    i.title = params[:title]
    i.details = params[:desc]
    i.location = l
    # i.category = c
    i.seeker_id = current_user.id
    i.save

    respond_to do |format|
      format.json {render :json => i}
    end
  end

  def found
    l = Location.new
    l.latitude = params[:latitude]
    l.longtitude = params[:longitude]
    l.date = params[:date]
    l.time = params[:time]
    l.details = params[:place]

    # c = Category.find_by_name(params[:cat2])

    i = Item.new
    i.status = params[:status]
    i.title = params[:title]
    i.details = params[:desc]
    i.secret_info = params[:question]
    i.location = l
    # i.category = c
    i.seeker_id = current_user.id
    i.save

    respond_to do |format|
      format.json {render :json => ['success']}
    end
  end

  def show_all
    @lost_items = current_user.lost_items
    @found_items = current_user.found_items
    render :index
  end

  def show
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
    item = Item.find(params[:id].to_i)
    item.destroy
    redirect_to :back
  end

end
