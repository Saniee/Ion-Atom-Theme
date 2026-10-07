use std::collections::HashMap;
use std::fmt::{self, Display};

/// Largest number of items a hold can carry.
const MAX_ITEMS: usize = 64;
static mut LOADS: u32 = 0;

#[derive(Debug, Clone, PartialEq)]
enum Status {
    Active,
    Pending(u32),
    Failed { code: i32, reason: String },
}

trait Describe {
    fn describe(&self) -> String;
}

/// A fleet carrier and what is in its hold.
#[derive(Debug, Default)]
struct Carrier<'a> {
    name: &'a str,
    cargo: Vec<f64>,
    jumps_left: u8,
}

type Registry<'a> = HashMap<String, Carrier<'a>>;

impl<'a> Carrier<'a> {
    pub fn new(name: &'a str) -> Self {
        Self { name, cargo: Vec::new(), jumps_left: 3 }
    }

    fn load<T: Into<f64>>(&mut self, amount: T) -> &mut Self {
        if self.cargo.len() < MAX_ITEMS {
            self.cargo.push(amount.into());
            unsafe { LOADS += 1 };
        }
        self
    }
}

impl Describe for Status {
    fn describe(&self) -> String {
        match self {
            Status::Active => String::from("running"),
            Status::Pending(n) if *n > 10 => format!("waiting ({n} in queue)"),
            Status::Pending(n) => format!("waiting, {n} left"),
            Status::Failed { code, reason } => format!("error {code}: {reason}"),
        }
    }
}

impl Display for Carrier<'_> {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{} carries {} items, {} jumps left", self.name, self.cargo.len(), self.jumps_left)
    }
}

// Adds up every hold in the registry.
fn total_cargo(registry: &Registry) -> f64 {
    registry.values().map(|c| c.cargo.iter().sum::<f64>()).sum()
}

async fn refresh(name: &str, attempts: u32) -> Result<Status, String> {
    if attempts == 0x00 {
        return Err("no attempts left".to_string());
    }
    Ok(if name.is_empty() { Status::Pending(7) } else { Status::Active })
}

fn main() {
    let mut registry: Registry = HashMap::new();
    let mut carrier = Carrier::new("Tidewater");
    carrier.load(12u8).load(3.5_f32).load(1_000);
    println!("{carrier}");
    registry.insert(carrier.name.to_owned(), carrier);

    let failed = Status::Failed { code: -2, reason: "jump drive offline".into() };
    let loads = unsafe { LOADS };
    println!("{}\n{} loads, {:.2} t total", failed.describe(), loads, total_cargo(&registry));
    assert!(matches!(failed, Status::Failed { .. }), "unexpected status");
    let _ = refresh("Tidewater", 2);
}