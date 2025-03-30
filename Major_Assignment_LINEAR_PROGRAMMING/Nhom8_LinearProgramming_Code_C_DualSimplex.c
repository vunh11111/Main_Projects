#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <float.h>

// typedef long double double;

#define EPS 1e-9L

typedef struct {
    int m, n;
    int *B, *N;
    double **D;
} LPSolver;

void swap_int(int *a, int *b) {
    int tmp = *a;
    *a = *b;
    *b = tmp;
}

void LPSolver_init(LPSolver *solver, int m, int n, double **A, double *b, double *c) {
    int i, j;
    solver->m = m;
    solver->n = n;
    solver->B = (int *)malloc(m * sizeof(int));
    solver->N = (int *)malloc((n + 1) * sizeof(int));
    solver->D = (double **)malloc((m + 2) * sizeof(double *));
    for (i = 0; i < m + 2; i++) {
        solver->D[i] = (double *)calloc(n + 2, sizeof(double));
    }
    for (i = 0; i < m; i++)
        for (j = 0; j < n; j++)
            solver->D[i][j] = A[i][j];
    for (i = 0; i < m; i++) {
        solver->B[i] = n + i;
        solver->D[i][n] = -1;
        solver->D[i][n + 1] = b[i];
    }
    for (j = 0; j < n; j++) {
        solver->N[j] = j;
        solver->D[m][j] = -c[j];
    }
    solver->N[n] = -1;
    solver->D[m + 1][n] = 1;
}

void Pivot(LPSolver *solver, int r, int s) {
    int i, j;
    double inv = 1.0 / solver->D[r][s];
    for (i = 0; i < solver->m + 2; i++) {
        if (i != r) {
            for (j = 0; j < solver->n + 2; j++) {
                if (j != s) {
                    solver->D[i][j] -= solver->D[r][j] * solver->D[i][s] * inv;
                }
            }
        }
    }
    for (j = 0; j < solver->n + 2; j++) {
        if (j != s) {
            solver->D[r][j] *= inv;
        }
    }
    for (i = 0; i < solver->m + 2; i++) {
        if (i != r) {
            solver->D[i][s] *= -inv;
        }
    }
    solver->D[r][s] = inv;
    swap_int(&(solver->B[r]), &(solver->N[s]));
}

int Simplex(LPSolver *solver, int phase) {
    int x = (phase == 1) ? solver->m + 1 : solver->m;
    while (1) {
        int s = -1;
        int j;
        for (j = 0; j <= solver->n; j++) {
            if (phase == 2 && solver->N[j] == -1) continue;
            if (s == -1 || solver->D[x][j] < solver->D[x][s] ||
               (solver->D[x][j] == solver->D[x][s] && solver->N[j] < solver->N[s]))
                s = j;
        }
        if (solver->D[x][s] > -EPS) return 1;
        int r = -1;
        int i;
        for (i = 0; i < solver->m; i++) {
            if (solver->D[i][s] < EPS) continue;
            double lhs = solver->D[i][solver->n + 1] / solver->D[i][s];
            double rhs = (r == -1) ? 0 : (solver->D[r][solver->n + 1] / solver->D[r][s]);
            if (r == -1 || lhs < rhs ||
               (lhs == rhs && solver->B[i] < solver->B[r]))
                r = i;
        }
        if (r == -1) return 0;
        Pivot(solver, r, s);
    }
}

double Solve(LPSolver *solver, double *x) {
    int i, j, r = 0;
    for (i = 1; i < solver->m; i++)
        if (solver->D[i][solver->n + 1] < solver->D[r][solver->n + 1])
            r = i;
    if (solver->D[r][solver->n + 1] < -EPS) {
        Pivot(solver, r, solver->n);
        if (!Simplex(solver, 1) || solver->D[solver->m + 1][solver->n + 1] < -EPS)
            return -INFINITY;
        for (i = 0; i < solver->m; i++)
            if (solver->B[i] == -1) {
                int s = -1;
                for (j = 0; j <= solver->n; j++)
                    if (s == -1 || solver->D[i][j] < solver->D[i][s] ||
                        (solver->D[i][j] == solver->D[i][s] && solver->N[j] < solver->N[s]))
                        s = j;
                Pivot(solver, i, s);
            }
    }
    if (!Simplex(solver, 2))
        return INFINITY;
    for (j = 0; j < solver->n; j++)
        x[j] = 0.0;
    for (i = 0; i < solver->m; i++)
        if (solver->B[i] < solver->n)
            x[solver->B[i]] = solver->D[i][solver->n + 1];
    return solver->D[solver->m][solver->n + 1];
}

int main() {
    int n, p, q;
    // Read the values of n, p, and q from input
    if (scanf("%d %d %d", &n, &p, &q) != 3) {
        fprintf(stderr, "Error reading n, p, q.\n");
        return 1;
    }

    // Allocate memory for the matrix A (2 x n) and initialize it to -1
    double **A = (double **)malloc(2 * sizeof(double *));
    if (A == NULL) {
        fprintf(stderr, "Memory allocation failed for A.\n");
        return 1;
    }
    for (int i = 0; i < 2; i++) {
        A[i] = (double *)malloc(n * sizeof(double));
        if (A[i] == NULL) {
            fprintf(stderr, "Memory allocation failed for A[%d].\n", i);
            return 1;
        }
        for (int j = 0; j < n; j++) {
            A[i][j] = -1.0L; // Initialize to -1.0
        }
    }

    // Allocate and initialize vector b with -p and -q
    double b[2];
    b[0] = (double)(-p);
    b[1] = (double)(-q);

    // Allocate and initialize vector c of length n with -1.0
    double *c = (double *)malloc(n * sizeof(double));
    if (c == NULL) {
        fprintf(stderr, "Memory allocation failed for c.\n");
        return 1;
    }
    for (int i = 0; i < n; i++) {
        c[i] = -1.0L;
    }

    // Read the values for A[0][i] and A[1][i], multiply them by -1.0
    for (int i = 0; i < n; i++) {
        double a0, a1;
        if (scanf("%lf %lf", &a0, &a1) != 2) {
            fprintf(stderr, "Error reading A[0][%d] and A[1][%d].\n", i, i);
            return 1;
        }
        A[0][i] = -1.0L * a0;
        A[1][i] = -1.0L * a1;
    }

    // Initialize the LPSolver with the provided A, b, and c
    LPSolver solver;
    LPSolver_init(&solver, 2, n, A, b, c);

    // Allocate memory for the solution vector x
    double *x = (double *)malloc(n * sizeof(double));
    if (x == NULL) {
        fprintf(stderr, "Memory allocation failed for x.\n");
        return 1;
    }

    // Solve the linear program
    double value = Solve(&solver, x);

    // Output the negative of the optimal value with 15 decimal places
    printf("%.15f\n", -value);

    // Free allocated memory
    free(x);
    for (int i = 0; i < 2; i++) {
        free(A[i]);
    }
    free(A);
    free(c);
    free(solver.B);
    free(solver.N);
    for (int i = 0; i < solver.m + 2; i++) {
        free(solver.D[i]);
    }
    free(solver.D);

    return 0;
}