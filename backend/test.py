import requests

url = "https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json"

params = {
    "key": "JUeeQ7NObagRrkyYO6uhhvPaCL6sV3QN",
    "point": "13.0402,80.2118"
}

response = requests.get(url, params=params)

print(response.status_code)
print(response.text)