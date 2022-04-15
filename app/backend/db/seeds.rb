# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# デフォルトユーザーの追加
User.create!(:email => 'moriwaki0302@gmail.com', :password => 'sena0302', :admin => true)

# デフォルトカテゴリーの追加
Category.create!(:name => 'UFC')

# デフォルトのステータスの追加
Status.create!(:name=> '公開')
Status.create!(:name=> '非公開')