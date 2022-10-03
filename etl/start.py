# -*- coding: utf-8 -*-

import time
import logging
from watchdog.observers.polling import PollingObserver
from watcher import ExtractTransformLoadHandler, handle_existing_files, path

if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(message)s',
        datefmt='%H:%M:%S'
    )
    logging.info("[*] Starting watcher at %s", path)

    observer = PollingObserver()
    event_handler = ExtractTransformLoadHandler()

    handle_existing_files(path)
    observer.schedule(event_handler, path, recursive=True)
    observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
