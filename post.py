import requests

# // Form Data
config = {
    "id": "path/to/story_script",
    "sessionInnerGap": 18, #// inner gap of the sessions
    "sessionOuterGap": 54, #// outer gap between sessions
    "sessionInnerGaps": [],
    "sessionOuterGaps": [],
    "majorCharacters": [],
    "orders": [],
    "groupIds": [],
    "selectedSessions": [],
    "orderTable": [],
    "sessionBreaks": []
}

# // sessionInnerGaps
sessionInnerGaps = [{
  "item1": 0,  #// session id
  "item2": 36  #// inner gap of the session
},...]

# // sessionOuterGaps
sessionOuterGaps = [{
  "item1": {
    "item1": 0, #// session1 id
    "item2": 1  #// session2 id
  }, #// sessions pair
  "item2": {
    "item1": 50,  #// lower bound of the gap
    "item2": 100, #// upper bound of the gap
  } #// outer gap between session1 and session2
},...]

# // majorCharacters
majorCharacters = [{
  "item1": 0,      #// character id
  "item2": [0, 2]  #// time spans
},...]

# // orders: character0 must be ahead of character1
orders = [[0, 1],...]

# // sessionBreaks
sessionBreaks = [{
  "frame": 0,    #// time span
  "session1": 0, #// session1 id
  "session2": 1  #// session2 id
},...]

response = requests.post('http://localhost:5050/api/update', json=config)
print(response.json())