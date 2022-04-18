class TagsController < ApplicationController
  before_action :set_post, only: [:show]
  skip_before_action :verify_authenticity_token

  def index
    tags = Tag.all
    render json: { status: 'SUCCESS', message: 'Loaded tags', data: tags }
  end

  def show
    if params[:page]
      posts = TagRelationship.joins(:post).select("posts.*").where(tag_id: params[:id]).page(params[:page]).per(10)
      currentPage = params[:page].to_i
    else
      posts = TagRelationship.joins(:post).select("posts.*").where(tag_id: params[:id])
      currentPage = 1
    end
    totalCount = TagRelationship.joins(:post).select("posts.*").where(tag_id: params[:id]).all.length
    pagenations = {
      currentPage: currentPage,
      totalCount: totalCount
    }
    tags = Tag.all
    fighters = Fighter.all
    rankings = Post.where.not(ranking: nil).order(ranking: :asc).limit(5)
    data = {
      tag: @tag,
      posts: posts,
      pagenations: pagenations,
      tags: tags,
      fighters: fighters,
      rankings: rankings
    }
    render json: { status: 'SUCCESS', message: 'Loaded the tag', data: data }
  end

  private

  def set_post
    @tag = Tag.find(params[:id])
  end

  def post_params
    params.require(:tag).permit(:en_title)
  end
end
