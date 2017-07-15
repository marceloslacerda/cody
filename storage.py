"""Blockly Demo: Storage

Copyright 2012 Google Inc.
https://developers.google.com/blockly/

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
"""

"""Store and retrieve XML with App Engine.
"""

__author__ = "q.neutron@gmail.com (Quynh Neutron)"

import logging
import os

from random import randint
from flask import Flask
from flask import request

app = Flask(__name__)

CODE_DIR = 'code/'
KEY_CACHE_LENGTH = 10000
KEY_LEN = 16 # big enough to avoid collisions

key_cache = set()

def keyGen():
  ''' Generate a random string of length KEY_LEN.'''
  CHARS = "abcdefghijklmnopqrstuvwxyz1234567890"
  max_index = len(CHARS) - 1
  return "".join([CHARS[randint(0, max_index)] for x in range(KEY_LEN)])

def add_key_to_cache(key):
  if len(key_cache) >= KEY_CACHE_LENGTH:
    key_cache.pop()
    key_cache.add(key)

def getUnusedKey():
  for i in range(100):
    key = keyGen()
    if key in key_cache: # avoid accessing the FS
      continue
    try:
      os.stat(os.path.join(CODE_DIR, key + '.xml'))
      continue
    except OSError:
      add_key_to_cache(key)
      return key
  return None
    
@app.route('/', methods=['POST'])
def handle():
  form = request.form
  if "xml" in form.keys():
    return saveXML(form["xml"])
  elif "key" in form.keys():
    return restoreXML(form['key'])
  
def saveXML(xml_content):
  # Store XML and return a generated key.
  key = getUnusedKey()
  print('key', key)
  if not key:
    return ""
  with open(os.path.join(CODE_DIR, key + '.xml'), 'w') as f:
    f.write(xml_content)
  return key

def restoreXML(key):
  # Retrieve stored XML based on the provided key.
  # Normalize the string.
  key = key.lower().strip()[:KEY_LEN]
  # Can cache file descriptors in the key_cache for faster access
  try:
    with open(os.path.join(CODE_DIR, key + '.xml')) as f:
      return f.read()
  except OSError:
    return ""
