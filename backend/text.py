from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain_community.llms import Clarifai
from langchain_core.output_parsers import StrOutputParser

import os
os.environ["CLARIFAI_PAT"] = "f6448afffae24e6c9da0bcaa48e22079"

class TextAI:
    def __init__(
        self,
        user_id="openai",
        app_id="chat-completion",
        model_id="GPT-3_5-turbo",
        model_version_id="5d7a50b44aec4a01a9c492c5a5fcf387",
    ):
        self.user_id = user_id
        self.app_id = app_id
        self.model_id = model_id
        self.model_version_id = model_version_id
        self.llm = Clarifai(
            user_id=self.user_id,
            app_id=self.app_id,
            model_id=self.model_id,
        )

    def predict(self, prompt_template, **kwargs):
        print('Entered predict')
        prompt = PromptTemplate(
            template=prompt_template["template"],
            input_variables=prompt_template["input_variables"],
        )
        input_variables = prompt_template["input_variables"]
        inputs = {}
        for variable in input_variables:
            inputs[variable] = kwargs[variable]
        print("Generating prediction")
        print("Prompt: " + prompt.template)
        try:
            params = dict(max_tokens=1024)
            chain = LLMChain(
                prompt=prompt,
                llm=self.llm,
                llm_kwargs={"inference_params": params},
                output_parser=StrOutputParser(),
            )
            blog_text = chain.invoke(inputs)
            blog_text = StrOutputParser().parse(text=blog_text["text"])
            return blog_text
        except Exception as e:
            print(e)
            raise Exception("Error occurred during prediction: " + str(e))