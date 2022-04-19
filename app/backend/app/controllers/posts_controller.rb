class PostsController < ApplicationController
  before_action :set_post, only: [:show, :update, :destroy]
  skip_before_action :verify_authenticity_token

  def index
    if params[:page]
      posts = Post.order(post_time: :desc).page(params[:page]).per(10)
      currentPage = params[:page].to_i
    else 
      posts = Post.order(post_time: :desc)
      currentPage = 1
    end
    totalCount = Post.all.length
    pagenations = {
      currentPage: currentPage,
      totalCount: totalCount
    }
    tags = Tag.all
    fighters = Fighter.all
    rankings = Post.where.not(ranking: nil).order(ranking: :asc).limit(5)
    data = {
      posts: posts,
      pagenations: pagenations,
      tags: tags,
      fighters: fighters,
      rankings: rankings
    }
    render json: { status: 'SUCCESS', message: 'Loaded posts', data: data }
  end

  def top
    hero = Post.where(hero: true).order(post_time: :desc)
    recommend = Post.where(recommend: true).order(post_time: :desc).limit(3)
    pickup = Post.where(pickup: true).order(post_time: :desc).limit(3)
    news = Post.order(post_time: :desc).limit(3)
    tags = Tag.all
    fighters = Fighter.all
    rankings = Post.where.not(ranking: nil).order(ranking: :asc).limit(5)
    data = {
      hero: hero,
      recommend: recommend,
      pickup: pickup,
      news: news,
      tags: tags,
      fighters: fighters,
      rankings: rankings
    }
    render json: { status: 'SUCCESS', message: 'Loaded posts', data: data }
  end

  def show
    tags = TagRelationship.joins(:tag).select("tags.id", "tags.name").where(post_id: params[:id])
    rankings = Post.where.not(ranking: nil).order(ranking: :asc).limit(5)
    data = {
      post: @post,
      tags: tags,
      rankings: rankings
    }
    render json: { status: 'SUCCESS', message: 'Loaded the post', data: data }
  end

  def create
    post = Post.new(post_params)
    if post.save
      render json: { status: 'SUCCESS', data: post }
    else
      render json: { status: 'ERROR', data: post.errors }
    end
  end

  def destroy
    @post.destroy
    render json: { status: 'SUCCESS', message: 'Deleted the post', data: @post }
  end

  def update
    if @post.update(post_params)
      render json: { status: 'SUCCESS', message: 'Updated the post', data: @post }
    else
      render json: { status: 'SUCCESS', message: 'Not updated', data: @post.errors }
    end
  end

  private

  def set_post
    @post = Post.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:en_title)
  end
end
