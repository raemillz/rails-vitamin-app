class VitaminPacksController < ApplicationController

  def new
    @vitamin_pack = VitaminPack.new
  end

  def create
    @user = User.find_by(params[:id])
    @vitamin_pack = @user.vitamin_packs.build(vitamin_pack_params)
    if @vitamin_pack.save
      redirect_to @vitamin_pack
    else
      redirect_to @user
    end
  end

  def show
    if params[:user_id]
      @user = User.find_by(id: params[:user_id])
      @vitamin_pack = @user.vitamin_packs.find_by(id: params[:id])
      if @vitamin_pack.nil?
        redirect_to user_vitamin_packs_path(@user), alert: "Vitamin pack not found"
      end
    else
      @vitamin_pack = VitaminPack.find(params[:id])
    end
  end

  def edit
    if params[:user_id]
      @user = User.find_by(id: params[:user_id])
      if @user.nil?
        redirect_to new_user_path, alert: "User not found."
      else
        @vitamin_pack = @user.vitamin_packs.find_by(id: params[:id])
        redirect_to user_vitamin_packs_path(@user), alert: "Vitamin Pack not found." if @vitamin_pack.nil?
      end
    else
      @vitamin_pack = VitaminPack.find(params[:id])
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
    redirect_to user_path
  end

  private

  def vitamin_pack_params
    params.require(:vitamin_pack).permit(:name, :user_name, :user_id)
  end
end
