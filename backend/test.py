import os
from resemble import Resemble
import requests



os.environ["RESEMBLE_API_KEY"]="EqNczEgN1ItqCuc6hX50rgtt"
api_key = os.environ.get("RESEMBLE_API_KEY")
Resemble.api_key(api_key)
class A:
    def generate(self):
        try:
            proj=Resemble.v2.projects.all(1, 10)['items']
            print(proj)
            project_uuid1 = Resemble.v2.projects.all(1, 10)['items'][0]['uuid']
            print(project_uuid1)

            # Get your Voice uuid. In this example, we'll obtain the first.
            #0 worse voice #2 female #1 male which is best
            voice_uuid1 = Resemble.v2.voices.all(1, 10)['items'][1]['uuid']
            print(voice_uuid1)
        except Exception as e:
            print(e)

if __name__ == "__main__":
    c=A() 
    c.generate()
