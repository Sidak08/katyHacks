# UniSign

UniSign is a groundbreaking application designed to translate sign language into text and then into various spoken languages. This project aims to assist individuals who are deaf or hard of hearing by providing a tool that facilitates communication across different languages.

## Inspiration

The idea for UniSign was inspired by a documentary on World War I, where we saw the struggles of individuals who were deafened by explosions and found it difficult to communicate. Determined to make a difference, we decided to create a solution that could bridge this communication gap. Through our research, we discovered that while there are sign language to text translators, none could translate the text into another language. As programmers, we took this challenge and built UniSign.

## What It Does

UniSign works in two primary stages:
1. **Sign Language Recognition:**
   - An image is captured on the frontend.
   - This image is encoded and sent to a Python-based machine learning backend.
   - The backend decodes the image and feeds it into a custom `RandomForestClassifier` model, which predicts the letter represented by the hand sign.
   - The predicted letter is then sent back to the frontend and displayed to the user.

2. **Language Translation:**
   - When a user selects a target language from a dropdown menu, a `useState` is triggered, sending a request to the Next.js backend.
   - The backend uses the Google Translate API to translate the word into the desired language.

## How We Built It

UniSign was developed in three key components:
- **Backend (Machine Learning):**
  - Technologies: Python, Flask, Scikit-learn, Numpy, Pandas, Pillow.
  - Machine Learning Model: Custom `RandomForestClassifier`.

- **Frontend:**
  - Technologies: Next.js, React, Tailwind CSS, React Camera, Google Translate API.

- **APIs:**
  - Python-based Flask API for image processing and letter prediction.
  - Next.js backend for handling language translation requests.

## Challenges We Ran Into

Training the machine learning model was particularly challenging, as we had to tweak numerous parameters, a process that proved to be time-consuming. The most difficult part, however, was creating an API to allow the application to communicate with the machine learning model. We faced multiple issues with encoding and decoding files over HTTP, particularly with CORS policy mismatches.

## Accomplishments That We're Proud Of

- **Creating a Functional Solution:** We succeeded in building a project that can genuinely help people with disabilities.
- **Custom Model Development:** We trained our own machine learning model, achieving an impressive accuracy score of 92%.
- **Innovative Approach:** UniSign stands out because it not only translates sign language into text but also translates that text into multiple languages, addressing a gap in existing solutions.

## What We Learned

Throughout this project, we learned a great deal about training AI models, including:
- Finding, sorting, and cleaning data.
- Adjusting parameters to achieve the best results.
- Encoding and decoding images for processing.

## What's Next for UniSign

There are several features we’d like to add in the future:
- **Real-time Translation:** Implementing a machine learning model to detect changes in real-time.
- **Support for More Languages:** Expanding beyond the current seven most-used languages.
- **Enhanced User Interface:** Improving the UI to provide a better user experience.

## Built With

- Python
- Flask
- Scikit-learn
- Next.js
- React
- Tailwind CSS
- Google Translate API

## How to Run UniSign

To run the UniSign project locally, follow these steps:

### 1. Set Up the Frontend and Backend

1. **Navigate to the `web-dev` directory:**
   ```bash
   cd web-dev
   ```

2. **Install the required Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Start the Next.js development server:**
   ```bash
   npm run dev
   ```

### 2. Set Up the Machine Learning Backend

1. **Go back to the root directory:**
   ```bash
   cd ../
   ```

2. **Navigate to the `ml` directory:**
   ```bash
   cd ml
   ```

3. **Install the required Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Start the Flask application:**
   ```bash
   python3 app.py
   ```

### 3. Access the Application

- Open your browser and go to `http://localhost:3000` to interact with the UniSign application.

## Try It Out

Check out the [GitHub Repo](https://github.com/Sidak08/katyHacks)
Check out the [Devpost](https://devpost.com/software/unisign-hizcsr)
Check out the [Video](https://www.youtube.com/watch?si=q5li8DNr-MmDD7zE&embeds_referring_euri=https%3A%2F%2Fdevpost.com%2F&source_ve_path=Mjg2NjQsMTY0NTA2&v=hGQ9MMXsd_k&feature=youtu.be)

### Screenshots
![screenshot](https://github.com/Sidak08/katyHacks/blob/main/Screen%20Shot%202024-08-28%20at%208.56.22%20PM.png?raw=true)
