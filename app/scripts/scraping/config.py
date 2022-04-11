# -*- coding: utf-8 -*-

# .env ファイルをロードして環境変数へ反映
from dotenv import load_dotenv
import os
load_dotenv()

# 環境変数を参照
MYSQL_DB_HOST = os.getenv('MYSQL_DB_HOST')
MYSQL_DB_USER = os.getenv('MYSQL_DB_USER')
MYSQL_DB_PASSWORD = os.getenv('MYSQL_DB_PASSWORD')
MYSQL_DB_NAME = os.getenv('MYSQL_DB_NAME')