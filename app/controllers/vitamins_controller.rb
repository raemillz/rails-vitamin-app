class VitaminsController < ApplicationController
  before_action :set_vitamin, only: [:show, :edit, :update, :destroy, :benefit_list]
  before_action :set_user
  #skip_before_action :set_vitamin, :only => [:most_popular]

  def index
    @vitamins = Vitamin.all
    # @vitamin = Vitamin.new
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @vitamins, each_serializer: VitaminSerializer }
    end
  end

  def show
    @message = params[:message] if params[:message]
    @message ||= false
    @benefits = @vitamin.benefits
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @vitamin, serializer: VitaminSerializer }
    end
  end

  def benefit_list
    # @vitamin_pack = @user.vitamin_packs.find_by(id: params[:id])
    @benefits = @vitamin.benefits
  end

  def new
    @vitamin = Vitamin.new
    @vitamin.benefits.build
  end

  def create
    # Renders JSON after form submitted without redirecting from index page.
    @vitamin = Vitamin.create(vitamin_params)
    if @vitamin.valid?
      @vitamin.save
      respond_to do |format|
        format.html { redirect_to vitamins_path }
        format.json { render json: @vitamin, status: 201 }
      end
    else
      render :new
    end
  end

  def most_popular
    @message = params[:message] if params[:message]
    @message ||= false
    render 'vitamins/most_popular'
  end

  def edit
    @vitamin.benefits.build
  end

  def update
    if @vitamin.update(vitamin_params)
      respond_to do |format|
        format.html { redirect_to vitamin_path(@vitamin) }
        format.json { render json: @vitamin }
      end
    else
      render :edit
    end
    # respond_to do |format|
    #   if @vitamin.update(vitamin_params)
    #     format.html { redirect_to @vitamin, notice: 'Vitamin was successfully updated.' }
    #   else
    #    format.html { render :edit }
    #    end
    #  end
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
