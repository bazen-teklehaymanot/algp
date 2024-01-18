namespace Algo.App;

public class BasicMatch : IStringMatcher
{
    public float Match(string a, string b)
    {
        if( string.IsNullOrWhiteSpace(a) 
            || string.IsNullOrWhiteSpace(b))
            return 0;
        
        return a.Contains(b)
        || b.Contains(a)
            ? 1
            : 0;
    }
}
