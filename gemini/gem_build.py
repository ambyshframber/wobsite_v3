#!/bin/env python3

import os
import shutil
os.chdir(os.path.dirname(os.path.realpath(__file__)))

def do_file(path, name: str):
    if name.endswith(".gmi"):
        with open(f"{path}/{name}", "a") as f:
            f.write("\n\n=> / home\n")


if os.path.exists("build"):
    shutil.rmtree("build")

shutil.copytree("source", "build")

for (dir, _, files) in os.walk("build"):
    for f in files:
        do_file(dir, f)

