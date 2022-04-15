class FightersController < ApplicationController
  before_action :set_post, only: [:show]
  skip_before_action :verify_authenticity_token

  def index
    fighters = Fighter.all
    render json: { status: 'SUCCESS', message: 'Loaded fighters', data: fighters }
  end

  def show
    if params[:page]
      posts = FighterRelationship.joins(:post).select("post.*").where(fighter_id: params[:id]).page(params[:page]).per(10)
    else
      posts = FighterRelationship.joins(:post).select("post.*").where(fighter_id: params[:id])
    end
    data = {
      fighter: @fighter,
      posts: posts
    }
    render json: { status: 'SUCCESS', message: 'Loaded the fighter', data: data }
  end

  private

  def set_fighter
    @fighter = Fighter.find(params[:id])
  end

  def post_params
    params.require(:fighter).permit(:en_title)
  end
end
