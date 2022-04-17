class FightersController < ApplicationController
  before_action :set_post, only: [:show]
  skip_before_action :verify_authenticity_token

  def index
    fighters = Fighter.all
    render json: { status: 'SUCCESS', message: 'Loaded fighters', data: fighters }
  end

  def show
    if params[:page]
      posts = FighterRelationship.joins(:post).select("posts.*").where(fighter_id: params[:id]).page(params[:page]).per(10)
      currentPage = params[:page].to_i
    else
      posts = FighterRelationship.joins(:post).select("posts.*").where(fighter_id: params[:id])
      currentPage = 1
    end
    totalCount = FighterRelationship.joins(:post).select("posts.*").where(fighter_id: params[:id]).all.length
    pagenations = {
      currentPage: currentPage,
      totalCount: totalCount
    }
    tags = Tag.all
    fighters = Fighter.all
    data = {
      fighter: @fighter,
      posts: posts,
      pagenations: pagenations,
      tags: tags,
      fighters: fighters,

    }
    render json: { status: 'SUCCESS', message: 'Loaded the fighter', data: data }
  end

  private

  def set_post
    @fighter = Fighter.find(params[:id])
  end

  def post_params
    params.require(:fighter).permit(:en_title)
  end
end
