class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!, except: [:new, :create, :welcome]
  before_action :configure_permitted_parameters, if: :devise_controller?

  # before_action :current_user
  # before_action :require_logged_in, except: [:new, :create, :welcome]
  #
  # def logged_in?
  #   !!current_user
  # end
  #
  # def require_logged_in
  #   redirect_to root_path unless logged_in?
  # end

  # def current_user
  #   @current_user ||= User.find(session[:user_id]) if session[:user_id]
  # end

  def redirect_if_logged_in
    redirect_to user_path(current_user) if user_signed_in?
  end

  def redirect_if_unauthorized
    #binding.pry
    unauth_user_access = params[:user_id] && current_user.id != params[:user_id].to_i
    unauth_pack_access = params[:id] && !current_user.vitamin_packs.map(&:id).include?(params[:id].to_i)

    redirect_to home_path if unauth_user_access || unauth_pack_access
  end

  def after_sign_in_path_for(resource)
      request.env['omniauth.origin'] || user_path(@user)
  end

  private

  #helper_method :current_user

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end

end
