class VitaminPacksController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user
  before_action :set_vitamin_pack, only: [:vitamin_list, :show, :edit, :update, :destroy]

  def index
    @vitamin_packs = @user.vitamin_packs
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @vitaminPacks, each_serializer: VitaminPackSerializer }
    end
  end

  def vitamin_list
    # @vitamin_pack = @user.vitamin_packs.find_by(id: params[:id])
    @vitamins = @vitamin_pack.vitamins
  end

  def show
    @message = params[:message] if params[:message]
    @message ||= false
    # if params[:user_id]
      # @vitamin_pack = @user.vitamin_packs.find_by(id: params[:id])
      @packs = current_user.vitamin_packs.order('vitamin_packs.id ASC')
      @next_pack = @packs.where('vitamin_packs.id > ?', @vitamin_pack.id).first
      @vitamins = @vitamin_pack.vitamins
      @vitamin = Vitamin.new
      # if @vitamin_pack.nil?
      #   redirect_to user_vitamin_packs_path(@user), alert: "Vitamin pack not found"
      # end
    # else
    #   @vitamin_pack = VitaminPack.find(params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @vitaminPack, serializer: VitaminPackSerializer }
    end
  end

  ##################################################################

  def new
    @vitamin_pack = VitaminPack.new
  end

  def create
    @vitamin_pack = @user.vitamin_packs.build(vitamin_pack_params)
    respond_to do |format|
      if @vitamin_pack.save
        respond_to do |format|
          format.html { redirect_to user_path(@user) }
          format.json { render json: @vitamin_pack, status: 201 }
        end
        # format.html {redirect_to @vitamin_pack, notice: 'Vitamin pack was successfully created.'}
      else
        flash[:alert] = "Your vitamin pack could not be saved"
        render :new
      end
    end
  end

  def edit
  end

  def update
    if @vitamin_pack.update(vitamin_pack_params)
      respond_to do |format|
        format.html { redirect_to vitamin_pack_path(@vitamin_pack) }
        format.json { render json: @vitamin_pack }
      end
    else
      render :edit
    end
  end

  def destroy
    # @vitamin_pack = VitaminPack.find(params[:id])
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

  def set_vitamin_pack
    @vitamin_pack = @user.vitamin_packs.find_by(id: params[:id])
  end
end
