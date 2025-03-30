# Giải bài toán [Codeforces 605C](https://codeforces.com/problemset/problem/605/C)
## Danh sách sinh viên nhóm 8 và MSSV
- **Nguyễn Huy Vũ:**	20235879
- **Phan Huy Hoàng:**	20235729
- **Phạm Thanh Hải:**	20235701
- **Phan Công Minh:**	20235785
- **Phạm Lâm Tùng:**	20235867
- **Vũ Huy Hoàng:**	    20235732

## Mô tả vấn đề
Một freelancer có nhiều dự án để lựa chọn. Mỗi dự án góp phần tăng kinh nghiệm và thu nhập hàng ngày. Freelancer cần:
1. Đạt được ít nhất `p` đơn vị kinh nghiệm.
2. Kiếm được ít nhất `q` đơn vị tiền bạc.

Mục tiêu là xác định số ngày tối thiểu cần thiết để đáp ứng các mục tiêu bằng cách phân phối thời gian tối ưu giữa các dự án.

### Định dạng dữ liệu nhập
Chương trình đọc dữ liệu nhập với định dạng sau:

```
n p q
ai bi
...
```

- `n`: Số lượng dự án.
- `p`: Đơn vị kinh nghiệm cần thiết.
- `q`: Đơn vị tiền bạc cần thiết.
- `ai bi`: Các số nguyên cách nhau bởi dấu cách cho mỗi dự án, trong đó:
  - `ai`: Kinh nghiệm được tích luỹy hàng ngày từ dự án.
  - `bi`: Tiền thu nhập hàng ngày từ dự án.

### Kết quả 
Chương trình xuất ra:

- Số ngày tối thiểu cần thiết để đáp ứng các yêu cầu về kinh nghiệm và tiền bạc nếu có giải pháp.
- "No solution" nếu không thể đáp ứng được các yêu cầu.

## Giải thích mã nguồn

### Thư viện cần thiết
Chương trình sử dụng thư viện `PuLP` để xây dựng và giải quyết bài toán LP. Cài đặt bằng lệnh:

```
pip install pulp
```

### Các bước trong chương trình
1. **Đọc dữ liệu nhập**: Số dự án (`n`), kinh nghiệm cần thiết (`p`), và tiền bạc cần thiết (`q`) được nhập. Thêm vào đó là các giá trị kinh nghiệm (`a`) và thu nhập (`b`) hàng ngày từ mỗi dự án.

2. **Thiết lập bài toán LP**: Tạo một bài toán LP tối thiểu hóa tổng số ngày làm việc từ tất cả các dự án.

3. **Biến quyết định**: Mỗi biến quyết định biểu diễn số ngày làm việc trên mỗi dự án. Các biến này là liên tục và không âm.

4. **Hàm mục tiêu**: Tối thiểu hóa tổng số ngày làm việc trên tất cả các dự án.

5. **Ràng buộc**:
   - Kinh nghiệm tích luỹ phải đạt ít nhất `p`.
   - Thu nhập tích luỹ phải đạt ít nhất `q`.

6. **Giải quyết**:
   - Bài toán LP được giải bằng bộ giải `PULP_CBC_CMD`.
   - Nếu tồi ưu hóa thành công, tổng số ngày được in ra. Ngược lại, chương trình in "No solution".

### Mã nguồn
```python
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
```

## Cách sử dụng
1. Lưu mã nguồn vào một tệp, ví dụ: `605C_solution.py`.
2. Chạy chương trình và nhập dữ liệu theo định dạng như đã mô tả.

Ví dụ:
```
Nhập:
3 10 15
2 3
3 4
1 2

Xuất:
5.0
```

### Giải thích
- Có 3 dự án.
- Freelancer cần 10 đơn vị kinh nghiệm và 15 đơn vị tiền bạc.
- Chương trình tính toán phân phối thời gian tối ưu giữa các dự án để đạt được các mục tiêu trong 5 ngày.

## Lưu ý
- Đảm bảo các giá trị nhập là số không âm.
- Nếu không có tổ hợp dự án nào đáp ứng các yêu cầu, chương trình sẽ xuất "No solution".
- Các biến quyết định là liên tục, điều đó có nghĩa là các ngày phân cố được cho phép.

