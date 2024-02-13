#Ideally to be excuted in the folder you want to generate a manifest for

import os
import os.path
import json

def generateManifest(path=None, ignore=[], relativePath=True):
    manifest = dict()
    if path is None:
        path = os.getcwd()

    currentDir = os.listdir(path)
    for filename in currentDir:
        if filename in ignore:
            continue
        p = path + "/" + filename
        if os.path.isdir(p):
            manifest[filename] = generateManifest(p)
        else:
            if relativePath:
                p = p.split(os.getcwd())[1]
            manifest[filename] = p

    return manifest

with open("manifest.json", "w") as file:
    json.dump(generateManifest(ignore=["manifest.json", "manifestgen.py"]), file, indent=4)

