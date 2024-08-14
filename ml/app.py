from flask import Flask, request, jsonify
import joblib
import numpy as np
import io
from PIL import Image
from flask_cors import CORS
import os

app = Flask(__name__)

# Load the trained model
model = joblib.load('/Users/sidak/Development/kattyHacks/ml/Random Forest Model.pkl')
CORS(app)

app = Flask(__name__)

# Load the trained model
model = joblib.load('/Users/sidak/Development/kattyHacks/ml/Random Forest Model.pkl')
CORS(app)

def image_to_feature_vector(image, size=(28, 28), normalize=True):
    """
    Convert an image to a feature vector.

    Parameters:
    - image (PIL.Image.Image): PIL Image object.
    - size (tuple): Desired size of the image (width, height). Default is (28, 28).
    - normalize (bool): Whether to normalize pixel values to the range [0, 1]. Default is True.

    Returns:
    - numpy.ndarray: Flattened feature vector of the image.
    """
    # Convert to grayscale if not already
    img = image.convert('L')

    # Resize the image to the desired size
    img = img.resize(size)

    # Convert image to numpy array
    image_array = np.array(img)

    # Flatten the array
    feature_vector = image_array.flatten()

    if normalize:
        feature_vector = feature_vector / 255.0

    return feature_vector

@app.route('/predict', methods=['POST'])
def predict():
    print('Request received')
    try:
        # Ensure a file part is present in the request
        if 'file' not in request.files:
            return jsonify({'error': 'No file part in the request'}), 400

        file = request.files['file']

        # Ensure the file part has a filename
        if file.filename == '':
            return jsonify({'error': 'No file selected for uploading'}), 400

        # Read the image file
        image = Image.open(io.BytesIO(file.read()))
        feature_vector = image_to_feature_vector(image)

        features_vector = np.round(feature_vector * 255).astype(int)
        print(features_vector)

        data = {
            'features': np.round(feature_vector * 255).astype(int).tolist()
        }

        print(data)

        if 'features' not in data:
            return jsonify({'error': 'No features found in request'}), 400

        # Convert features to a numpy array and reshape for prediction
        features = np.array(data['features']).reshape(1, -1)

        # Make a prediction
        prediction = model.predict(features)

        # Return the prediction in JSON format
        return jsonify({'prediction': int(prediction[0])})

    except Exception as e:
        # Handle errors
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
