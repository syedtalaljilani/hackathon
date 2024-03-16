from clarifai.client.model import Model

import os
os.environ["CLARIFAI_PAT"] = "378982a4a8e447afb261c847435dca84"
class ImageAI:
    def __init__(
        self,
        user_id="openai",
        app_id="dall-e",
        model_id="dall-e-3",
        model_version_id="dc9dcb6ee67543cebc0b9a025861b868",
    ):

        self.user_id = user_id
        self.app_id = app_id
        self.model_id = model_id
        self.model_version_id = model_version_id
        self.llm = Model(
            user_id=self.user_id, app_id=self.app_id, model_id=self.model_id
        )

    def generate(
        self,
        prompt,
        inference_params={"quality": "standard", "size": "1024x1024"},
        output_file="image.png",
    ):

        try:
            print('enetred')
            print(output_file)
            inference_params["batch_size"] = 1
            model_prediction = self.llm.predict_by_bytes(
                prompt.encode(), input_type="text", inference_params=inference_params
            )
            output_base64 = model_prediction.outputs[0].data.image.base64
           
            print('output_file',output_file)
            with open(output_file, "wb") as f:
                print("hi")
                f.write(output_base64)
        except Exception as e:
            print(f"Error generating image: {e}")


