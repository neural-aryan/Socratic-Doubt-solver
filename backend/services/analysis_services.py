# backend/services/analysis_services.py

import json
import re

from fastapi import UploadFile, HTTPException

from backend.services.llm_client import client, MODEL_NAME
from backend.services.prompts import (
    build_transcription_prompt,
    build_diagnosis_prompt,
    build_correct_answer_prompt,
    build_first_question_prompt,
)
from backend.utils.image_utils import convert_uploadfile_to_data_url


def safe_json_parse(text: str):
    """Strip control characters that break JSON parsing, then parse.
    Returns (parsed_dict_or_None, raw_cleaned_text)."""
    cleaned = re.sub(r'[\x00-\x1f]+', ' ', text)
    try:
        return json.loads(cleaned), cleaned
    except json.JSONDecodeError:
        return None, cleaned


async def transcribe_solution(question_number: int, images: list[UploadFile]) -> str:
    if not images:
        raise HTTPException(status_code=400, detail="At least one image is required.")

    content = [{"type": "text", "text": build_transcription_prompt(question_number)}]

    for index, image in enumerate(images):
        data_url = await convert_uploadfile_to_data_url(image, index)

        if index == 0:
            page_label = "This is IMAGE 1 -- the question."
        else:
            page_label = f"This is IMAGE {index + 1} -- solution page {index}."

        content.append({"type": "text", "text": page_label})
        content.append(
            {
                "type": "image_url",
                "image_url": {"url": data_url, "detail": "high"},
            }
        )

    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[{"role": "user", "content": content}],
    )

    return response.choices[0].message.content


def diagnose_solution(reconstruction: str) -> dict:
    prompt = build_diagnosis_prompt(reconstruction)

    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"},
    )

    diagnosis_text = response.choices[0].message.content
    diagnosis, cleaned = safe_json_parse(diagnosis_text)

    if diagnosis is None:
        return {
            "error": "Verifier returned invalid JSON",
            "raw_response": cleaned,
        }

    return diagnosis


def generate_correct_answer(reconstruction: str) -> str | None:
    prompt = build_correct_answer_prompt(reconstruction)

    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"},
    )

    parsed, _ = safe_json_parse(response.choices[0].message.content)
    return parsed.get("correct_final_answer") if parsed else None


def generate_first_question(diagnosis: dict) -> str | None:
    prompt = build_first_question_prompt(diagnosis)

    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"},
    )

    parsed, _ = safe_json_parse(response.choices[0].message.content)
    return parsed.get("first_question") if parsed else None