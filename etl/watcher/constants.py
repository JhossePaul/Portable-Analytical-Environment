# -*- coding: utf-8 -*-
from os import getenv

database = getenv("POSTGRES_DB", "user")
username = getenv("POSTGRES_USER", "pass")
password = getenv("POSTGRES_PASS", "default")

path = getenv("DATA_PATH", "./data/")
base_uri = "postgresql://{username}:{password}@db/{database}::{table}"
valid_extensions = ["csv", "json", "xls", "xlsx"]
