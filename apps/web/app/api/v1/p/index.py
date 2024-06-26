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

IMG_SIZE = 256

@app.route("/api/v1/p", methods = ['GET'])
def health_check():
    return {"message": "Server is up and running!"}


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

   # Open the image
    img = Image.open(BytesIO(img_data))

   # Calculate the height that maintains the aspect ratio
    width_percent = (IMG_SIZE / float(img.size[0]))
    height_size = int((float(img.size[1]) * float(width_percent)))

   # Resize the image
    img_resized = img.resize((IMG_SIZE, height_size))
    output_removed = remove(
        img_resized,
        session=session,
        post_process_mask=True)
    output_cropped = output_removed.crop(output_removed.getbbox())
    buffered = BytesIO()
    output_cropped.save(buffered, format="PNG")

    return {"image": base64.b64encode(buffered.getvalue()).decode()}


if __name__ == "__main__":
    app.run(debug=True)



