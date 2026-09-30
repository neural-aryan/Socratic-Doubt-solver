from sympy import Symbol, Eq, solve, sympify, prod

def check(variables, equations, target):
    syms = [Symbol(v, real=True) for v in variables]
    local = dict(zip(variables, syms))
    t = sympify(target, locals=local)

    if not equations:              # nothing to solve, just evaluate
        return [t]

    eqs = []
    for e in equations:
        left, right = e.split("=")
        eqs.append(Eq(sympify(left, locals=local), sympify(right, locals=local)))
    solutions = solve(eqs, syms, dict=True)
    return [t.subs(s) for s in solutions]


COMBINERS = {
    "each":    lambda vals: vals,
    "sum":     lambda vals: sum(vals),
    "product": lambda vals: prod(vals),
    "count":   lambda vals: len(vals),
    "max":     lambda vals: max(vals),
    "min":     lambda vals: min(vals),
}

def run(problem):
    """Returns the answer, or None if SymPy can't verify (caller should escalate)."""
    try:
        vals = check(problem["variables"], problem["equations"], problem["target"])
        combine = COMBINERS[problem["combine"]]
        if not vals and problem["combine"] != "count":
            return None            # no solutions found, don't return a fake 0
        return combine(vals)
    except Exception:
        return None                # parse error, unknown combine, solver failure


problem = {
        "variables": ["a", "d"],
    "equations": [
        "40/2*(2*a + 39*d) = 99",
        "20/2*(2*a + 19*d) = 44",
    ],
    "target": "5/2*(2*a + 4*d)",
    "combine": "each",
}
print(run(problem))   # I expect 9 + sqrt(3)