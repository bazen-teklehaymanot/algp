using Algo.App.Benchmark;
using BenchmarkDotNet.Running;

var summary = BenchmarkRunner.Run<StringMatchersBenchmark>();
