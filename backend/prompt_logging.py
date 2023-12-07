import os
import openai
import datetime
import models
from sqlalchemy.orm import Session
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv('OPEN_AI_KEY')
openai.api_key = SECRET_KEY

def log_prompt_to_db(system_message: str, user_message: str, prompt_type: str, db: Session, max_tokens=1000):
    response_time = 0.0
    server_response = ""
    try:
        start_time = datetime.datetime.now()
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_message
                },
                {"role": "user", "content": f"{user_message}"}
            ],
            temperature=0.7,
            max_tokens=max_tokens,
        )
        end_time = datetime.datetime.now()
        response_time = (end_time - start_time).total_seconds()
        server_response = response.choices[0].message['content']
    except Exception as e:
        print('ERROR:', e)
        return None
    prompt_token_count = estimate_token_count(user_message)
    response_token_count = estimate_token_count(server_response)
    db_prompt = models.Prompt(
        # TODO: Remove prompt and response from db since it will no longer be used
        prompt="",
        response="",
        prompt_tokens=prompt_token_count,
        response_tokens=response_token_count,
        prompt_type=prompt_type,
        response_score=score_response(response_time, prompt_token_count, response_token_count),
        elapsed_time=response_time
    )
    db.add(db_prompt)
    db.commit()
    db.refresh(db_prompt)
    return server_response

def estimate_token_count(text):
    # Splitting the text by spaces gives a rough approximation of word count
    words = text.split()

    # Initialize the token count
    token_count = 0

    for word in words:
        # Estimating that each word is a token, and adding more tokens for special cases
        token_count += 1  # One token for the word itself

        # Add extra tokens for common punctuation and contractions
        if any(char in word for char in [",", ".", "!", "?", ";", ":"]):
            token_count += 1
        if "'" in word:
            token_count += 1  # For contractions like "can't" or "don't"

    return token_count

def score_response(response_time, user_prompt_tokens, server_response_tokens):
    # Constants to adjust scoring impact
    TIME_WEIGHT = 0.4
    PROMPT_WEIGHT = 0.3
    RESPONSE_WEIGHT = 0.3

    # Maximum token counts for normalization purposes
    MAX_PROMPT_TOKENS = 50  # Assuming a maximum of 50 tokens for a prompt
    MAX_RESPONSE_TOKENS = 100  # Assuming a maximum of 100 tokens for a response

    # Normalize each component to a 0-1 scale
    normalized_time_score = max(0, 1 - (response_time / 30))  # Assuming 10 seconds as the maximum reasonable response time
    normalized_prompt_score = min(user_prompt_tokens / MAX_PROMPT_TOKENS, 1)
    normalized_response_score = min(server_response_tokens / MAX_RESPONSE_TOKENS, 1)

    # Calculate weighted average
    weighted_average = (normalized_time_score * TIME_WEIGHT) + \
                       (normalized_prompt_score * PROMPT_WEIGHT) + \
                       (normalized_response_score * RESPONSE_WEIGHT)

    # Scale to 0-100 range
    scaled_score = weighted_average * 100

    return scaled_score

# # Example usage
# response_time = 4  # Example response time in seconds
# user_prompt_tokens = 200  # Example token count for user prompt
# server_response_tokens = 1000  # Example token count for server response

# print("Response Score:", score_response(response_time, user_prompt_tokens, server_response_tokens))


