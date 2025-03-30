# Giải bài toán [Codeforces 605C](https://codeforces.com/problemset/problem/605/C)
## Danh sách sinh viên nhóm 8 và MSSV
- **Nguyễn Huy Vũ:** 20235879
- **Phan Huy Hoàng:** 20235729
- **Phạm Thanh Hải:** 20235701
- **Phan Công Minh:** 20235785
- **Phạm Lâm Tùng:** 20235867
- **Vũ Huy Hoàng:** 20235732

## Sinh test
Chạy lệnh sau để sinh test:
```bash
python3 Nhom8_LinearProgramming_Code_SinhTest.py > test.txt
```

### Chính sửa
Các biến `n_jobs`, `min_experience`, và `min_money` có thể được điều chỉnh để tạo ra các bộ test khác nhau.

## Biên dịch và chạy các phương án
### Phương án `doingau` - Lý thuyết đối ngẫu
Chạy lệnh:
```bash
gcc -o Nhom8_LinearProgramming_Code_C_DualityTheory Nhom8_LinearProgramming_Code_C_DualityTheory.c && ./doingau < test.txt
```

### Phương án `Standford_o1_double` - Phương pháp đơn hình 2 pha
Chạy lệnh:
```bash
gcc -o Nhom8_LinearProgramming_Code_C_DualSimple Nhom8_LinearProgramming_Code_C_DualSimplex.c && ./Standford_o1_double < test.txt
```


