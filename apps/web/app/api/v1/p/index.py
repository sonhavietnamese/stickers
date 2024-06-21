# from fastapi import FastAPI
from rembg import remove, new_session
from PIL import Image
from pydantic import BaseModel
from flask import Flask, request
import base64
from io import BytesIO

app = Flask(__name__)

class RemoveBackgroundRequest(BaseModel):
  image: str


MODEL_NAME = "u2net"
session = new_session(MODEL_NAME)


input_path = '/Users/ha.nguyen/workspace/playground/stickers/apps/web/app/api/v1/p/IMG_2291.jpg'
output_path = '/Users/ha.nguyen/workspace/playground/stickers/apps/web/app/api/v1/p/output.png'


@app.route("/api/v1/p", methods = ['POST'])
def remove_background():
    data = request.get_json()
    img_str = data.get('image')

    padding_len = len(img_str) % 4
    img_str += "=" * padding_len

    try:
        img_data = base64.b64decode(img_str)
    except base64.binascii.Error as e:
        return {"image": None, "error": "Invalid base64 format. Image must be a valid base64 encoded string."}

    img = Image.open(BytesIO(img_data))
    img_resized = img.resize((512, 512))
    output_removed = remove(img_resized, session=session)
    buffered = BytesIO()
    output_removed.save(buffered, format="PNG")

    return {"image": base64.b64encode(buffered.getvalue()).decode()}


if __name__ == "__main__":
    app.run(debug=True)



