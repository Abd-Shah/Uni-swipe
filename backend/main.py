from fastapi import FastAPI, HTTPException, Query
from typing import List, Optional
from data import universities

app = FastAPI(title="UniSwipe API", version="1.0.0")

# Dictionary index for O(1) university lookup by id.
university_index = {uni["id"]: uni for uni in universities}

# Program index for efficient program-based retrieval.
program_index = {}
for uni in universities:
    for program in uni["programs"]:
        program_index.setdefault(program.lower(), []).append(uni)

saved_universities = set()

@app.get("/")
def root():
    return {"message": "UniSwipe FastAPI backend is running"}

@app.get("/universities")
def get_universities():
    return universities

@app.get("/universities/{university_id}")
def get_university(university_id: str):
    university = university_index.get(university_id)
    if not university:
        raise HTTPException(status_code=404, detail="University not found")
    return university

@app.get("/universities/search")
def search_universities(q: str = Query(...)):
    query = q.lower()
    return [
        uni for uni in universities
        if query in uni["name"].lower()
        or query in uni["country"].lower()
        or query in uni["city"].lower()
        or any(query in program.lower() for program in uni["programs"])
    ]

@app.get("/universities/top-ranked")
def top_ranked(limit: int = 10):
    return sorted(universities, key=lambda uni: uni["globalRank"])[:limit]

@app.get("/universities/co-op")
def co_op_universities():
    return [uni for uni in universities if uni["coOp"]]

@app.get("/universities/country/{country}")
def universities_by_country(country: str):
    return [uni for uni in universities if uni["country"].lower() == country.lower()]

@app.get("/universities/program/{program}")
def universities_by_program(program: str):
    return program_index.get(program.lower(), [])

@app.get("/universities/filter")
def filter_universities(country: Optional[str] = None, co_op: Optional[bool] = None, max_rank: Optional[int] = None):
    results = universities
    if country:
        results = [uni for uni in results if uni["country"].lower() == country.lower()]
    if co_op is not None:
        results = [uni for uni in results if uni["coOp"] == co_op]
    if max_rank:
        results = [uni for uni in results if uni["globalRank"] <= max_rank]
    return results

@app.post("/saved/{university_id}")
def save_university(university_id: str):
    if university_id not in university_index:
        raise HTTPException(status_code=404, detail="University not found")
    saved_universities.add(university_id)
    return {"saved": list(saved_universities)}

@app.get("/saved")
def get_saved():
    return [university_index[uid] for uid in saved_universities]

@app.delete("/saved/{university_id}")
def delete_saved(university_id: str):
    saved_universities.discard(university_id)
    return {"saved": list(saved_universities)}

@app.post("/compare")
def compare_universities(ids: List[str]):
    selected = [university_index[uid] for uid in ids if uid in university_index]
    if len(selected) < 2:
        raise HTTPException(status_code=400, detail="Select at least two universities")
    best_overall = max(selected, key=lambda uni: uni["careerScore"] + uni["facultyRating"] + uni["budgetScore"] * 0.5 + ((1000 - uni["globalRank"]) / 100))
    best_budget = max(selected, key=lambda uni: uni["budgetScore"])
    best_career = max(selected, key=lambda uni: uni["careerScore"])
    return {"bestOverall": best_overall["name"], "bestBudget": best_budget["name"], "bestCareer": best_career["name"], "selected": [uni["name"] for uni in selected]}

@app.get("/stats")
def stats():
    total_programs = sum(len(uni["programs"]) for uni in universities)
    return {"totalUniversities": len(universities), "totalPrograms": total_programs, "countries": sorted(list({uni["country"] for uni in universities})), "coOpUniversities": len([uni for uni in universities if uni["coOp"]])}
