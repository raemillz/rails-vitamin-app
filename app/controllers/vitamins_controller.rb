class VitaminsController < ApplicationController
  before_action :set_vitamin, only: [:show, :edit, :update, :destroy]
  before_action :set_user

  def index
    @vitamins = Vitamin.all
  end

  def new
    @vitamin = Vitamin.new
  end

  def create
    @vitamin = Vitamin.new(vitamin_params)
    respond_to do |format|
      if @vitamin.save
        format.html { redirect_to @vitamin, notice: 'Vitamin was successfully created.' }
      else
        format.html { render :new }
      end
    end
  end

  def show
    @message = params[:message] if params[:message]
    @message ||= false
  end

  def edit
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
    @vitamin = Vitamin.find(params[:id])
  end

  def vitamin_params
    params.require(:vitamin).permit(:name, :capsule_amount, :benefit_ids => [], benefits_attributes: [:name])
  end

  def set_user
    @user = current_user
  end
end
