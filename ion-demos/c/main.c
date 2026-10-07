/* Ion demo (C): one file that touches most token kinds. */

#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>
#include <string.h>

/** Largest number of items a hold can carry. */
#define MAX_ITEMS 64
#define CARRIER_TAG "FC"
#define CLAMP(x, lo, hi) ((x) < (lo) ? (lo) : ((x) > (hi) ? (hi) : (x)))

static const double TONNES_PER_UNIT = 1.0;
static unsigned int loads = 0;

typedef enum {
    STATUS_ACTIVE,
    STATUS_PENDING,
    STATUS_FAILED = -1,
} Status;

typedef union {
    int code;
    float ratio;
} Payload;

/** A fleet carrier and what is in its hold. */
typedef struct Carrier {
    const char *name;
    double cargo[MAX_ITEMS];
    size_t count;
    unsigned char jumps_left;
    Status status;
} Carrier;

typedef void (*on_load_fn)(const Carrier *carrier, double amount);

static void log_load(const Carrier *carrier, double amount) {
    printf("%s loaded %.2f t (%zu items)\n", carrier->name, amount, carrier->count);
}

static bool carrier_load(Carrier *carrier, double amount, on_load_fn callback) {
    if (carrier == NULL || carrier->count >= MAX_ITEMS) {
        return false;
    }
    carrier->cargo[carrier->count++] = amount * TONNES_PER_UNIT;
    loads += 1;
    if (callback) {
        callback(carrier, amount);
    }
    return true;
}

// Adds up every item in the hold.
static double carrier_total(const Carrier *carrier) {
    double sum = 0.0;
    for (size_t i = 0; i < carrier->count; ++i) {
        sum += carrier->cargo[i];
    }
    return sum;
}

static const char *status_name(Status status) {
    switch (status) {
    case STATUS_ACTIVE:
        return "running";
    case STATUS_PENDING:
        return "waiting";
    default:
        return "error";
    }
}

int main(void) {
    Carrier carrier = {.name = "Tidewater", .count = 0, .jumps_left = 3, .status = STATUS_PENDING};
    Payload payload = {.code = 0x2A};

    carrier_load(&carrier, 12.0, log_load);
    carrier_load(&carrier, 3.5, NULL);
    carrier.status = STATUS_ACTIVE;

    int jumps = CLAMP(carrier.jumps_left, 0, 5);
    printf("[%s] %s: %s, %d jumps, %.1f t\t(%u loads, code %d, %zu bytes)\n",
           CARRIER_TAG, carrier.name, status_name(carrier.status), jumps,
           carrier_total(&carrier), loads, payload.code, sizeof(Carrier));
    return strlen(carrier.name) > 0 ? 0 : 1;
}
