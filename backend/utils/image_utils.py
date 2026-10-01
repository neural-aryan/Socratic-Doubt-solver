import base64
from fastapi import UploadFile, HTTPException

async def convert_uploadfile_to_data_url(image: UploadFile, index: int) -> str:
    if not image.content_type or not image.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail=f"File {index + 1} is not an image."
        )
    
    image_bytes = await image.read()
    b64 = base64.b64encode(image_bytes).decode("utf-8")
    return f"data:{image.content_type};base64,{b64}"