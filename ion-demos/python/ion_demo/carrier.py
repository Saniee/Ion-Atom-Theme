"""Ion demo (Python): one file that touches most token kinds.

Run it with `python -m ion_demo` from the folder above this package.
"""

from __future__ import annotations

import asyncio
import json
import re
from collections.abc import Callable, Iterator
from dataclasses import dataclass, field
from enum import Enum, auto
from typing import ClassVar, Final, Protocol

#: Largest number of items a hold can carry.
MAX_ITEMS: Final = 64
CARRIER_TAG = "FC"
_loads = 0

CALLSIGN = re.compile(r"^[A-Z0-9]{3}-[A-Z0-9]{3}$")


class Status(Enum):
    ACTIVE = auto()
    PENDING = auto()
    FAILED = -1


class Describe(Protocol):
    """Anything that can describe itself."""

    def describe(self) -> str: ...


@dataclass(frozen=True, slots=True)
class CargoItem:
    commodity: str
    tonnes: float


@dataclass
class Carrier:
    """A fleet carrier and what is in its hold."""

    kind: ClassVar[str] = "fleet"

    name: str
    cargo: list[CargoItem] = field(default_factory=list[CargoItem])
    jumps_left: int = 3
    status: Status = Status.PENDING
    on_load: Callable[[CargoItem], None] | None = None

    def load(self, commodity: str, tonnes: float = 1.0) -> Carrier:
        global _loads
        if len(self.cargo) >= MAX_ITEMS:
            return self
        item = CargoItem(commodity, tonnes)
        self.cargo.append(item)
        _loads += 1
        if self.on_load is not None:
            self.on_load(item)
        return self

    @property
    def total(self) -> float:
        # Adds up every item in the hold.
        return sum(item.tonnes for item in self.cargo)

    @classmethod
    def from_json(cls, raw: str) -> Carrier:
        data: dict[str, str | int] = json.loads(raw)
        return cls(name=str(data["name"]), jumps_left=int(data.get("jumps", 3)))

    @staticmethod
    def is_callsign(text: str) -> bool:
        return CALLSIGN.match(text) is not None

    def describe(self) -> str:
        match self.status:
            case Status.ACTIVE:
                return f"{self.name} carries {len(self.cargo)} items"
            case Status.PENDING if self.jumps_left > 0:
                return f"{self.name} waiting, {self.jumps_left} jumps left"
            case _:
                return "error"

    def __iter__(self) -> Iterator[CargoItem]:
        yield from self.cargo


Registry = dict[str, Carrier]


def heaviest(registry: Registry) -> str | None:
    ranked = sorted(registry.values(), key=lambda c: c.total, reverse=True)
    return ranked[0].name if ranked else None


async def refresh(carrier: Carrier, *, attempts: int = 0x02) -> Status:
    while attempts > 0:
        await asyncio.sleep(0.01)
        attempts -= 1
    carrier.status = Status.ACTIVE
    return carrier.status


def main() -> int:
    registry: Registry = {}
    carrier = Carrier("Tidewater", on_load=lambda item: print(f"loaded {item.commodity}: {item.tonnes:.2f} t"))
    carrier.load("Tritium", 12).load("Gold", 3.5).load("Water", 1_000)
    registry[carrier.name] = carrier

    status = asyncio.run(refresh(carrier))
    path = r"C:\Carriers\pending.json"
    items = [item.commodity for item in carrier if item.tonnes > 1]

    try:
        Carrier.from_json('{"name": "Backup", "jumps": 2}')
    except (KeyError, ValueError) as err:
        print(f"bad carrier: {err!r}")
    finally:
        del items[:0]

    print(f"[{CARRIER_TAG}] {carrier.describe()} ({status.name})\n"
          f"{_loads} loads, heaviest: {heaviest(registry)}\t({path})")
    print(f"{Carrier.is_callsign('X7K-9QZ') = }, kind: {Carrier.kind}, items: {', '.join(items)}")
    return 0 if carrier.total > 0 and not False else 1
