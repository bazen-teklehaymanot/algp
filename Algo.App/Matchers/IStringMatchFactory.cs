namespace Algo.App;

public enum StringMatchers
{
    Basic,
    EditDistance,
    LevenshteinDistance
}

public interface IStringMatcherFactory
{
    IStringMatcher Create(StringMatchers stringMatcher);
}

public class StringMatcherFactory : IStringMatcherFactory
{
    public IStringMatcher Create(StringMatchers stringMatcher)
    {
        return stringMatcher switch
        {
            StringMatchers.Basic => new BasicMatch(),
            StringMatchers.EditDistance => new EditDistance(),
            StringMatchers.LevenshteinDistance => new LevenshteinDistance(),
            _ => throw new ArgumentException($"Invalid string matcher: {stringMatcher}")
        };
    }
}