class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :current_user
  before_action :require_logged_in, except: [:new, :create, :welcome]

  def logged_in?
    !!current_user
  end

  def require_logged_in
    redirect_to root_path unless logged_in?
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def redirect_if_logged_in
    redirect_to home_path if logged_in?
  end

  def redirect_if_unauthorized
    unauth_user_access = params[:user_id] && current_user.id != params[:user_id].to_i
    unauth_pack_access = params[:id] && !current_user.vitamin_packs.map(&:id).include?(params[:id].to_i)

    redirect_to home_path if unauth_user_access || unauth_pack_access
  end

  private
  
  helper_method :current_user

end
