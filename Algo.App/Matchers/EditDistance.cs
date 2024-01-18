namespace Algo.App;

public class EditDistance : IStringMatcher
{
    public float Match(string a, string b)
    {
        var m = a.Length;
        var n = b.Length;
        var dp = new int[m + 1, n + 1];
        for (var i = 0; i <= m; i++)
        {
            dp[i, 0] = i;
        }
        for (var j = 0; j <= n; j++)
        {
            dp[0, j] = j;
        }
        for (var i = 1; i <= m; i++)
        {
            for (var j = 1; j <= n; j++)
            {
                var cost = a[i - 1] == b[j - 1] ? 0 : 1;
                dp[i, j] = Math.Min(
                    dp[i - 1, j] + 1,
                    Math.Min(
                        dp[i, j - 1] + 1,
                        dp[i - 1, j - 1] + cost
                    )
                );
            }
        }
        return 1 - (float)dp[m, n] / Math.Max(m, n);
    }
}
