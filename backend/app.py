from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests

from text import TextAI
from image import ImageAI
from video import VideoConverter

#cloudinary
import cloudinary
from cloudinary.uploader import upload

#configuration
cloudinary.config( 
  cloud_name = "dl0wqikrb", 
  api_key = "339671134578499", 
  api_secret = "41rhjd97v6vLOi3caAiuQa5YWzc" 
)

syntax = {
    "video_title": "Title (title should be seo optimized and trendy)",
    "video_description": "Description of the video",
    "scripts": {
        "part1": {
            "text": "script for part 1, dont include any expression , voice effect or anything just plain text",
            "image": "image prompt for part 1(image prompt should be very different from each other so that the images are different and it should be very descriptivem, you can use keywords like light effect, background colour, type of scene, 2d, 3d , etc.)",
        },
        "part2": {
            "text": "script for part 2, dont include any expression , voice effect or anything just plain text",
            "image": "image prompt for part 2(image prompt should be very different from each other so that the images are different and it should be very descriptivem, you can use keywords like light effect, background colour, type of scene, 2d, 3d , etc.)",
        },
        "part3": {
            "text": "script for part 3, dont include any expression , voice effect or anything just plain text",
            "image": "image prompt for part 3(image prompt should be very different from each other so that the images are different and it should be very descriptivem, you can use keywords like light effect, background colour, type of scene, 2d, 3d , etc.)",
        },
        "part4": {
            "text": "script for part 4, dont include any expression , voice effect or anything just plain text",
            "image": "image prompt for part 4(image prompt should be very different from each other so that the images are different and it should be very descriptivem, you can use keywords like light effect, background colour, type of scene, 2d, 3d , etc.)",
        },
        "part5": {
            "text": "script for part 5, dont include any expression , voice effect or anything just plain text",
            "image": "image prompt for part 5(image prompt should be very different from each other so that the images are different and it should be very descriptivem, you can use keywords like light effect, background colour, type of scene, 2d, 3d , etc.)",
        },
    },
}

prompt = {
    "template": """- you are a professional content creator and you need to write a video script on the following notes: {topic} , script should be {duration} long dont go beyond limit and it should be engaging
    - script should be in {language} language
    - strictly follow the this syntax:
    - SYNTAX:{syntax}
    - use double quotes for the keys and values for json so that we can parse it easily
    - number of parts should be based on number of images which is {images}.
    - you can add details from your own knowledge
    - be creative
    - keep the tone of the script {genre}
    - return only the script nothing else just the script
    - this video should go viral on youtube shorts and tiktok
    - give just the script that i can directly pass to text to speech no voice effect no background just the voiceover
    - dont add any sound effects or background music just plain text
    - image prompts should be very very descriptive more than 15 words
    - also keep in mind following instructions:
    INSTUCTIONS:{instructions}""",
    "input_variables": [
        "topic",
        "duration",
        "genre",
        "instructions",
        "language",
        "images",
        "syntax",
    ],
}


app = Flask(__name__)
CORS(app, origins="http://localhost:3000", supports_credentials=True)

#API-1
@app.route('/script', methods=['POST'])
def script():
    # Extract data from the request's JSON body
    print("hi")
    request_data = request.json
    print(request_data)
    topic = request_data.get('topic')
    duration = request_data.get('duration')
    genre = request_data.get('genre')
    instructions = request_data.get('instructions')
    language = request_data.get('language')
    images = request_data.get('images')
   
    # Instantiate TextAI
    text_ai = TextAI()
    # Generate the script using TextAI
    generated_script = text_ai.predict(
        prompt,
        topic=topic,
        duration=duration,
        genre=genre,
        instructions=instructions,
        language=language,
        images=images,
        syntax=syntax,
    )
    print(generated_script)
    '''generated_script={
    "video_title": "Unlocking the Secrets of Human Psychology",
    "video_description": "Discover the fascinating world of human psychology with these 5 mind-blowing facts. Dive deep into the complexities of the human mind and learn what makes us tick.",
    "scripts": {
        "part1": {
            "text": "Did you know that the subconscious mind controls 95% of our thoughts and actions? Dive into the depths of the unseen forces that shape our behavior.",
            "image": "A mysterious, swirling vortex representing the hidden power of the subconscious mind, with a dark background and subtle light effects."
        },
        "part2": {
            "text": "Humans are wired to seek connection and belonging. Explore the intricate web of social interactions that influence our emotions and decisions.",      
            "image": "A vibrant network of interconnected nodes symbolizing the complex relationships that drive human behavior, set against a colorful backdrop."
        },
        "part3": {
            "text": "Our brains are hardwired to detect patterns and make quick judgments. Delve into the fascinating world of cognitive biases and how they shape our perceptions.",
            "image": "An abstract puzzle of interconnected pieces coming together to form a cohesive picture, illustrating the brain's natural inclination towards pattern recognition."
        },
        "part4": {
            "text": "Emotions play a crucial role in decision-making, often overriding logic. Uncover the emotional triggers that influence our choices and actions.",     
            "image": "A dynamic clash of colors and shapes representing the tug-of-war between emotions and rationality in the decision-making process, set against a dramatic backdrop."
        },
        "part5": {
            "text": "Humans are social creatures who thrive on connection and empathy. Explore the profound impact of empathy on our relationships and well-being.",       
            "image": "A heartwarming scene of two silhouettes embracing in a gesture of empathy and understanding, against a backdrop of serene nature and soft lighting." 
        }
    }
    }'''
    return generated_script
######################

#API-2
@app.route('/videogenerate', methods=['POST'])
def videogenerate():
    print("Hi")
    request_data = request.json
    audioSrc=request_data.get('audioSrc')
    scriptPara=request_data.get('scriptPara')
    imagePromptArray=request_data.get('imagePromptArray')
    imagePromptPara=request_data.get('imagePromptPara')
    print(imagePromptArray)
    
    #makeinng folders to store images
    temp_dir = 'C:/witheasiness/backend/images'
    print(temp_dir)
    
    #############
    #makeing foler to store audio
    save_dir = 'C:/witheasiness/backend/audio'
    file_name = audioSrc.split('/')[-1]
    print(file_name)
    file_path = os.path.join(save_dir, file_name)

    response = requests.get(audioSrc) #getting the audio file

    if response.status_code == 200:
        # Write the audio content to the file
        with open(file_path, 'wb') as f:
            f.write(response.content)
            print(f"Audio file saved successfully to: {file_path}")
    else:
        print("Failed to download audio file.")
    ######################
    
    
    #imageAI
    image_ai=ImageAI()
    print(imagePromptArray)
    image_paths = []
    for i, prompt in enumerate(imagePromptArray):
        path = os.path.join(temp_dir, f"{i}.png")
        path = os.path.abspath(path)
        print(path)
        try:
            image_ai.generate(
            prompt=prompt,
            inference_params={
                "quality": "standard",
                "size": "1024x1024",
                },
                output_file=path,
            )
            image_paths.append(path)
        except Exception as e:
            print(f"Error generating image: {e}")
    
    
    #video AI
    video_converter = VideoConverter()
    generated_video=video_converter.create_video()
    upload_result = upload(generated_video, 
                       resource_type="video",
                       overwrite=True  # optional: overwrite if a file with the same name already exists
    )
   
    
    return jsonify({"generated_video": upload_result['secure_url']})
    

if __name__ == "__main__":
    app.run(debug=True)
