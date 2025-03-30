from pulp import *

# Read input
n, p, q = map(int, input().split())  # Number of projects, required experience, required money

a = []  # Experience gained per day
b = []  # Money earned per day

for _ in range(n):
    ai, bi = map(int, input().split())
    a.append(ai)
    b.append(bi)

# Define the Linear Programming problem
lp = LpProblem("Freelancer_Dreams", LpMinimize)

# Define variables (days worked on each project)
days = LpVariable.dicts("Days", range(n), lowBound=0, cat="Continuous")

# Objective function: Minimize total days worked
lp += lpSum(days[i] for i in range(n))

# Constraint 1: Total experience requirement
lp += lpSum(a[i] * days[i] for i in range(n)) >= p

# Constraint 2: Total money requirement
lp += lpSum(b[i] * days[i] for i in range(n)) >= q

# Solve the LP
status = lp.solve(PULP_CBC_CMD(msg=0))

# Output the result
if status == LpStatusOptimal:
    print(value(lp.objective))
else:
    print("No solution")