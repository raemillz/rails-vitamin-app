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
  end

  def create
    # @vitamin = Vitamin.new(vitamin_params)
    # respond_to do |format|
    #   if @vitamin.save
    #     format.html { redirect_to @vitamin, notice: 'Vitamin was successfully created.' }
    #   else
    #     format.html { render :new }
    #   end
    # end
    @vitamin = Vitamin.create(vitamin_params)
    render json: @vitamin, status: 201
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
