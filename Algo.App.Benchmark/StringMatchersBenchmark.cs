using BenchmarkDotNet.Attributes;

namespace Algo.App.Benchmark;

public class StringMatchersBenchmark
{
    private readonly string _a;
    private readonly string _b;
    private readonly IStringMatcher _basicMatcher;
    private readonly IStringMatcher _levenshteinMatcher;
    private readonly IStringMatcherFactory _matcher = new StringMatcherFactory();

    public StringMatchersBenchmark()
    {
        // _a = Faker.Company.Name();
        // _b = Faker.Company.Name();
        _a = "Microsoft";
        _b = "Micrsof";

        _a = "thisisrandomecompanyname";
        _b = "thereiscompoletemismatchhere";

        _basicMatcher = _matcher.Create(StringMatchers.Basic);
        _levenshteinMatcher = _matcher.Create(StringMatchers.LevenshteinDistance);
    }

    [Benchmark]
    public float BasicMatch() => _basicMatcher.Match(_a, _b);


    [Benchmark]
    public float LevenshteinMatch() => _levenshteinMatcher.Match(_a, _b);


    [Benchmark]
    public float LevenshteinMatchWithEarlyExit() => _levenshteinMatcher.Match(_a, _b, 5f);
}