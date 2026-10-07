-- Ion demo (Lua): one file that touches most token kinds.

---@class Carrier
---@field name string
---@field cargo number[]
---@field jumps_left integer
local Carrier = {}
Carrier.__index = Carrier

local MAX_ITEMS <const> = 64
local loads = 0

---@enum Status
local Status = {
    ACTIVE = 1,
    PENDING = 2,
    FAILED = -1,
}

---Create a new carrier.
---@param name string
---@return Carrier
function Carrier.new(name)
    return setmetatable({ name = name, cargo = {}, jumps_left = 3 }, Carrier)
end

---@param amount number
---@return Carrier
function Carrier:load(amount)
    if #self.cargo >= MAX_ITEMS then
        goto done
    end
    table.insert(self.cargo, amount)
    loads = loads + 1
    ::done::
    return self
end

-- Adds up every item in the hold.
function Carrier:total()
    local sum = 0.0
    for _, tonnes in ipairs(self.cargo) do
        sum = sum + tonnes
    end
    return sum
end

local carrier = Carrier.new("Tidewater"):load(12):load(3.5):load(1e3)
local status = carrier.jumps_left > 0 and Status.ACTIVE or Status.PENDING
print(string.format("%s carries %d items, %.2f t\t(%d loads, status %d)",
    carrier.name, #carrier.cargo, carrier:total(), loads, status))
print(math.floor(carrier:total()), os.date("%Y-%m-%d"), [[long "string" \n kept]])
