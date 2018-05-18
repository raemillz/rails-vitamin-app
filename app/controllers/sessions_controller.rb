class SessionsController < ApplicationController
  before_action :redirect_if_logged_in, except: [:destroy]
  prepend_before_action :allow_params_authentication!

  def destroy
    sign_out_and_redirect(current_user)
  end

  def new
    @user = User.new
    @users = User.all
  end

  def create
    @user = User.find_by_name(session_params[:name])
    if @user && @user.valid_password?(session_params[:password])
      session[:user_id] = @user.id
      sign_in_and_redirect @user#, notice: "Welcome back to the vitamin tracker!"
      flash[:notice] = "Welcome back to the vitamin tracker!"
    else
      redirect_to signin_path, notice: "Incorrect name and/or password. Try again or create an account."
    end
  end

  private

  def auth
    request.env['omniauth.auth']
  end

  def session_params
    params.require(:user).permit(:password, :name, :uid, :email)
  end
end
