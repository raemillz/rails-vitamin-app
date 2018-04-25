Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV['1744286022332316'], ENV['548a57f02fdc4e884498a8a2c49a1194']
end
