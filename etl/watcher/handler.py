# -*- coding: utf-8 -*-

from logging import info
from odo import odo, drop
from os import listdir
from os.path import isfile, join, basename
from re import split
from watchdog.events import FileSystemEventHandler

from .constants import *

class ExtractTransformLoadHandler (FileSystemEventHandler):
    def on_created (self, event):
        if not event.is_directory:
            info("[-] Created: %s", event.src_path)
            load(event.src_path)

    def on_deleted (self, event):
        if not event.is_directory:
            info("[-] Deleted: %s", event.src_path)
            unload(event.src_path)

    def on_modified (self, event):
        if not event.is_directory:
            info("[-] Modified: %s", event.src_path)
            unload(event.src_path)
            load(event.src_path)

    def on_moved (self, event):
        if not event.is_directory:
            info("[-] Moved: %s", event.src_path)
            unload(event.src_path)
            load(event.src_path)

def handle_existing_files (dir_path):
    info("[-] Handling existing files")
    files = [join(path, f) for f in listdir(dir_path) if isfile(join(dir_path, f))]
    if files:
        for src_file in files:
            load(src_file)
    else:
        info("[*] Clean directory")

def load (src_file):
    filename = basename(src_file)
    name, ext = split("\.", filename, maxsplit=1)
    dest_path = base_uri.format(
        username=username,
        password=password,
        database=database,
        table=name
    )
    if ext in valid_extensions:
        info("[-] Loading: %s -> %s", src_file, dest_path)
        try:
            odo(src_file, dest_path)
            info("[*] Loading: Success!")
        except Exception as error:
            info("[X] Loading: Error -> %s", error)
    else:
        info("[S] Skipping: Not valud format -> %s", ext)

def unload (src_file):
    filename = basename(src_file)
    name, ext = split("\.", filename, maxsplit=1)
    dest_path = base_uri.format(
        username=username,
        password=password,
        database=database,
        table=name
    )
    info("[-] Droping: %s", dest_path)
    try:
        drop(dest_path)
        info("[*] Dropping: Success!")
    except Exception as error:
        info("[X] Dropping: Error -> %s", error)
