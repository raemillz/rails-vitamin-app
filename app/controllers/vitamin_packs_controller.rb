class VitaminPacksController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user

  def new
    @vitamin_pack = VitaminPack.new
    @vitamin_pack.vitamins.build.benefits.build
  end

  def create
    @vitamin_pack = @user.vitamin_packs.build(vitamin_pack_params)
    respond_to do |format|
      if @vitamin_pack.save
        format.html {redirect_to @vitamin_pack, notice: 'Vitamin Pack was successfully created.'}
      else
        format.html { render :new}
      end
    end
  end

  def index
    @vitamin_packs = @user.vitamin_packs
    respond_to do |format|
      format.html {render 'index.html', :layout => false}
      format.js {render 'index.js', :layout => false}
    end
  end

  def show
    @message = params[:message] if params[:message]
    @message ||= false
    if params[:user_id]
      @vitamin_pack = @user.vitamin_packs.find_by(id: params[:id])
      if @vitamin_pack.nil?
        redirect_to user_vitamin_packs_path(@user), alert: "Vitamin pack not found"
      end
    else
      @vitamin_pack = VitaminPack.find(params[:id])
      render json: @vitamin_pack, status: 200
    end
  end

  def edit
    if params[:user_id]
      if @user.nil?
        redirect_to new_user_path, alert: "User not found."
      else
        @vitamin_pack = @user.vitamin_packs.find_by(id: params[:id])
        redirect_to user_vitamin_packs_path(@user), alert: "Vitamin Pack not found." if @vitamin_pack.nil?
      end
    else
      @vitamin_pack = VitaminPack.find(params[:id])
      @vitamin_pack.vitamins.build.benefits.build
    end
  end

  def update
    @vitamin_pack = VitaminPack.find(params[:id])

    @vitamin_pack.update(vitamin_pack_params)

    if @vitamin_pack.save
      redirect_to @vitamin_pack
    else
      render :edit
    end
  end

  def destroy
    @vitamin_pack = VitaminPack.find(params[:id])
    @vitamin_pack.destroy
    flash[:notice] = "Vitamin Pack deleted."
    redirect_to user_path(current_user)
  end

  private

  def vitamin_pack_params
    params.require(:vitamin_pack).permit(:name, :user_name, :user_id, :vitamin_ids => [], vitamins_attributes: [:id, :name, :capsule_amount, :benefit_ids => [], benefits_attributes: [:id, :name]])
  end

  def set_user
    @user = current_user #@user = User.find(params[user_id])
  end
end
