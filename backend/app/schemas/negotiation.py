from pydantic import BaseModel


class NegotiationCreate(BaseModel):
    fromJunction: str
    toJunction: str
    request: str
    status: str
    impact: str
    time: str