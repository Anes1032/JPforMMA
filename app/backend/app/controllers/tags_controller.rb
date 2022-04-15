class TagsController < ApplicationController
  before_action :set_post, only: [:show]
  skip_before_action :verify_authenticity_token

  def index
    tags = Tag.all
    render json: { status: 'SUCCESS', message: 'Loaded tags', data: tags }
  end

  def show
    if params[:page]
      posts = TagRelationship.joins(:post).select("post.*").where(tag_id: params[:id]).page(params[:page]).per(10)
    else
      posts = TagRelationship.joins(:post).select("post.*").where(tag_id: params[:id])
    end
    data = {
      tag: @tag,
      posts: posts
    }
    render json: { status: 'SUCCESS', message: 'Loaded the tag', data: data }
  end

  private

  def set_tag
    @tag = Tag.find(params[:id])
  end

  def post_params
    params.require(:tag).permit(:en_title)
  end
end
