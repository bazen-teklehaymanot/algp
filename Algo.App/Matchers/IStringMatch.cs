namespace Algo.App;

public interface IStringMatcher
{
    float Match(string a, string b);
    async Task<float> MatchAsync(string a, string b, CancellationToken cancellationToken = default)
        => await Task.Run(() => Match(a, b), cancellationToken);
}
