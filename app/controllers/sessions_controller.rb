class SessionsController < ApplicationController
  before_action :redirect_if_logged_in, except: [:destroy]

  def destroy
    session.delete :user_id
    redirect_to root_path
  end

  def new
    @user = User.new
    @users = User.all
  end

  def create
    @user = User.find_by(name: session_params[:name])
    if @user && @user.authenticate(session_params[:password])
      session[:user_id] = @user.id
      redirect_to user_path(@user), notice: "Welcome back to the vitamin tracker!"
    else
      redirect_to signin_path, notice: "Incorrect name and/or password. Try again or create an account."
    end
  end

  def omnicreate
    @user = User.find_or_create_from_auth_hash(auth_hash)
    session[:user_id] = @user.id
    redirect_to home_path
  end

  private

  def auth_hash
    request.env['omniauth.auth']
  end

  def session_params
    params.require(:user).permit(:password, :name, :uid)
  end
end
