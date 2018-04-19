class BenefitsController < ApplicationController
  before_action :set_benefit, only: [:show, :edit, :update, :destroy]

  def index
    @benefits = Benefit.all
  end

  def new
    @benefit = Benefit.new
  end

  def create
    @benefit = Benefit.new(benefit_params)
    respond_to do |format|
      if @benefit.save
        format.html { redirect_to @benefit, notice: 'Benefit was successfully created.' }
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
      if @benefit.update(benefit_params)
        format.html { redirect_to @benefit, notice: 'Benefit was successfully updated.' }
      else
        format.html { render :edit }
      end
    end
  end

  def destroy
    @benefit.destroy
    respond_to do |format|
      format.html { redirect_to benefits_url, notice: 'Benefit was successfully destroyed.' }
    end
  end

  private
  def set_benefit
    @benefit = Benefit.find(params[:id])
  end

  def benefit_params
    params.require(:benefit).permit(:name)
  end
end
