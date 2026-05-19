# UniSwipe API Specification

This document describes the FastAPI backend endpoints used for scalable university data retrieval and comparison.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Health check |
| GET | `/universities` | Return all universities |
| GET | `/universities/{id}` | Return one university using indexed lookup |
| GET | `/universities/search?q=` | Search by name, country, city, or program |
| GET | `/universities/top-ranked` | Return top-ranked universities |
| GET | `/universities/co-op` | Return universities with co-op availability |
| GET | `/universities/country/{country}` | Filter by country |
| GET | `/universities/program/{program}` | Filter by program using program index |
| GET | `/universities/filter` | Combined filters |
| POST | `/saved/{id}` | Save a university |
| GET | `/saved` | Return saved universities |
| DELETE | `/saved/{id}` | Remove saved university |
| POST | `/compare` | Compare selected universities |
| GET | `/stats` | Return dataset statistics |

## Performance Notes

- `university_index` provides O(1) lookup by university id.
- `program_index` avoids repeatedly scanning all universities for program searches.
- Filtering endpoints reduce unnecessary frontend processing.
