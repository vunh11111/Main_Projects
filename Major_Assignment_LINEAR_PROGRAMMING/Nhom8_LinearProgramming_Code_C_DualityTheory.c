//doingau
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#define N 100005

int n, a[N], b[N], p, q;
double left_bound = 0, right_bound = 1, y, mid1, mid2, delta;

// This function calculates the maximum possible value of the objective function for a fixed $y_1=x$
double F(double x) {
    y = 1;
    for (int i = 1; i <= n; i++)
        y = fmin(y, (1 - a[i] * x) / b[i]); // Original function is ax + by <= 1
        // As the (total) graph is convex, we can use the minimum value of y to calculate the maximum value of ax + by, so that all inequalities are satisfied
    return x * p + q * y;
}

int main() {
    scanf("%d %d %d", &n, &p, &q);
    for (int i = 1; i <= n; i++) {
        scanf("%d %d", &a[i], &b[i]);
        right_bound = fmin(right_bound, 1.0 / a[i]); 
        // As the graph is convex, the maximum value of x is the minimum value of 1 / a[i]
    }

    // Perform ternary search
    while (right_bound - left_bound > 1e-15) { // $\varepsilon = 1e-15$
        delta = (right_bound - left_bound) / 3;
        mid1 = left_bound + delta;
        mid2 = right_bound - delta;
        if (F(mid1) > F(mid2)) {
            right_bound = mid2;
        } else {
            left_bound = mid1;
        }
    }

    printf("%.15f\n", F(left_bound));

    return 0;
}

