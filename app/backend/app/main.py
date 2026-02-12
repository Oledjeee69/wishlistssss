from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.routers import auth, wishlists, items, reservations, ws


app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router)
app.include_router(wishlists.router)
app.include_router(items.router)
app.include_router(reservations.router)
app.include_router(ws.router)


@app.get("/health", tags=["health"])
def health_check():
    return {"status": "ok"}

