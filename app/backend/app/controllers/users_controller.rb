class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    user = User.find_by(email: params[:email])
    if !user
      return render json: { status: 'ERROR', message: '登録されたユーザーは存在しません' }
    end

    valid = user.valid_password?(params[:password])
    if valid
      data = {
        id: user[:id],
        name: user[:name],
        email: user[:email]
      }
      render json: { status: 'SUCCESS', message: 'ログイン成功', data: data }
    else 
      render json: { status: 'ERROR', message: 'パスワードが間違っています' }
    end
  end

  def create
    if !params[:email] && !params[:password]
      return render json: { status: 'ERROR', message: 'メールアドレスとパスワードは必須です' }
    end
    existance = User.find_by(email: params[:email])
    if existance
      return render json: { status: 'ERROR', message: '登録済みのメールアドレスです' }
    end

    User.create(:name => params[:name], :email => params[:email], :password => params[:password])
    render json: { status: 'SUCCESS', message: "新規会員登録完了しました" }
  end

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
