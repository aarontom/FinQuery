# FinQuery

How to run: 

1) from main directory run the following:
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

3) to run frontend in one terminal
cd finquery-ui
npm install --legacy-peer-deps
npm run dev

4) to run backend run in another terminal
cd to backend folder
uvicorn main:app --reload --host 0.0.0.0 --port 8000

add .env file with 
OPENAI_API_KEY = ''

populate your sql and nosql database locally with your respective config structures
now open up localhost:3000 or whatever port it opens on and run some sample queries


