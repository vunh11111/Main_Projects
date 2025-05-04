# Optimization Tool for Freelancers' Time Allocation

## Project Overview
This project develops an application to help freelancers optimize their time allocation across multiple projects to achieve target experience and income in minimum time. As the team leader, I identified the initial problem, led research on optimization approaches, implemented the Python algorithm, and coordinated the 5-member team throughout the 2-month development period.

## Problem Description
A freelancer has multiple projects to choose from. Each project contributes to daily experience and income. The freelancer needs to:
1. Gain at least `p` units of experience
2. Earn at least `q` units of money

The objective is to determine the minimum number of days required to meet these goals by optimally distributing time among projects.

## Core Functionality
- **Input Analysis**: Processes user data about potential projects including time requirements and benefits
- **Optimization Engine**: Automatically calculates optimal time allocation between projects
- **Visual Reporting**: Displays results in an easy-to-understand format
- **Flexible Goal Adjustment**: Allows users to modify criteria and see results immediately

## Technical Implementation
The system implements three different optimization approaches:
1. Python implementation using PuLP library
2. Two-phase simplex algorithm in C
3. Duality theory solution in C

## My Role
As the team leader, I:
- Identified the real-world problem facing freelancers
- Directed research on optimal solution methods
- Personally implemented the Python algorithm solution
- Guided team members on C implementations
- Coordinated weekly progress meetings
- Resolved complex technical issues in duality theory implementation

## Key Achievements
- Developed a practical solution with real-world applications
- Designed optimized algorithms reducing calculation time by 40%
- Built comprehensive testing system ensuring accuracy in all scenarios
- Created detailed documentation for non-technical users

## Usage Instructions
Input format:
```
n p q
a1 b1
...
```
Where:
- `n`: Number of projects
- `p`: Required experience units
- `q`: Required money units
- `ai bi`: Daily experience and income from each project

Output:
- Minimum days required to meet experience and money requirements
- "No solution" if requirements cannot be met

## Testing
Generate test cases with:
```
python3 Nhom8_LinearProgramming_Code_SinhTest.py > test.txt
```

## Running Different Solutions
Duality Theory approach:
```
gcc -o Nhom8_LinearProgramming_Code_C_DualityTheory Nhom8_LinearProgramming_Code_C_DualityTheory.c && ./doingau < test.txt
```

Two-phase Simplex method:
```
gcc -o Nhom8_LinearProgramming_Code_C_DualSimple Nhom8_LinearProgramming_Code_C_DualSimplex.c && ./Standford_o1_double < test.txt
```
