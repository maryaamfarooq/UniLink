from flask import Flask, request, jsonify
from flask_cors import CORS

import cv2
import numpy as np

app = Flask(__name__)
CORS(app)

# load card template image
template = cv2.imread('card_template.jpg', 0)

@app.route('/authorize', methods=['POST'])
def authorize_card():
    # get uploaded card image
    card_image = request.files['card_image']
    # convert card image to numpy array
    img = cv2.imdecode(np.frombuffer(card_image.read(), np.uint8), cv2.IMREAD_UNCHANGED)
    # convert card image to grayscale
    img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    # perform template matching
    res = cv2.matchTemplate(img_gray, template, cv2.TM_CCOEFF_NORMED)
    # set similarity threshold
    threshold = 0.2
    # get max similarity value and location
    _, max_val, _, max_loc = cv2.minMaxLoc(res)
    # check if max similarity is above threshold
    if max_val >= threshold:
        result = 'authorized'
    else:
        result = 'not authorized'
    # return authorized or not authorized response to client-side
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
