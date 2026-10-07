// Ion demo (C#): one file that touches most token kinds.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ion.Fleet;

/// <summary>What a carrier is currently doing.</summary>
public enum Status
{
    Active,
    Pending,
    Failed = -1,
}

/// <summary>Anything that can describe itself.</summary>
public interface IDescribe
{
    string Describe();
}

/// <summary>A single item in a hold.</summary>
public readonly record struct CargoItem(string Commodity, double Tonnes);

/// <summary>A fleet carrier and what is in its hold.</summary>
public sealed class Carrier : IDescribe
{
    /// <summary>Largest number of items a hold can carry.</summary>
    public const int MaxItems = 64;
    private static int s_loads;

    private readonly List<CargoItem> _cargo = new();

    public Carrier(string name) => Name = name;

    public string Name { get; }
    public Status Status { get; set; } = Status.Pending;
    public int JumpsLeft { get; private set; } = 3;
    public static int Loads => s_loads;

    public event EventHandler<CargoItem>? Loaded;

    public Carrier Load(string commodity, double tonnes)
    {
        if (_cargo.Count >= MaxItems)
        {
            return this;
        }

        var item = new CargoItem(commodity, tonnes);
        _cargo.Add(item);
        s_loads++;
        Loaded?.Invoke(this, item);
        return this;
    }

    // Adds up every item in the hold.
    public double Total() => _cargo.Sum(c => c.Tonnes);

    public string Describe() => Status switch
    {
        Status.Active => $"{Name} carries {_cargo.Count} items",
        Status.Pending when JumpsLeft > 0 => $"{Name} waiting, {JumpsLeft} jumps left",
        _ => "error",
    };
}

public static class Program
{
    [Obsolete("Use Main instead.")]
    public static void Legacy() { }

    public static async Task<int> Main(string[] args)
    {
        var registry = new Dictionary<string, Carrier>();
        var carrier = new Carrier("Tidewater");
        carrier.Loaded += (_, item) => Console.WriteLine($"loaded {item.Commodity}: {item.Tonnes:F2} t");

        carrier.Load("Tritium", 12).Load("Gold", 3.5).Load("Water", 1_000);
        carrier.Status = Status.Active;
        registry[carrier.Name] = carrier;

        await Task.Delay(10);

        const string path = @"C:\Carriers\pending.json";
        var heaviest = registry.Values
            .OrderByDescending(c => c.Total())
            .Select(c => c.Name)
            .FirstOrDefault() ?? "none";

        Console.WriteLine($"{carrier.Describe()}\n{Carrier.Loads} loads, heaviest: {heaviest}\t({path})");
        return args.Length > 0 && args[0] == "--fail" ? 1 : 0;
    }
}
