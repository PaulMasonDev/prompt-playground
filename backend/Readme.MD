To install all necessary environments using venv:
Initialize: python -m venv venv
Activate venv: source venv/Scripts/activate
Install packages:
pip install -r requirements.txt
Run server w/ hot reload: uvicorn main:app --reload
