class VitaminsController < ApplicationController
  before_action :set_vitamin, only: [:show, :edit, :update, :destroy]
  before_action :set_user
  #skip_before_action :set_vitamin, :only => [:most_popular]

  def index
    @vitamins = Vitamin.all
    @vitamin = Vitamin.new

  end

  def new
    @vitamin = Vitamin.new
    @vitamin.benefits.build
    # respond_to do |format|
    #   format.html {render layout: false}
    #   format.js {render layout: false}
    # end
  end

  def create
    # Renders JSON after form submitted without redirecting
    @vitamin = Vitamin.new(vitamin_params)
    if @vitamin.valid?
      @vitamin.save
      render json: @vitamin, status: 201, serializer: VitaminSerializer
    else
      render :new
    end
  end

  def most_popular
    @message = params[:message] if params[:message]
    @message ||= false
    render 'vitamins/most_popular'
  end

  def show
    @message = params[:message] if params[:message]
    @message ||= false
  end

  def edit
    @vitamin.benefits.build
  end

  def update
    respond_to do |format|
      if @vitamin.update(vitamin_params)
        format.html { redirect_to @vitamin, notice: 'Vitamin was successfully updated.' }
      else
       format.html { render :edit }
       end
     end
   end

  def destroy
    @vitamin.destroy
    redirect_to vitamins_path
  end

  private
  def set_vitamin
    if params[:id] != "popular"
      @vitamin = Vitamin.find(params[:id])
    else
      @vitamin = Vitamin.most_popular
    end
  end

  def vitamin_params
    params.require(:vitamin).permit(:name, :capsule_amount, :benefit_ids => [], benefits_attributes: [:name, :id])
  end

  def set_user
    @user = current_user
  end
end
