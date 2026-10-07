// Ion demo (C++): one file that touches most token kinds.

#include <algorithm>
#include <cstdint>
#include <iostream>
#include <map>
#include <memory>
#include <numeric>
#include <optional>
#include <string>
#include <string_view>
#include <vector>

#define CARRIER_TAG "FC"

namespace ion::fleet {

/// Largest number of items a hold can carry.
constexpr std::size_t kMaxItems = 64;
static std::uint32_t g_loads = 0;

enum class Status : std::int8_t {
    Active,
    Pending,
    Failed = -1,
};

/// Anything that can describe itself.
class Describe {
public:
    virtual ~Describe() = default;
    [[nodiscard]] virtual std::string describe() const = 0;
};

template <typename T>
concept Weighable = requires(T value) { static_cast<double>(value); };

/// A fleet carrier and what is in its hold.
class Carrier final : public Describe {
public:
    explicit Carrier(std::string_view name) : name_(name) {}

    template <Weighable T>
    Carrier &load(T amount) {
        if (cargo_.size() < kMaxItems) {
            cargo_.push_back(static_cast<double>(amount));
            ++g_loads;
        }
        return *this;
    }

    [[nodiscard]] double total() const {
        return std::accumulate(cargo_.begin(), cargo_.end(), 0.0);
    }

    [[nodiscard]] std::string describe() const override {
        return name_ + " carries " + std::to_string(cargo_.size()) + " items";
    }

    [[nodiscard]] const std::string &name() const noexcept { return name_; }
    [[nodiscard]] std::uint8_t jumps_left() const noexcept { return jumps_left_; }

private:
    std::string name_;
    std::vector<double> cargo_;
    std::uint8_t jumps_left_ = 3;
};

using Registry = std::map<std::string, std::shared_ptr<Carrier>>;

[[nodiscard]] constexpr std::string_view to_string(Status status) {
    switch (status) {
    case Status::Active:
        return "running";
    case Status::Pending:
        return "waiting";
    default:
        return "error";
    }
}

// Adds up every hold in the registry.
double total_cargo(const Registry &registry) {
    return std::accumulate(registry.begin(), registry.end(), 0.0,
                           [](double sum, const auto &entry) { return sum + entry.second->total(); });
}

std::optional<std::shared_ptr<Carrier>> find(const Registry &registry, const std::string &name) {
    if (auto it = registry.find(name); it != registry.end()) {
        return it->second;
    }
    return std::nullopt;
}

} // namespace ion::fleet

int main() {
    using namespace ion::fleet;

    Registry registry;
    auto carrier = std::make_shared<Carrier>("Tidewater");
    carrier->load(12).load(3.5f).load(1'000);
    registry.emplace(carrier->name(), carrier);

    const auto status = Status::Active;
    const auto *raw = R"(raw "string" with \n kept as-is)";
    std::cout << "[" << CARRIER_TAG << "] " << carrier->describe() << ", " << to_string(status) << '\n'
              << g_loads << " loads, " << +carrier->jumps_left() << " jumps, " << total_cargo(registry) << " t\t" << raw << std::endl;

    return find(registry, "Tidewater").has_value() ? 0 : 1;
}
