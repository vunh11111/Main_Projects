from random import randint

def test_sinh():
    n_jobs = 100000
    min_experience = randint(50000, 100000)
    min_money = randint(50000, 100000)

    print(f"{n_jobs} {min_experience} {min_money}")

    for _ in range(n_jobs):
        experience = randint(0, 100000)
        money = randint(0, 100000)
        print(f"{experience} {money}")

if __name__ == "__main__":
    test_sinh()
